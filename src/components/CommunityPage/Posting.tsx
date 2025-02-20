import styled from 'styled-components';
import More from '@/assets/svg/CommunityPage/More.svg?react';
import Eye from '@/assets/svg/CommunityPage/Eye.svg?react';
import Profile from '@/assets/svg/CommunityPage/Profile.svg?react';
import Like from '@/assets/svg/CommunityPage/Like.svg?react';
import Scrap from '@/assets/svg/CommunityPage/Scrap.svg?react';

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { PostDetail } from '@/pages/community/DetailCommunityPage';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { useMutation } from '@tanstack/react-query';

Modal.setAppElement('#root');

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
  post: PostDetail;
  isLiked: boolean;
  isScraped: boolean;
  onClickLike: () => void;
  onClickScrap: () => void;
}

const customStyles = {
  content: {
    inset: '0',
    padding: '0',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    overflowY: 'hidden' as 'auto' | 'hidden' | 'scroll' | 'visible' | undefined,
    backgroundColor: 'var(--modal-Background)'
  }
};

export default function Posting({
  post,
  isLiked,
  isScraped,
  onClickLike,
  onClickScrap
}: PostingProps) {
  const [openMore, setOpenMore] = useState(false);
  let replacedContent = post.content;
  const navigate = useNavigate();
  const [localLikeCount, setLocalLikeCount] = useState(post.like_count);
  const [localLiked, setLocalLiked] = useState(post.is_liked);

  const [localScrapCount, setLocalScrapCount] = useState(post.scrap_count);
  const [localScrapped, setLocalScrapped] = useState(post.is_scrapped);

  const [openModal, setOpenModal] = useState(false);

  if (openModal) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  const handleLikeClick = () => {
    if (localLiked) {
      setLocalLikeCount((prev) => prev - 1);
    } else {
      setLocalLikeCount((prev) => prev + 1);
    }
    setLocalLiked((prev) => !prev);
    onClickLike();
  };

  const deleteMutation = useMutation({
    mutationFn: async (postId: number) => {
      const accessToken = window.localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token found. Please log in again.');
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/posting/${postId}/delete`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }
      return response.json();
    },
    onSuccess: (data) => {
      console.log('✅ 삭제 성공:', data);
      // 삭제 성공 시 원하는 페이지로 이동
    },
    onError: (error) => {
      console.error('❌ 삭제 실패:', error);
    }
  });

  // 2) 버튼 클릭 시 삭제 Mutation 실행
  const handleDelete = () => {
    setOpenModal(false);
    navigate('/community');
  };

  const handleScrapClick = () => {
    if (localScrapped) {
      setLocalScrapCount((prev) => prev - 1);
    } else {
      setLocalScrapCount((prev) => prev + 1);
    }
    setLocalScrapped((prev) => !prev);
    onClickScrap();
  };

  if (post.images && post.images.length > 0) {
    post.images.forEach((imgObj, index) => {
      // 예: 'src="{images[0].image_url}"' => 'src="https://example.com/img1.png"'
      const placeholder = `src={images[${index}].image_url}`;
      const realSrc = `src="${imgObj.image_url}"`;

      replacedContent = replacedContent.replace(placeholder, realSrc);
    });
  }
  console.log(post);
  return (
    <PostingWrapper>
      <InfoWrapper>
        <PostingTagWrapper tag={post.tag} />

        <TitleWrapper>
          <Title>{post.title}</Title>
          <button onClick={() => setOpenMore((prev) => !prev)}>
            <More />
            {openMore && (
              <Menu>
                <div
                  onClick={() =>
                    navigate('edit', {
                      state: {
                        postId: post.id,
                        title: post.title,
                        content: replacedContent,
                        tag: post.tag,
                        images: post.images
                      }
                    })
                  }
                >
                  Edit
                </div>
                <div onClick={() => setOpenModal(true)}>Delete</div>
              </Menu>
            )}
          </button>
        </TitleWrapper>

        <PostingWriter>
          <Profile />
          <span>{post.created_at}</span>
          <span>•</span>
          <span>by</span>
          <span>•</span>
          <span>{post.writer_nickname}</span>
          <span>•</span>
          <span>
            <Eye /> {post.view_count}
          </span>
        </PostingWriter>
      </InfoWrapper>

      <ContentWrapper>
        <StyledReactQuill
          value={replacedContent}
          readOnly={true}
          theme="snow"
          modules={{ toolbar: false }}
        />

        <ButtonWrapper>
          <Button className={`${isLiked && 'liked'}`} onClick={handleLikeClick}>
            <Like />
            <span>{localLikeCount} likes</span>
          </Button>
          <Button
            className={`${isScraped && 'scraped'}`}
            onClick={handleScrapClick}
          >
            <Scrap />
            <span>{localScrapCount} scraps</span>
          </Button>
        </ButtonWrapper>
      </ContentWrapper>

      <Modal
        isOpen={openModal}
        style={customStyles}
        onRequestClose={() => setOpenModal(!openModal)}
        contentLabel="example"
      >
        <AccessRestrictedWrapper>
          <div>
            <AccessRestricted>
              <Text>
                <span>Are you sure you want to delete this post?</span>
              </Text>
            </AccessRestricted>
            <ButtonBox>
              <LaterButton onClick={() => setOpenModal(!openModal)}>
                Cancle
              </LaterButton>
              <NowButton onClick={handleDelete}>
                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
              </NowButton>
            </ButtonBox>
          </div>
        </AccessRestrictedWrapper>
      </Modal>
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
  position: relative;
  > button {
    position: relative;
    border: none;
    background-color: transparent;
    cursor: pointer;
    min-width: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Menu = styled.div`
  z-index: 10;
  position: absolute;
  top: 100%;
  right: 0;
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
    min-height: 42.6rem;
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

const AccessRestricted = styled.div`
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

const Text = styled.div`
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
