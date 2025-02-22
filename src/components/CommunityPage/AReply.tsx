import { Comment } from '@/pages/community/DetailCommunityPage';
import React, { useState } from 'react';
import Profile from '@/assets/svg/CommunityPage/Profile.svg?react';
import styled from 'styled-components';
import Like from '@/assets/svg/CommunityPage/Like.svg?react';
import More from '@/assets/svg/CommunityPage/More.svg?react';
import { useMutation } from '@tanstack/react-query';

interface AReplyProps {
  reply: Comment;
}

export default function AReply({ reply }: AReplyProps) {
  const [isCommentLiked, setIsCommentLiked] = useState(reply.is_liked);
  const [likeCount, setLikeCount] = useState(reply.like_count);

  // 대댓글 좋아요 Mutation
  const replyLikeMutation = useMutation({
    mutationFn: async () => {
      const accessToken = window.localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Login required');
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/posting/comment/${reply.id}/like`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to like the reply');
      }
      return response.json();
    },
    onSuccess: (data) => {
      setIsCommentLiked(data.is_liked);
      setLikeCount(data.like_count);
    },
    onError: (error) => {
      console.error('❌ 대댓글 좋아요 실패:', error);
    }
  });

  const onClickReplyLike = () => {
    replyLikeMutation.mutate();
  };

  return (
    <Comments>
      <Profile />
      <div style={{ width: '100%' }}>
        <div>{reply.user_nickname}</div>
        <div>{reply.content}</div>
        <div>{reply.created_at}</div>
        <ButtonWrapper>
          <button onClick={onClickReplyLike}>
            <Like className={`${isCommentLiked && 'commentLiked'}`} />
            {likeCount}
          </button>

          <button>
            <More />
          </button>
        </ButtonWrapper>
      </div>
    </Comments>
  );
}

const Comments = styled.div`
  display: flex;
  gap: 2.1rem;
  margin-top: 3.1rem;

  > div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    > div {
      font-family: Inter;
      &:first-child {
        font-size: 2rem;
        font-weight: 600;
      }
      &:nth-child(2) {
        font-size: 2rem;
        font-weight: 300;
      }
      &:nth-child(3) {
        font-size: 1.4rem;
        font-weight: 300;
      }
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  > button {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 1.2rem;
    > svg {
      &.commentLiked {
        > path {
          fill: ${({ theme }) => theme.colors.purple600};
          stroke: ${({ theme }) => theme.colors.purple600};
        }
      }
    }
  }
`;
