import styled from 'styled-components';
import More from '@/assets/svg/CommunityPage/More.svg?react';
import Eye from '@/assets/svg/CommunityPage/Eye.svg?react';
import Profile from '@/assets/svg/CommunityPage/Profile.svg?react';
import Like from '@/assets/svg/CommunityPage/Like.svg?react';
import Scrap from '@/assets/svg/CommunityPage/Scrap.svg?react';

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
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

interface PostingProps {
  post: CommunityPost;
  isLiked: boolean;
  isScraped: boolean;
  onClickLike: () => void;
  onClickScrap: () => void;
}

export default function Posting({
  post,
  isLiked,
  isScraped,
  onClickLike,
  onClickScrap
}: PostingProps) {
  return (
    <PostingWrapper>
      <InfoWrapper>
        <PostingTagWrapper tag={post.tag} />

        <TitleWrapper>
          <Title>{post.title}</Title>
          <button>
            <More />
          </button>
        </TitleWrapper>

        <PostingWriter>
          <Profile />
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
      </InfoWrapper>

      <ContentWrapper>
        <StyledReactQuill
          value={post.content}
          readOnly={true}
          theme="snow"
          modules={{ toolbar: false }}
        />

        <ButtonWrapper>
          <Button className={`${isLiked && 'liked'}`} onClick={onClickLike}>
            <Like />
            <span>2 likes</span>
          </Button>
          <Button
            className={`${isScraped && 'scraped'}`}
            onClick={onClickScrap}
          >
            <Scrap />
            <span>2 scraps</span>
          </Button>
        </ButtonWrapper>
      </ContentWrapper>
    </PostingWrapper>
  );
}

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PostingWrapper = styled.div`
  padding: 2rem 3rem 0 3rem;

  margin-bottom: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  display: flex;

  > div {
    display: flex;
    align-items: center;
    padding: 1rem;
    height: 2.2rem;
    border-radius: 1.6rem;
    background-color: ${({ theme, $color }) => `${theme.colors[$color]}`};
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    min-width: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Title = styled.div`
  color: ${({ theme }) => theme.colors.gray800};
  font-family: Pretendard;
  font-size: 2.8rem;
  font-style: normal;
  font-weight: 700;
  line-height: 3.6rem; /* 128.571% */
  letter-spacing: -0.112rem;
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
    font-size: 1.4rem;
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
      font-weight: 300;
    }

    &:nth-child(5) {
      font-weight: 500;
    }

    > svg {
      display: flex;
      align-items: center;
    }
  }
`;

const ContentWrapper = styled.div`
  width: 100%;

  border-top: 1px solid ${({ theme }) => theme.colors.gray300};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
`;

const StyledReactQuill = styled(ReactQuill)`
  width: 100%;

  box-sizing: border-box;

  .ql-container {
    border: none;
  }

  .ql-editor,
  .ql-blank {
    height: 42.6rem;
  }

  .ql-size-small {
    font-size: 1.5rem;
  }

  p {
    font-size: 2rem;
  }

  .ql-size-large {
    font-size: 3rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2.1rem;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  border-radius: 2.4rem;
  background: ${({ theme }) => theme.colors.backgroundLayer1};
  border: none;

  display: flex;
  align-items: center;
  gap: 1rem;

  > span {
    color: ${({ theme }) => theme.colors.gray700};
    text-align: center;
    font-family: Inter;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: -0.08rem;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.purple100};
  }

  &.liked {
    background: ${({ theme }) => theme.colors.purple100};
    > svg > path {
      fill: ${({ theme }) => theme.colors.purple600};
      stroke: ${({ theme }) => theme.colors.purple600};
    }

    > span {
      color: ${({ theme }) => theme.colors.purple600};
      font-weight: 500;
    }
  }

  &.scraped {
    background: ${({ theme }) => theme.colors.purple100};
    > svg > g > path {
      fill: ${({ theme }) => theme.colors.purple600};
      stroke: ${({ theme }) => theme.colors.purple600};
    }

    > span {
      color: ${({ theme }) => theme.colors.purple600};
      font-weight: 500;
    }
  }
`;
