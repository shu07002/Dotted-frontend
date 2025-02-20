// DnDImageList.tsx
import React from 'react';
import DraggableImage from './DraggableImage';
import styled from 'styled-components';

interface DnDImageListProps {
  images: { id: string; image_url: string }[];
  setImages: (images: { id: string; image_url: string }[]) => void;
}

export default function DnDImageList({ images, setImages }: DnDImageListProps) {
  const moveImage = (from: number, to: number) => {
    const updatedImages = [...images];
    const [removed] = updatedImages.splice(from, 1);
    updatedImages.splice(to, 0, removed);
    setImages(updatedImages);
  };

  return (
    <ImageListContainer>
      {images.map((img, index) => (
        <DraggableImage
          key={img.id}
          image={img}
          index={index}
          moveImage={moveImage}
        />
      ))}
    </ImageListContainer>
  );
}

const ImageListContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;
