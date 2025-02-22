import { Comment } from '@/pages/community/DetailCommunityPage';
import React, { useState } from 'react';
import CommentSVG from '@/assets/svg/CommunityPage/Comment.svg?react';
import Profile from '@/assets/svg/CommunityPage/Profile.svg?react';
import Like from '@/assets/svg/CommunityPage/Like.svg?react';
import styled from 'styled-components';
import More from '@/assets/svg/CommunityPage/More.svg?react';
import { useMutation } from '@tanstack/react-query';
import ReplySection from './ReplySection';

interface ACommentProps {
  comment: Comment;
}

export default function AComment({ comment }: ACommentProps) {
  const [isCommentLiked, setIsCommentLiked] = useState(comment.is_liked);
  const [likeCount, setLikeCount] = useState(comment.like_count);
  const [isOpenRecomment, setIsOpenRecomment] = useState(false);
  const [recomment, setRecomment] = useState('');
  const [replies, setReplies] = useState<Comment[]>(comment.replies || []);

  const commentLikeMutation = useMutation({
    mutationFn: async () => {
      const accessToken = window.localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Login required');
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/posting/comment/${comment.id}/like`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to like the comment');
      }
      return response.json();
    },
    onSuccess: (data) => {
      setIsCommentLiked(data.is_liked);
      setLikeCount(data.like_count);
    },
    onError: (error) => {
      console.error('❌ 댓글 좋아요 실패:', error);
    }
  });

  const onClickCommentLike = () => {
    commentLikeMutation.mutate();
  };

  const onClickRecomment = () => {
    setIsOpenRecomment(!isOpenRecomment);
  };

  const recommentMutation = useMutation({
    mutationFn: async () => {
      const accessToken = window.localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Login required');
      }

      const requestData = {
        post: comment.post, // 게시글 ID
        content: recomment.trim(), // 대댓글 내용
        parent: comment.id, // 원본 댓글 ID
        is_secret: false // 공개 대댓글
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/posting/comment/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify(requestData)
        }
      );

      if (!response.ok) {
        throw new Error('Failed to post recomment');
      }
      return response.json();
    },
    onSuccess: (newComment) => {
      setReplies((prev) => [...prev, newComment]); // 대댓글 목록에 추가
      setRecomment(''); // 입력창 초기화
    },
    onError: (error) => {
      console.error('❌ 대댓글 작성 실패:', error);
    }
  });

  const handleRecommentSubmit = () => {
    if (!recomment.trim()) return;
    recommentMutation.mutate();
  };

  return (
    <Comments>
      <Profile />
      <div style={{ width: '100%' }}>
        <div>{comment.user_nickname}</div>
        <div>{comment.content}</div>
        <div>{comment.created_at}</div>
        <ButtonWrapper>
          <button onClick={onClickCommentLike}>
            <Like className={`${isCommentLiked && 'commentLiked'}`} />
            {likeCount}
          </button>
          <button onClick={onClickRecomment}>
            <CommentSVG className={`${isOpenRecomment && 'recomment'}`} />
          </button>

          <button>
            <More />
          </button>
        </ButtonWrapper>

        {/* 대댓글 입력창 */}
        {isOpenRecomment && (
          <CommentInputWrapper>
            <label htmlFor="comment">
              <textarea
                name="comment"
                placeholder="Write a reply..."
                value={recomment}
                onChange={(e) => setRecomment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleRecommentSubmit();
                  }
                }}
              />
            </label>

            <CommentButton onClick={handleRecommentSubmit}>Reply</CommentButton>
          </CommentInputWrapper>
        )}

        {/* 대댓글 목록 */}
        {replies.length > 0 && <ReplySection replies={comment.replies} />}
      </div>
    </Comments>
  );
}

const CommentInputWrapper = styled.div`
  width: 100%;
  height: 10rem;
  display: flex;
  justify-content: space-between;
  gap: 1.8rem;

  label {
    width: 100%;
    textarea {
      width: 100%;
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
