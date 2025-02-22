import { useState } from 'react';
import styled from 'styled-components';

import { Comment, PostDetail } from '@/pages/community/DetailCommunityPage';
import { MarketPostDetail } from '@/pages/market/DetailMarketPage';
import { useMutation } from '@tanstack/react-query';
import AComment from './AComment';

interface CommentSectionProps {
  post: PostDetail | MarketPostDetail;
}

export default function CommentSection({ post }: CommentSectionProps) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(post.comments); // ✅ 댓글 상태 추가
  const [commentCount, setCommentCount] = useState(post.comment_count); // ✅ 댓글 개수 상태 추가

  // 댓글 추가 함수
  const handleCommentSubmit = async () => {
    if (!comment.trim()) {
      return;
    }

    const accessToken = window.localStorage.getItem('accessToken');
    if (!accessToken) {
      alert('Login is required.');
      return;
    }

    const requestData = {
      post: post.id, // ✅ 댓글을 달 게시글 ID
      content: comment.trim(), // ✅ 입력된 댓글 내용
      parent: null, // ✅ 대댓글이면 부모 댓글 ID, 아니면 null
      is_secret: false // ✅ 비밀 댓글 기능이 필요하면 true로 변경
    };

    try {
      const newComment = await postCommentMutation.mutateAsync(requestData);
      setComment(''); // ✅ 댓글 입력창 초기화

      // ✅ 화면에 바로 반영하기 위해 comments 상태 업데이트
      setComments((prev: Comment[]) => [...prev, newComment]);
      setCommentCount((prev) => prev + 1); // ✅ 댓글 개수 증가
    } catch (error) {
      console.error('❌ 댓글 작성 실패:', error);
      alert('댓글 작성에 실패했습니다.');
    }
  };

  // React Query Mutation (댓글 등록)
  const postCommentMutation = useMutation<
    Comment, // ✅ 응답 데이터 타입 (새로운 댓글)
    Error, // ✅ 에러 타입
    { post: number; content: string; parent: number | null; is_secret: boolean } // ✅ 요청 데이터 타입
  >({
    mutationFn: async (data) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/posting/comment/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`
          },
          body: JSON.stringify(data)
        }
      );

      if (!response.ok) throw new Error('Failed to create comment');
      return response.json();
    },
    onSuccess: (data) => {
      console.log('✅ 댓글 작성 성공:', data);
    },
    onError: (error) => {
      console.error('❌ 댓글 작성 실패:', error);
    }
  });

  return (
    <CommentSectionWrapper>
      <CommentCount>
        Comment <span> {commentCount}</span>
      </CommentCount>

      <CommentsListWrapper>
        {comments.map((comment, idx) => (
          <AComment comment={comment} key={idx} />
        ))}
      </CommentsListWrapper>

      <CommentInputWrapper>
        <label htmlFor="comment">
          <textarea
            name="comment"
            placeholder="write a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleCommentSubmit();
              }
            }}
          />
        </label>

        <CommentButton onClick={handleCommentSubmit}>comment</CommentButton>
      </CommentInputWrapper>
    </CommentSectionWrapper>
  );
}

const CommentSectionWrapper = styled.section`
  margin-bottom: 20.7rem;
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
