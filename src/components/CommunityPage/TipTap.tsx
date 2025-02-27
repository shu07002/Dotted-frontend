// src/Tiptap.tsx
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import AlignCenter from '@/assets/svg/tiptap/align_center.svg?react';
import AlignLeft from '@/assets/svg/tiptap/align_left.svg?react';
import AlignRight from '@/assets/svg/tiptap/align_right.svg?react';
import Bold from '@/assets/svg/tiptap/bold.svg?react';
import H1 from '@/assets/svg/tiptap/h1.svg?react';
import H2 from '@/assets/svg/tiptap/h2.svg?react';
import H3 from '@/assets/svg/tiptap/h3.svg?react';
import H4 from '@/assets/svg/tiptap/h4.svg?react';
import Highlighter from '@/assets/svg/tiptap/highlight.svg?react';
import ImageIcon from '@/assets/svg/tiptap/image.svg?react';
import Italic from '@/assets/svg/tiptap/italic.svg?react';
import Strike from '@/assets/svg/tiptap/strike.svg?react';
import Code from '@/assets/svg/tiptap/Code.svg?react';
import Quote from '@/assets/svg/tiptap/quote.svg?react';
import Bullet from '@/assets/svg/tiptap/bullet.svg?react';
import Horizontal from '@/assets/svg/tiptap/horizontal.svg?react';
import Highlight from '@tiptap/extension-highlight';
// import Image from '@tiptap/extension-image'; // 기존 이미지 확장 대신
import { useRef } from 'react';
import styled from 'styled-components';
// 필요한 바이트 컴포넌트 임포트 (예시)
import ResizableImage from './ResizableImage';

// 스타일드 컴포넌트로 에디터 스타일링
const EditorContainer = styled.div`
  border: 1px solid #e5e6eb;
  border-radius: 4px;
  overflow: hidden;
`;

const ToolbarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 8px;
  border-bottom: 1px solid #e5e6eb;
  background-color: #f7f8fa;
`;

const StyledEditorContent = styled(EditorContent)`
  padding: 16px;
  min-height: 200px;

  .ProseMirror {
    outline: none;

    p {
      margin: 0.5em 0;
    }

    &:focus {
      outline: none;
    }
  }
`;

// 툴바 버튼 스타일링
const ToolbarButton = styled.button`
  background: none;
  border: none;
  padding: 6px;
  margin: 0 2px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &.is-active {
    background-color: rgba(22, 93, 255, 0.1);
    color: #165dff;
  }

  svg {
    width: 16px;
    height: 16px;
    vertical-align: middle;
  }
`;

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      ResizableImage, // 기존 Image 대신 ResizableImage 사용
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Highlight,
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false
        }
      })
    ],
    content: `
    <h3 style="text-align:center">
      Devs Just Want to Have Fun by Cyndi Lauper
    </h3>
  `
  });

  return (
    <EditorContainer>
      <MenuBar editor={editor} />
      <StyledEditorContent editor={editor} />
    </EditorContainer>
  );
};

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          // ResizableImage의 setImage 메소드 사용
          editor?.chain().focus().setImage({ src: reader.result }).run();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  if (!editor) {
    return null;
  }

  return (
    <ToolbarContainer>
      <div>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
          }
        >
          <H1 />
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
          }
        >
          <H2 />
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
          }
        >
          <H3 />
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive('heading', { level: 4 }) ? 'is-active' : ''
          }
        >
          <H4 />
        </ToolbarButton>
      </div>

      <div>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <Bold />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <Italic />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          <Strike />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={editor.isActive('highlight') ? 'is-active' : ''}
        >
          <Highlighter />
        </ToolbarButton>
      </div>

      <div>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
        >
          <AlignLeft />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={
            editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''
          }
        >
          <AlignCenter />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
        >
          <AlignRight />
        </ToolbarButton>
      </div>

      <div>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          <Bullet />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
          <Code />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
        >
          <Quote />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Horizontal />
        </ToolbarButton>
      </div>

      <div>
        <ToolbarButton onClick={handleImageButtonClick}>
          <ImageIcon />
        </ToolbarButton>
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </ToolbarContainer>
  );
};

export default Tiptap;
