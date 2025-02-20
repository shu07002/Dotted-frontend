import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styled from 'styled-components';

interface DraggableImageProps {
  index: number;
  previews: (string | null)[];
  preview: string | null;
  imgFileRef: React.RefObject<HTMLInputElement>;
  handleDeleteImage: (index: number) => void;
  handleFileChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  setPreviews: React.Dispatch<React.SetStateAction<(string | null)[]>>;
}

interface DragItem {
  index: number;
  type: string;
}

export default function DraggableImage({
  index,
  previews,
  preview,
  handleDeleteImage,
  setPreviews
}: DraggableImageProps) {
  const ref = useRef<HTMLLIElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'image',
    item: () => ({ type: 'image', index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const [{ isOver }, drop] = useDrop<DragItem, void, { isOver: boolean }>({
    accept: 'image',
    collect: (monitor) => ({
      isOver: monitor.isOver()
    }),
    drop: (item) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const dropIndex = index;

      if (dragIndex === dropIndex) {
        return;
      }

      const newPreviews = [...previews];
      [newPreviews[dragIndex], newPreviews[dropIndex]] = [
        newPreviews[dropIndex],
        newPreviews[dragIndex]
      ];
      setPreviews(newPreviews);
    }
  });

  drag(drop(ref));

  const opacity = isDragging ? 0.4 : 1;
  const scale = isOver ? 1.02 : 1;

  return (
    <StyledLi
      ref={ref}
      style={{
        opacity,
        transform: `scale(${scale})`,
        border: isOver ? '2px dashed #666' : 'none'
      }}
    >
      {preview ? (
        <figure onClick={() => handleDeleteImage(index)}>
          <img src={preview} alt={`preview-${index}`} />
        </figure>
      ) : null}
    </StyledLi>
  );
}

const StyledLi = styled.li`
  cursor: move;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
  position: relative;
`;
