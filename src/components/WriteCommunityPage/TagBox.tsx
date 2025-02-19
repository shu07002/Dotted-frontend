import { Communitydata } from '@/pages/community/WriteCommunityPage';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
} from 'react-hook-form';
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
  register: UseFormRegister<Communitydata>;
  watch: UseFormWatch<Communitydata>;
  setValue: UseFormSetValue<Communitydata>;
}

export default function TagBox({ register, watch, setValue }: TagBoxProps) {
  const tagValue = watch('tag');

  const onClickTag = (tag: string) => {
    setValue('tag', tag);
  };
  return (
    <TagBoxWrapper>
      {tags.map((tag, idx) => (
        <Tag
          key={idx}
          $color={getTagColor(tag)}
          $selected={tagValue === tag}
          onClick={() => onClickTag(tag)}
        >
          {tag}
        </Tag>
      ))}
      <input
        type="hidden"
        {...register('tag', { required: 'Plaese select tag' })}
      />
    </TagBoxWrapper>
  );
}

const TagBoxWrapper = styled.ul`
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

const Tag = styled.li<{ $selected: boolean; $color: string }>`
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
