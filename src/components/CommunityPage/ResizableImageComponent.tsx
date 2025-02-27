import React, { useEffect, useRef, useState } from 'react';
import { NodeViewProps, NodeViewWrapper } from '@tiptap/react';
import { NodeSelection } from 'prosemirror-state'; // NodeSelection import 추가
import styled from 'styled-components';
import AlignCenter from '@/assets/svg/tiptap/align_center.svg?react';
import AlignLeft from '@/assets/svg/tiptap/align_left.svg?react';
import AlignRight from '@/assets/svg/tiptap/align_right.svg?react';

const ResizableImageComponent: React.FC<NodeViewProps> = ({
  node,
  updateAttributes,
  selected,
  getPos,
  editor
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);
  const alignment = node.attrs.alignment || 'center';

  const handleResizeStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    if ('touches' in e) {
      startXRef.current = e.touches[0].clientX;
    } else {
      startXRef.current = e.clientX;
    }
    if (imageRef.current) {
      startWidthRef.current = imageRef.current.clientWidth;
    }
  };

  const handleResize = (e: MouseEvent | TouchEvent) => {
    if (!isResizing) return;
    let currentX;
    if ('touches' in e) {
      currentX = e.touches[0].clientX;
    } else {
      currentX = e.clientX;
    }
    const deltaX = currentX - startXRef.current;
    const newWidth = startWidthRef.current + deltaX;
    const minWidth = 50;
    if (newWidth >= minWidth && imageRef.current) {
      imageRef.current.style.width = `${newWidth}px`;
    }
  };

  const handleResizeEnd = () => {
    if (!isResizing) return;
    setIsResizing(false);
    if (imageRef.current) {
      const newWidth = imageRef.current.clientWidth;
      updateAttributes({ width: `${newWidth}px`, height: 'auto' });
    }
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleResize);
      document.addEventListener('mouseup', handleResizeEnd);
      document.addEventListener('touchmove', handleResize, { passive: false });
      document.addEventListener('touchend', handleResizeEnd);
      document.body.style.userSelect = 'none';
    }
    return () => {
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', handleResizeEnd);
      document.removeEventListener('touchmove', handleResize);
      document.removeEventListener('touchend', handleResizeEnd);
      document.body.style.userSelect = '';
    };
  }, [isResizing]);

  const handleAlignmentChange = (newAlignment: 'left' | 'center' | 'right') => {
    updateAttributes({ alignment: newAlignment });
    if (typeof getPos === 'function') {
      const pos = getPos();
      const { tr } = editor.state;
      tr.setNodeMarkup(pos, undefined, {
        ...node.attrs,
        alignment: newAlignment
      });
      editor.view.dispatch(tr);
    }
  };

  // 모바일에서 이미지 클릭 시 해당 이미지 노드를 선택하도록 설정(엔터키가 작동하게 함)
  const handleTap = (e: React.MouseEvent | React.TouchEvent) => {
    if (typeof getPos === 'function') {
      const pos = getPos();
      const { tr } = editor.state;
      const nodeType = node.type; // node.type을 사용하여 노드 타입 가져오기

      tr.setSelection(
        // NodeSelection을 통해 이미지 노드를 선택함
        nodeType
          ? NodeSelection.create(editor.state.doc, pos)
          : editor.state.selection
      );
      editor.view.dispatch(tr);
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    if (typeof getPos === 'function') {
      e.dataTransfer.setData('application/tiptap-node-id', String(getPos()));
      // 원본 노드의 속성을 JSON 직렬화하여 저장 (필요한 경우)
      e.dataTransfer.setData(
        'application/tiptap-node-attrs',
        JSON.stringify(node.attrs)
      );
    }
    if (imageRef.current) {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.width = imageRef.current.width;
          canvas.height = imageRef.current.height;
          ctx.drawImage(imageRef.current, 0, 0);
          canvas.toBlob((blob) => {
            if (blob) {
              e.dataTransfer.setData(
                'application/tiptap-node-image',
                URL.createObjectURL(blob)
              );
            }
          });
        }
      } catch (err) {
        console.error('Error creating drag preview:', err);
      }
    }
  };

  return (
    <ImageWrapper className={`image-alignment-${alignment}`}>
      <ImageContainer
        alignment={alignment}
        selected={selected}
        draggable={!isResizing}
        onDragStart={handleDragStart}
        onClick={handleTap}
        onTouchEnd={handleTap}
        data-image-component="true"
      >
        <StyledImage
          ref={imageRef}
          src={node.attrs.src}
          alt={node.attrs.alt || ''}
          title={node.attrs.title || ''}
          style={{
            width: node.attrs.width || '100%',
            height: node.attrs.height || 'auto'
          }}
        />
        {selected && (
          <>
            <ResizeHandle
              onMouseDown={handleResizeStart}
              onTouchStart={handleResizeStart}
            />
            <AlignmentButtons>
              <AlignButton
                type="button"
                onClick={() => handleAlignmentChange('left')}
                className={alignment === 'left' ? 'active' : ''}
              >
                <AlignLeft />
              </AlignButton>
              <AlignButton
                type="button"
                onClick={() => handleAlignmentChange('center')}
                className={alignment === 'center' ? 'active' : ''}
              >
                <AlignCenter />
              </AlignButton>
              <AlignButton
                type="button"
                onClick={() => handleAlignmentChange('right')}
                className={alignment === 'right' ? 'active' : ''}
              >
                <AlignRight />
              </AlignButton>
            </AlignmentButtons>
          </>
        )}
      </ImageContainer>
    </ImageWrapper>
  );
};

export default ResizableImageComponent;

// Styled Components
const ImageWrapper = styled(NodeViewWrapper)`
  position: relative;
  display: block;
  margin: 0.5em 0;
  &.image-alignment-left {
    text-align: left;
  }
  &.image-alignment-center {
    text-align: center;
  }
  &.image-alignment-right {
    text-align: right;
  }
`;

const ImageContainer = styled.div<{ selected: boolean; alignment: string }>`
  position: relative;
  display: inline-block;
  cursor: ${(props) => (props.selected ? 'move' : 'pointer')};
  outline: ${(props) =>
    props.selected ? `2px solid ${props.theme.colors.purple600}` : 'none'};
`;

const StyledImage = styled.img`
  display: block;
  max-width: 100%;
`;

const ResizeHandle = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  bottom: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.purple600};
  cursor: nwse-resize;
  z-index: 2;
`;

const AlignmentButtons = styled.div`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  padding: 2px;
  z-index: 3;
  align-items: center;
`;

const AlignButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px 5px;
  border-radius: 2px;
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: #f0f0f0;
    }
  }

  &.active {
    background-color: #e0e0e0;
  }

  > svg {
    width: 18px;

    @media (max-width: 460px) {
      width: 15px;
    }
  }
`;
