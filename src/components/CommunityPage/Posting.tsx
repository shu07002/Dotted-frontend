import styled from 'styled-components';
import More from '@/assets/svg/CommunityPage/More.svg?react';
import Eye from '@/assets/svg/CommunityPage/Eye.svg?react';
import Profile from '@/assets/svg/CommunityPage/Profile.svg?react';
import Like from '@/assets/svg/CommunityPage/Like.svg?react';
import Scrap from '@/assets/svg/CommunityPage/Scrap.svg?react';
import ReportFlag from '@/assets/svg/CommunityPage/ReportFlag.svg?react';
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

  const [openNormalModal, setOpenNormalModal] = useState(false);
  const [openReportModal, setOpenReportModal] = useState(false);

  const [reportType, setReportType] = useState('');
  const [reportContent, setReportContent] = useState('');

  if (openNormalModal || openReportModal) {
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
    setOpenNormalModal(false);
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
  const handleChange = (e: any) => setReportType(e.target.value);

  const reportMutation = useMutation({
    mutationFn: async () => {
      const accessToken = window.localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token found. Please log in again.');
      }
      const dataToSend = {
        report_type: reportType, // 라디오 버튼에서 선택한 신고 유형
        content_type: 'Post', // 게시글 신고
        object_id: post.id, // 게시글 ID
        reason: reportContent // 신고 사유
      };

      // POST /management/report
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/management/report`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify(dataToSend)
        }
      );

      if (!response.ok) {
        throw new Error('Failed to report');
      }
      return response.json();
    },
    onSuccess: (data) => {
      console.log('✅ 신고 성공:', data);
      setReportContent('');
      setReportType('');
      // 신고 후 모달 닫기
      setOpenReportModal(false);
      // 필요하다면 후처리 (예: 알림, 페이지 이동 등)
      alert('Your report has been submitted.');
    },
    onError: (error) => {
      console.error('❌ 신고 실패:', error);
      alert('Failed to submit the report.');
    }
  });

  // "Yes" 버튼 클릭 시 신고 mutation 실행
  const ReportMutation = () => {
    if (!reportType) {
      alert('Please select a report type.');
      return;
    }
    if (!reportContent.trim()) {
      alert('Please enter a reason for the report.');
      return;
    }
    reportMutation.mutate();
  };

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
                {post.is_mine ? (
                  <>
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
                    <div onClick={() => setOpenNormalModal(true)}>Delete</div>
                  </>
                ) : (
                  <div onClick={() => setOpenReportModal(true)}>Report</div>
                )}
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
        isOpen={openNormalModal}
        style={customStyles}
        onRequestClose={() => setOpenNormalModal(!openNormalModal)}
        contentLabel="example"
      >
        <AccessRestrictedWrapper>
          <div>
            <AccessRestrictedNormal>
              <TextNormal>
                <span>Are you sure you want to delete this post?</span>
              </TextNormal>
            </AccessRestrictedNormal>
            <ButtonBox>
              <LaterButton onClick={() => setOpenNormalModal(!openNormalModal)}>
                Cancle
              </LaterButton>
              <NowButton onClick={handleDelete}>
                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
              </NowButton>
            </ButtonBox>
          </div>
        </AccessRestrictedWrapper>
      </Modal>

      <Modal
        isOpen={openReportModal}
        style={customStyles}
        onRequestClose={() => setOpenReportModal(!openReportModal)}
        contentLabel="example"
      >
        <AccessRestrictedWrapper>
          <div>
            <AccessRestrictedReport>
              <TextReport>
                <span>
                  <div>
                    <ReportFlag />
                  </div>
                  Report
                </span>
                <span>Report type</span>
                <form>
                  <RadioWrapper>
                    <HiddenRadio
                      name="reportType"
                      value="SPAM"
                      checked={reportType === 'SPAM'}
                      onChange={handleChange}
                    />
                    <RadioLabel>Spam</RadioLabel>
                  </RadioWrapper>
                  <RadioWrapper>
                    <HiddenRadio
                      name="reportType"
                      value="ABUSE"
                      checked={reportType === 'ABUSE'}
                      onChange={handleChange}
                    />
                    <RadioLabel>Abuse</RadioLabel>
                  </RadioWrapper>
                  <RadioWrapper>
                    <HiddenRadio
                      name="reportType"
                      value="SEXUAL"
                      checked={reportType === 'SEXUAL'}
                      onChange={handleChange}
                    />
                    <RadioLabel>Sexual</RadioLabel>
                  </RadioWrapper>
                  <RadioWrapper>
                    <HiddenRadio
                      name="reportType"
                      value="ILLEGAL"
                      checked={reportType === 'ILLEGAL'}
                      onChange={handleChange}
                    />
                    <RadioLabel>Illegal</RadioLabel>
                  </RadioWrapper>
                  <RadioWrapper>
                    <HiddenRadio
                      name="reportType"
                      value="OTHERS"
                      checked={reportType === 'OTHERS'}
                      onChange={handleChange}
                    />
                    <RadioLabel>Others</RadioLabel>
                  </RadioWrapper>
                </form>
              </TextReport>
              <textarea
                value={reportContent}
                onChange={(e) => setReportContent(e.target.value)}
              />
              <div>
                <span>Are you sure you want to report this?</span>
              </div>
            </AccessRestrictedReport>
            <ButtonBox>
              <LaterButton onClick={() => setOpenReportModal(!openReportModal)}>
                No
              </LaterButton>
              <NowButton onClick={ReportMutation}>Yes</NowButton>
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

const RadioLabel = styled.span`
  font-size: 16px;
  color: #333;
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

const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  appearance: none;
  border: max(2px, 0.1em) solid gray;
  border-radius: 50%;
  width: 1.25em;
  height: 1.25em;
  transition: border 0.5s ease-in-out;

  &:checked {
    border: 0.4em solid tomato;
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

const AccessRestrictedNormal = styled.div`
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

const AccessRestrictedReport = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 3.1rem 5.5rem 3.1rem 5.5rem;
  width: 51rem;

  flex-shrink: 0;
  border-radius: 5px 5px 0 0;
  background: ${({ theme }) => theme.colors.backgroundLayer1};

  /* popup */
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.11);

  > textarea {
    border-radius: 5px;
    padding: 1rem;
    min-height: 9rem;
    margin-bottom: 2.8rem;
    resize: none;
    width: 100%;
    max-width: 40rem;
    height: 5.7rem;
    font-family: Inter;
    font-size: 1.6rem;
  }

  > div:last-child {
    display: flex;
    justify-content: center;
    align-items: center;

    color: var(--Gray-Gray_light-gray-700_light, #464646);
    text-align: center;
    font-family: Inter;
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 400;
    line-height: 3.4rem; /* 242.857% */
    letter-spacing: -0.056rem;
  }
`;

const TextReport = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > span {
    &:first-child {
      display: flex;
      gap: 1.2rem;
      color: var(--Gray-Gray_light-gray-700_light, #464646);
      text-align: center;
      font-family: Inter;
      font-size: 2rem;
      font-style: normal;
      font-weight: 400;
      line-height: 3.4rem; /* 170% */
      letter-spacing: -0.08rem;
    }

    &:nth-child(2) {
      color: ${({ theme }) => theme.colors.gray400};
      font-family: Inter;
      font-size: 1.4rem;
      font-style: normal;
      font-weight: 400;
      line-height: 3.4rem; /* 242.857% */
      letter-spacing: -0.056rem;
    }
  }

  > form {
    margin-bottom: 1.3rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;

    > div {
      display: flex;
      align-items: center;
      gap: 1.4rem;

      color: ${({ theme }) => theme.colors.gray700};
      font-family: Inter;
      font-size: 1.6rem;
      font-style: normal;
      font-weight: 400;
      line-height: 3.4rem; /* 212.5% */
      letter-spacing: -0.064rem;

      > input {
        &.custom-radio {
          display: inline-flex;
          align-items: center;
          cursor: pointer;
          margin-bottom: 0.8rem; /* 간격 조정 */
        }

        /* 라디오 버튼을 숨기고, 커스텀 모양을 만들어줄 예정 */
        &.custom-radio input[type='radio'] {
          appearance: none; /* 브라우저 기본 스타일 없애기 */
          -webkit-appearance: none; /* 크롬/사파리 호환 */
          width: 1.2rem;
          height: 1.2rem;
          margin: 0 0.6rem 0 0; /* 오른쪽 여백(텍스트와 간격) */
          border: 2px solid #f68512; /* 주황색 테두리 */
          border-radius: 50%; /* 동그라미 */
          outline: none;
          cursor: pointer;
          position: relative; /* ::before를 위한 위치 기준 */
        }

        /* 선택되지 않은 상태(hover) 시 효과 */
        &.custom-radio input[type='radio']:hover {
          border-color: #f06f00; /* 살짝 어두운 주황 */
        }

        /* 라디오 버튼이 선택된 경우, 안에 점을 찍어준다 */
        &.custom-radio input[type='radio']:checked::before {
          content: '';
          display: block;
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 50%;
          background-color: #f68512; /* 주황색 내부 */
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        /* 라벨 텍스트 */
        &.custom-radio span {
          font-size: 1.4rem;
          color: #333;
          user-select: none; /* 드래그 방지 (옵션) */
        }
      }
    }
  }
`;

const RadioWrapper = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 8px;
  position: relative;
  gap: 1.2rem;
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
