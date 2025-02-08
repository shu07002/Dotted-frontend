import React, { useState } from 'react';
import styled from 'styled-components';

const tags = ['Living', 'Travel', 'Campus', 'Others'];

const PostingTagsColors: Record<string, string> = {
  Living: `purple950`,
  Travel: 'purple650',
  Others: 'gray400',
  Campus: 'purple450'
};

const getTagColor = (tag: string) => PostingTagsColors[tag];

interface TagBoxProps {
  selectedTag: string;
  setSelectedTag: React.Dispatch<React.SetStateAction<string>>;
}

export default function TagBox({ selectedTag, setSelectedTag }: TagBoxProps) {
  return (
    <TagBoxWrapper>
      {tags.map((tag, idx) => (
        <Tag
          key={idx}
          onClick={() => setSelectedTag(tag)}
          $selected={selectedTag === tag}
          $color={getTagColor(tag)}
        >
          {tag}
        </Tag>
      ))}
    </TagBoxWrapper>
  );
}

const TagBoxWrapper = styled.div`
  width: 100%;
  height: 5.4rem;

  display: flex;
  align-items: center;
  gap: 2rem;

  text-align: center;
  font-family: Inter;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.065rem;
`;

const Tag = styled.div<{ $selected: boolean; $color: string }>`
  color: ${({ theme, $selected }) =>
    $selected ? 'white' : theme.colors.gray400};
  display: flex;
  align-items: center;
  border-radius: 1.6rem;
  padding: 1rem;
  height: 2.2rem;
  cursor: pointer;
  background-color: ${({ theme, $selected, $color }) =>
    $selected ? `${theme.colors[$color]}` : ''};

  ${({ theme, $selected }) =>
    !$selected &&
    `&:hover {
    background-color: ${theme.colors.gray200};
  }`}
`;
