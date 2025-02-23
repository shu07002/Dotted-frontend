import { Comment } from '@/pages/community/DetailCommunityPage';
import { useState } from 'react';
import CommentSVG from '@/assets/svg/CommunityPage/Comment.svg?react';
import Profile from '@/assets/svg/CommunityPage/Profile.svg?react';
import Like from '@/assets/svg/CommunityPage/Like.svg?react';
import styled from 'styled-components';
import More from '@/assets/svg/CommunityPage/More.svg?react';
import { useMutation } from '@tanstack/react-query';
import ReplySection from './ReplySection';
import Modal from 'react-modal';

interface ACommentProps {
  comment: Comment;
}

const customStyles = {
  content: {
    inset: '0',
    padding: '0',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    overflowY: 'hidden' as 'auto' | 'hidden' | 'scroll' | 'visible' | undefined,
    backgroundColor: 'var(--modal-Background)',
    zIndex: 9999
  },
  overlay: {
    zIndex: 9999
  }
};

export default function AComment({ comment }: ACommentProps) {
  const [isCommentLiked, setIsCommentLiked] = useState(comment.is_liked);
  const [likeCount, setLikeCount] = useState(comment.like_count);
  const [isOpenRecomment, setIsOpenRecomment] = useState(false);
  const [recomment, setRecomment] = useState('');
  const [replies, setReplies] = useState<Comment[]>(comment.replies || []);
  const [openMore, setOpenMore] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [openNormalModal, setOpenNormalModal] = useState(false);

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

  const updateCommentMutation = useMutation({
    mutationFn: async () => {
      const accessToken = window.localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Login required');
      }

      const requestData = {
        content: editedContent,
        is_secret: false // 공개 댓글
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/posting/comment/${comment.id}/update`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify(requestData)
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update comment');
      }
      return response.json();
    },
    onSuccess: (updatedComment) => {
      setEditedContent(updatedComment.content); // 최신 댓글 내용 업데이트
      setIsEditing(false); // 수정 모드 종료
    },
    onError: (error) => {
      console.error('❌ 댓글 수정 실패:', error);
    }
  });

  const handleEditSubmit = () => {
    if (!editedContent.trim()) return;
    updateCommentMutation.mutate();
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
      setReplies((prev) => [...prev, newComment]); // 대댓글 목록에 즉시 추가
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

  // 2) 버튼 클릭 시 삭제 Mutation 실행
  const handleDelete = () => {
    setOpenNormalModal(false);

    deleteMutation.mutate();
  };

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const accessToken = window.localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Login required');
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/posting/comment/${comment.id}/delete`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }
    },
    onSuccess: () => {
      setEditedContent('Deleted Comment');
    },
    onError: (error) => {
      console.error('❌ 댓글 삭제 실패:', error);
    }
  });

  return (
    <Comments>
      <Profile />
      <div style={{ width: '100%' }}>
        {isEditing ? (
          <CommentInputWrapper>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleEditSubmit();
                }
              }}
            />
            <CommentButton onClick={handleEditSubmit}>Save</CommentButton>
            <CancelButton onClick={() => setIsEditing(false)}>
              Cancel
            </CancelButton>
          </CommentInputWrapper>
        ) : (
          <>
            <div>{comment.user_nickname}</div>
            <div>{editedContent}</div>
            <div>{comment.created_at}</div>
          </>
        )}
        <ButtonWrapper>
          <button onClick={onClickCommentLike}>
            <Like className={`${isCommentLiked && 'commentLiked'}`} />
            {likeCount}
          </button>
          <button onClick={onClickRecomment}>
            <CommentSVG className={`${isOpenRecomment && 'recomment'}`} />
          </button>

          {comment.content !== 'Deleted Comment' && (
            <MoreWrapper>
              <button onClick={() => setOpenMore((prev) => !prev)}>
                <More />
                {openMore && (
                  <Menu>
                    {comment.is_mine ? (
                      <>
                        <div onClick={() => setIsEditing(true)}>Edit</div>
                        <div onClick={() => setOpenNormalModal(true)}>
                          Delete
                        </div>
                      </>
                    ) : (
                      <div>Report</div>
                    )}
                  </Menu>
                )}
              </button>
            </MoreWrapper>
          )}
        </ButtonWrapper>
        <Modal
          isOpen={openNormalModal}
          style={customStyles}
          onRequestClose={() => setOpenNormalModal(!openNormalModal)}
          contentLabel="example"
        >
          <AccessRestrictedWrapper>
            <div>
              <AccessRestrictedNormal>
                <TextNormal>
                  <span>Are you sure you want to delete this comment?</span>
                </TextNormal>
              </AccessRestrictedNormal>
              <ButtonBox>
                <LaterButton
                  onClick={() => setOpenNormalModal(!openNormalModal)}
                >
                  Cancle
                </LaterButton>
                <NowButton onClick={handleDelete}>
                  {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                </NowButton>
              </ButtonBox>
            </div>
          </AccessRestrictedWrapper>
        </Modal>

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

        {replies.length > 0 && <ReplySection replies={replies} />}
      </div>
    </Comments>
  );
}

const MoreWrapper = styled.div`
  position: relative;
`;

const CommentInputWrapper = styled.div`
  width: 100%;
  height: 10rem;
  display: flex;

  gap: 1.8rem;

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

const Menu = styled.div`
  z-index: 10;
  position: absolute;
  top: -250%;
  left: 150%;

  margin-top: 1rem;
  background-color: ${({ theme }) => theme.colors.gray100};
  color: ${({ theme }) => theme.colors.gray800};

  > div {
    cursor: pointer;
    padding: 1rem;
    &:hover {
      background-color: ${({ theme }) => theme.colors.gray200};
    }
  }
`;

const CancelButton = styled.button`
  cursor: pointer;
  border: none;
  padding: 0.8rem 1.5rem;
  background: ${({ theme }) => theme.colors.gray400};
  color: ${({ theme }) => theme.colors.gray50};
  border-radius: 0.4rem;
`;

const AccessRestrictedWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: var(--Modal-Background, rgba(12, 12, 12, 0.3));
  position: absolute;
  z-index: 10;
  top: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const AccessRestrictedNormal = styled.div`
  z-index: 200;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 5.6rem 2rem 0 2rem;
  width: 51rem;
  height: 23.6rem;
  flex-shrink: 0;
  border-radius: 5px 5px 0 0;
  background: ${({ theme }) => theme.colors.backgroundLayer1};

  /* popup */
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.11);
`;

const TextNormal = styled.div`
  display: flex;
  justify-content: center;

  > span {
    color: ${({ theme }) => theme.colors.gray700};
    text-align: center;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 34px; /* 170% */
    letter-spacing: -0.8px;

    > span {
      font-weight: 700;
    }
  }
`;

const ButtonBox = styled.div`
  display: flex;
  width: 100%;
  height: 7.4rem;
  border-radius: 0 0 5px 5px;
  background: ${({ theme }) => theme.colors.backgroundLayer1};

  > div {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 25px; /* 125% */
    letter-spacing: -0.6px;
  }
`;

const LaterButton = styled.div`
  width: 50%;
  border-radius: 0px 0px 0px 5px;
  background: ${({ theme }) => theme.colors.backgroundBase};
  color: ${({ theme }) => theme.colors.gray700};
`;
const NowButton = styled.div`
  width: 50%;
  border-radius: 0px 0px 5px 0px;
  background: var(--Semantic-Negative-900, #ea3729);
  color: ${({ theme }) => theme.colors.gray50};
`;
