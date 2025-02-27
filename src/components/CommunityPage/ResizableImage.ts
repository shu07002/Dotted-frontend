import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { Plugin, NodeSelection } from 'prosemirror-state';
import ResizableImageComponent from './ResizableImageComponent';

export interface ImageOptions {
  inline: boolean;
  allowBase64: boolean;
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    resizableImage: {
      /**
       * Add an image
       */
      setImage: (options: {
        src: string;
        alt?: string;
        title?: string;
        width?: string;
        height?: string;
        alignment?: 'left' | 'center' | 'right';
      }) => ReturnType;
      /**
       * Set image alignment
       */
      setAlignment: (alignment: 'left' | 'center' | 'right') => ReturnType;
    };
  }
}

export const ResizableImage = Node.create<ImageOptions>({
  name: 'resizableImage',

  addOptions() {
    return {
      inline: false,
      allowBase64: true,
      HTMLAttributes: {}
    };
  },

  inline() {
    return this.options.inline;
  },

  group() {
    return this.options.inline ? 'inline' : 'block';
  },

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null
      },
      alt: {
        default: null
      },
      title: {
        default: null
      },
      width: {
        default: '100%',
        parseHTML: (element) => element.getAttribute('width') || '100%'
      },
      height: {
        default: 'auto',
        parseHTML: (element) => element.getAttribute('height') || 'auto'
      },
      alignment: {
        default: 'center',
        parseHTML: (element) => {
          const parent = element.closest('div[style*="text-align"]');
          if (parent) {
            const style = parent.getAttribute('style');
            if (style && style.includes('text-align')) {
              const match = style.match(/text-align:\s*([^;]+)/);
              if (match && match[1]) {
                return match[1].trim();
              }
            }
          }
          return element.getAttribute('data-alignment') || 'center';
        }
      }
    };
  },

  parseHTML() {
    return [
      {
        tag: 'img[src]',
        getAttrs: (node) => {
          if (typeof node === 'string') return {};
          const element = node as HTMLElement;
          const img = element as HTMLImageElement;
          const width = img.getAttribute('width') || img.style.width || '100%';
          const height =
            img.getAttribute('height') || img.style.height || 'auto';
          let alignment = 'center';
          const parent = img.closest('div[style*="text-align"]');
          if (parent) {
            const style = parent.getAttribute('style');
            if (style && style.includes('text-align')) {
              const match = style.match(/text-align:\s*([^;]+)/);
              if (match && match[1]) {
                alignment = match[1].trim();
              }
            }
          } else if (img.getAttribute('data-alignment')) {
            alignment = img.getAttribute('data-alignment') || 'center';
          }
          return {
            src: img.getAttribute('src'),
            alt: img.getAttribute('alt'),
            title: img.getAttribute('title'),
            width,
            height,
            alignment
          };
        }
      }
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { alignment, ...attrs } = HTMLAttributes;
    return [
      'div',
      { style: `text-align: ${alignment || 'center'};` },
      [
        'img',
        mergeAttributes(this.options.HTMLAttributes, attrs, {
          'data-alignment': alignment
        })
      ]
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageComponent);
  },

  addCommands() {
    return {
      setImage:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options
          });
        },
      setAlignment:
        (alignment) =>
        ({ commands, editor }) => {
          if (editor.isActive(this.name)) {
            return commands.updateAttributes(this.name, { alignment });
          }
          return false;
        }
    };
  },

  // 엔터키 단축키: 선택된 이미지 노드 뒤에 새 paragraph 삽입
  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        const { selection } = editor.state;

        // 이미지 노드가 NodeSelection인 경우
        if (
          selection instanceof NodeSelection &&
          selection.node.type.name === this.name
        ) {
          const pos = selection.from;
          const size = selection.node.nodeSize;
          editor.commands.insertContentAt(pos + size, { type: 'paragraph' });
          return true;
        }

        // 혹은 현재 커서 위치의 노드가 이미지라면
        const pos = selection.$from.pos;
        const node = editor.state.doc.nodeAt(pos);
        if (node && node.type.name === this.name) {
          const nodeSize = node.nodeSize;
          editor.commands.insertContentAt(pos + nodeSize, {
            type: 'paragraph'
          });
          return true;
        }

        return false;
      }
    };
  },

  // 드래그 앤 드랍: 원본 노드를 삭제하고, 원본 속성을 그대로 가진 새 노드를 생성하여 삽입
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            keydown: (view, event) => {
              // 혹시 추가적인 엔터키 처리 (옵션)
              if (event.keyCode === 13) {
                const { selection } = view.state;
                const pos = selection.$from.pos;
                const node = view.state.doc.nodeAt(pos);
                if (node && node.type.name === this.name) {
                  const tr = view.state.tr;
                  const newParagraph =
                    view.state.schema.nodes.paragraph.create();
                  tr.insert(pos + node.nodeSize, newParagraph);
                  view.dispatch(tr);
                  return true;
                }
              }
              return false;
            }
          },
          handleDrop: (view, event) => {
            const nodePosStr = event.dataTransfer?.getData(
              'application/tiptap-node-id'
            );
            if (nodePosStr) {
              const from = Number(nodePosStr);
              const dropPos = view.posAtCoords({
                left: event.clientX,
                top: event.clientY
              })?.pos;
              if (dropPos !== undefined) {
                const { tr } = view.state;
                const node = view.state.doc.nodeAt(from);
                if (node) {
                  // 삭제 후 원본 속성을 유지하여 새 노드 생성
                  tr.delete(from, from + node.nodeSize);
                  const newNode = node.type.create(
                    node.attrs,
                    node.content,
                    node.marks
                  );
                  tr.insert(dropPos, newNode);
                  view.dispatch(tr);
                  return true;
                }
              }
            }
            return false;
          }
        }
      })
    ];
  }
});

export default ResizableImage;
