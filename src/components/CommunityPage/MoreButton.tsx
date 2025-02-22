import React, { useState } from 'react';
import More from '@/assets/svg/CommunityPage/More.svg?react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MarketPostDetail } from '@/pages/market/DetailMarketPage';
import { PostDetail } from '@/pages/community/DetailCommunityPage';
import { useMutation } from '@tanstack/react-query';
import Modal from 'react-modal';
import ReportFlag from '@/assets/svg/CommunityPage/ReportFlag.svg?react';

Modal.setAppElement('#root');

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

//post
//openMore
//navigate
//Menu
//replaceconetnet

// TODO
// 노말모달, 리포트모달 스테이트 내부 선언
// replaceconetnet, 오픈 모어, 셋오픈 모어어 프롭스로 가져오기
// post.tag 마켓이면 status, 아니면 tag로 하기기

interface MoreButtonProps {
  post: MarketPostDetail | PostDetail;
  openMore: boolean;
  setOpenMore: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MoreButton({
  post,
  openMore,
  setOpenMore
}: MoreButtonProps) {
  const [openNormalModal, setOpenNormalModal] = useState(false);
  const [openReportModal, setOpenReportModal] = useState(false);

  const [reportType, setReportType] = useState('');
  const [reportContent, setReportContent] = useState('');

  let replacedContent = post.content;

  const navigate = useNavigate();

  if (openNormalModal || openReportModal) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  // 2) 버튼 클릭 시 삭제 Mutation 실행
  const handleDelete = () => {
    setOpenNormalModal(false);
    navigate('/community');
    deleteMutation.mutate(post.id);
  };
  const handleChange = (e: any) => setReportType(e.target.value);

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

      const responseBody = await response.text();
      return responseBody ? JSON.parse(responseBody) : null;
    },
    onSuccess: (data) => {
      console.log('✅ 삭제 성공:', data);
      // 삭제 성공 시 원하는 페이지로 이동
    },
    onError: (error) => {
      console.error('❌ 삭제 실패:', error);
    }
  });

  if (post.images && post.images.length > 0) {
    post.images.forEach((imgObj, index) => {
      // 예: 'src="{images[0].image_url}"' => 'src="https://example.com/img1.png"'
      const placeholder = `src={images[${index}].image_url}`;
      const realSrc = `src="${imgObj.image_url}"`;

      replacedContent = replacedContent.replace(placeholder, realSrc);
    });
  }

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
    <>
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
                        tag: 'status' in post ? post.status : post.tag,
                        images: post.images,
                        price: 'price' in post ? post.price : 0
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
                <LaterButton
                  onClick={() => setOpenReportModal(!openReportModal)}
                >
                  No
                </LaterButton>
                <NowButton onClick={ReportMutation}>Yes</NowButton>
              </ButtonBox>
            </div>
          </AccessRestrictedWrapper>
        </Modal>
      </button>
    </>
  );
}

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

const RadioLabel = styled.span`
  font-size: 16px;
  color: #333;
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
