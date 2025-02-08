import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

const tags = ['All', 'HOT', 'Campus Life', 'Travel', 'Living', 'Others'];

interface TagListProps {
  selectedTag: string;
  onClickTag: (tag: string) => void;
}

export default function TagList({ selectedTag, onClickTag }: TagListProps) {
  return (
    <TagListContainer>
      {tags.map((tag, idx) => (
        <TagWrapper key={idx}>
          <Tag
            value={tag}
            onClick={() => onClickTag(tag)}
            $selected={selectedTag === tag}
          >
            {tag}
          </Tag>
          {selectedTag === tag && (
            <MotionUnderline
              layoutId="underline"
              initial={false}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 40
              }}
            />
          )}
        </TagWrapper>
      ))}
    </TagListContainer>
  );
}

const TagListContainer = styled.ul`
  display: flex;
  align-items: end;

  @media (max-width: 1205px) {
    display: grid;
    grid-template-columns: repeat(3, minmax(4rem, 1fr));
  }

  @media (max-width: 1125px) {
    display: flex;
    align-items: end;
  }

  @media (max-width: 786px) {
    display: grid;
    grid-template-columns: repeat(3, minmax(4rem, 1fr));
  }
`;

const TagWrapper = styled.div`
  position: relative;
`;

const Tag = styled.li<{ $selected: boolean }>`
  cursor: pointer;

  padding: 0.75rem;
  margin: 0.5rem;
  border-radius: 20px;

  color: ${({ theme }) => theme.colors.gray400};
  text-align: center;
  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 2.4rem; /* 150% */
  letter-spacing: -0.032rem;
  transition: background-color 0.3s ease;

  ${({ theme, $selected }) =>
    $selected
      ? `font-weight: 700; color: ${theme.colors.purple600}`
      : `&:hover {
    background-color: ${theme.colors.backgroundBase}; 
  }`};
`;
const MotionUnderline = styled(motion.div)`
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.purple600};
  position: absolute;
`;
