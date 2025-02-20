// DraggableImage.tsx
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styled from 'styled-components';

const ItemTypes = {
  IMAGE: 'image'
};

interface DraggableImageProps {
  image: { id: string; image_url: string };
  index: number;
  moveImage: (from: number, to: number) => void;
}

export default function DraggableImage({
  image,
  index,
  moveImage
}: DraggableImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.IMAGE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, drop] = useDrop({
    accept: ItemTypes.IMAGE,
    hover(item: { index: number }, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      // (선택사항) 마우스 위치에 따라 세밀하게 처리할 수 있음
      moveImage(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  drag(drop(ref));

  return (
    <ImageContainer ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <img src={image.image_url} alt="" />
    </ImageContainer>
  );
}

const ImageContainer = styled.div`
  width: 100px;
  height: 100px;
  margin-right: 1rem;
  cursor: grab;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
