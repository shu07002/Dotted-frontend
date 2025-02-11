import { CommunityPost } from '@/types/CommunityPost';
import { useState } from 'react';
import styled from 'styled-components';

import Profile from '@/assets/svg/CommunityPage/Profile.svg?react';
import Like from '@/assets/svg/CommunityPage/Like.svg?react';
import Comment from '@/assets/svg/CommunityPage/Comment.svg?react';
import More from '@/assets/svg/CommunityPage/More.svg?react';
import { MarketPost } from '@/types/MarketPost';

interface CommentSectionProps {
  post: CommunityPost | MarketPost;
}

export default function CommentSection({ post }: CommentSectionProps) {
  const [comment, setComment] = useState('');

  const [isCommentLiked, setIsCommentLiked] = useState(false);
  const [isOpenRecomment, setisOpenRecomment] = useState(false);

  const onClickCommentLike = () => {
    setIsCommentLiked(!isCommentLiked);
  };

  const onClickRecomment = () => {
    setisOpenRecomment(!isOpenRecomment);
  };
  return (
    <CommentSectionWrapper>
      <CommentCount>
        Comment <span> {post.comment_count}</span>
      </CommentCount>

      <CommentsListWrapper>
        <Comments>
          <Profile />
          <div>
            <div>diamondsinmyhead</div>
            <div>Hmmmmmmmmmm.........</div>
            <div>04/01/25 14:05</div>
            <ButtonWrapper>
              <button onClick={onClickCommentLike}>
                <Like className={`${isCommentLiked && 'commentLiked'}`} />3
              </button>
              <button onClick={onClickRecomment}>
                <Comment className={`${isOpenRecomment && 'recomment'}`} />
              </button>

              <button>
                <More />
              </button>
            </ButtonWrapper>
          </div>
        </Comments>
      </CommentsListWrapper>

      <CommentInputWrapper>
        <label htmlFor="comment">
          <textarea
            name="comment"
            placeholder="write a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>

        <CommentButton>comment</CommentButton>
      </CommentInputWrapper>
    </CommentSectionWrapper>
  );
}

const CommentSectionWrapper = styled.section`
  margin-bottom: 5.7rem;
`;

const CommentCount = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.gray800};
  font-family: Inter;
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.1rem;
  margin-bottom: 2.1rem;

  > span {
    color: ${({ theme }) => theme.colors.purple600};
  }
`;

const CommentsListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Comments = styled.li`
  display: flex;
  gap: 2.1rem;
  margin-bottom: 3.1rem;

  > div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    > div {
      font-family: Inter;
      font-style: normal;
      line-height: normal;
      &:first-child {
        color: ${({ theme }) => theme.colors.gray700};
        font-size: 2rem;
        font-weight: 600;
        letter-spacing: -0.1rem;
      }

      &:nth-child(2) {
        color: ${({ theme }) => theme.colors.gray700};
        font-size: 2rem;
        font-weight: 300;
        letter-spacing: -0.1rem;
      }

      &:nth-child(3) {
        color: ${({ theme }) => theme.colors.gray500};
        font-size: 1.4rem;
        font-weight: 300;
        letter-spacing: -0.07rem;
      }
    }
  }
`;

const ButtonWrapper = styled.div`
  color: ${({ theme }) => theme.colors.gray700};
  font-size: 1.4rem;
  font-weight: 300;
  letter-spacing: -0.07rem;
  display: flex;
  align-items: center;
  gap: 2rem;

  > button {
    min-width: 2rem;
    padding: 0;
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.2rem;

    > svg {
      &.commentLiked {
        > path {
          fill: ${({ theme }) => theme.colors.purple600};
          stroke: ${({ theme }) => theme.colors.purple600};
        }
      }

      &.recomment {
        fill: ${({ theme }) => theme.colors.purple600};
        stroke: ${({ theme }) => theme.colors.purple600};
        > path {
          fill: ${({ theme }) => theme.colors.purple600};
          stroke: ${({ theme }) => theme.colors.purple600};
        }
      }
    }
  }
`;

const CommentInputWrapper = styled.div`
  width: 100%;
  height: 10rem;
  display: flex;
  justify-content: space-between;
  gap: 1.8rem;

  label {
    width: 100%;
    textarea {
      resize: none;
      border: none;

      padding: 2rem;
      width: 100%;
      height: 100%;
      border-radius: 0.4rem;
      background: ${({ theme }) => theme.colors.gray100};

      font-family: Inter;
      font-size: 1.6rem;
      font-style: normal;
      font-weight: 300;

      letter-spacing: -0.08rem;
    }
  }
`;

const CommentButton = styled.button`
  cursor: pointer;
  border: none;
  padding: 0 2rem;
  height: 10rem;
  border-radius: 0.4rem;
  background: ${({ theme }) => theme.colors.purple600};

  color: ${({ theme }) => theme.colors.gray50};
  text-align: center;
  font-family: Inter;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.08rem;
`;
