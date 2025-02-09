import styled from 'styled-components';
import Eye from '@/assets/svg/CommunityPage/Eye.svg?react';
import { CommunityPost } from '@/types/CommunityPost';

const PostingTagsColors: Record<string, string> = {
  Living: `purple950`,
  Travel: 'purple650',
  Others: 'gray400',
  Campus: 'purple450'
};

const getTagColor = (tag: string) => PostingTagsColors[tag];
const PostingTagWrapper = ({ tag }: { tag: string }) => {
  return (
    <PostingTag $color={getTagColor(tag)}>
      <div>{tag}</div>
    </PostingTag>
  );
};

interface PostingListProps {
  pagedData: CommunityPost[];
}

export default function PostingList({ pagedData }: PostingListProps) {
  return (
    <PostingListWrapper>
      {pagedData.map((post: CommunityPost, idx: number) => (
        <li
          key={idx}
          onClick={() =>
            (window.location.href = `/community/detail/${post.id}`)
          }
        >
          <PostingTagContainer>
            <PostingTagWrapper tag={post.tag} />
            <div></div>
          </PostingTagContainer>
          <PostingInfo>
            <PostingTitle>
              <span>{post.title}</span>
              <span>[{post.comment_count}]</span>
            </PostingTitle>
            <PostingWriter>
              <span>{post.createdAt}</span>
              <span>•</span>
              <span>by</span>
              <span>•</span>
              <span>{post.writer}</span>
              <span>•</span>
              <span>
                <Eye /> {post.view}
              </span>
            </PostingWriter>
          </PostingInfo>
        </li>
      ))}
    </PostingListWrapper>
  );
}

const PostingListWrapper = styled.ul`
  width: 100%;

  > li {
    cursor: pointer;
    width: 100%;
    height: 9.2rem;
    display: flex;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};

    &:hover {
      background-color: ${({ theme }) => theme.colors.gray100};
    }
  }
`;

const PostingTagContainer = styled.div`
  width: 10rem;
  height: 50%;
  > div {
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const PostingInfo = styled.div`
  width: 100%;
  height: 50%;
`;

const PostingTitle = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  gap: 1rem;

  > span {
    &:first-child {
      color: ${({ theme }) => theme.colors.gray700};
      font-size: 2rem;
      font-weight: 600;
      letter-spacing: -0.1rem;
    }

    color: ${({ theme }) => theme.colors.gray700};
    font-family: Inter;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.08rem;
  }
`;

const PostingWriter = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  gap: 1rem;

  > span {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: ${({ theme }) => theme.colors.gray500};
    font-family: Inter;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.07rem;

    &:first-child,
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4),
    &:nth-child(6),
    &:nth-child(7) {
      font-size: 1.4rem;
      font-weight: 300;
    }

    &:nth-child(5) {
      font-size: 1.4rem;
      font-weight: 500;
    }

    > svg {
      display: flex;
      align-items: center;
    }
  }
`;

const PostingTag = styled.div<{ $color: string }>`
  color: ${({ theme }) => theme.colors.gray50};
  text-align: center;
  font-family: Inter;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.065rem;

  > div {
    display: flex;
    align-items: center;
    padding: 1rem;
    height: 2.2rem;
    border-radius: 1.6rem;
    background-color: ${({ theme, $color }) => `${theme.colors[$color]}`};
  }
`;
