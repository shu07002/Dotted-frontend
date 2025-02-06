import styled from 'styled-components';

import WarnSVG from '@/assets/svg/SignUpPage/ErrorMsgSVG.svg?react';
import ImgFileSVG from '@/assets/svg/SignUpPage/ImgFileSVG.svg?react';
import TimeSVG from '@/assets/svg/SignUpPage/TimeSVG.svg?react';
import TrashcanSVG from '@/assets/svg/SignUpPage/TrashcanSVG.svg?react';
import UnlockSVG from '@/assets/svg/SignUpPage/UnlockSVG.svg?react';
import PentagonSVG from '@/assets/svg/SignUpPage/PentagonSVG.svg?react';
import SubmitButton from './SubmitButton';

interface StudentVerificationProps {
  onChangeStep: () => void;
}

export default function StudentVerification({
  onChangeStep
}: StudentVerificationProps) {
  return (
    <StudentVerificationLayout>
      <StudentVerificationWrapper>
        <Title>Student Verification</Title>

        <Guide>
          <span>Please upload an image file to </span>
          <span>prove that you are a student at Sogang University.</span>
        </Guide>

        <Example>
          ex. Student ID Card, Saint Main page Screenshot, Course Records
        </Example>

        <Warnning>
          <div>
            <WarnSVG />
          </div>
          <span>
            Your real name and university name must be visible. <br />
            You can hide other personal details such as card numbers or photos.
          </span>
        </Warnning>

        <AttatchImage>
          <ImgFileSVG />
          <span>Attach Image File</span>
          <span>JPG, PNG, JPEG</span>
        </AttatchImage>

        <Notice>
          <div>
            <ItemWrapper>
              <PentagonSVG />
              <TimeSVG />
            </ItemWrapper>
            <span>
              It takes some <span>time</span> to accept you because we have to
              check this file.
            </span>
          </div>
          <div>
            <ItemWrapper>
              <PentagonSVG />
              <TrashcanSVG />
            </ItemWrapper>
            <span>
              We will <span>destroy</span> this file after checking.
            </span>
          </div>
          <div>
            <ItemWrapper>
              <PentagonSVG />
              <UnlockSVG />
            </ItemWrapper>
            <span>
              <span>Community</span>
              and <span>Market</span> can be used after you are approved.
            </span>
          </div>
        </Notice>

        <SubmitButtonLayout>
          <SubmitButtonWrapper>
            <SubmitButton onChangeStep={onChangeStep} />
          </SubmitButtonWrapper>
        </SubmitButtonLayout>
      </StudentVerificationWrapper>
    </StudentVerificationLayout>
  );
}

const StudentVerificationLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StudentVerificationWrapper = styled.div`
  width: 94.2rem;
`;

const Title = styled.div`
  width: 100%;
  margin-bottom: 3.1rem;
  display: flex;

  height: 43px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: var(--Gray-Gray_light-gray-700_light, #464646);
  font-family: Pretendard;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 36px; /* 100% */
  letter-spacing: -1.8px;
`;

const Guide = styled.div`
  width: 100%;
  > span {
    &:last-child {
      color: var(--Purple-Purple_light-purple-600_light, #9678d3);
      font-family: Pretendard;
      font-size: 24px;
      font-style: normal;
      font-weight: 700;
      line-height: 36px;
      letter-spacing: -0.72px;
    }
    color: var(--Gray-Gray_light-gray-700_light, #464646);
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 36px; /* 150% */
    letter-spacing: -0.72px;
  }
`;

const Example = styled.div`
  width: 100%;
  color: var(--Gray-Gray_light-gray-500_light, #909090);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: 36px; /* 180% */
  letter-spacing: -0.6px;
  margin-bottom: 0.5rem;
`;

const Warnning = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 2.7rem;

  > span {
    color: var(--Semantic-Negative-900, #ea3729);
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 32px; /* 160% */
    letter-spacing: -0.2px;
  }
`;

const AttatchImage = styled.div`
  cursor: pointer;
  width: 100%;
  height: 20.2rem;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px dashed var(--Purple-Purple_light-purple-650_light, #8865cd);
  background: var(--Background-Background_light-Layer-1_light, #f8f8f8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 3.4rem;

  > span {
    &:last-child {
      color: var(--Purple-Purple_light-purple-600_light, #9678d3);
      text-align: center;
      font-family: Pretendard;
      font-size: 16px;
      font-style: normal;
      font-weight: 300;
      line-height: 36px; /* 225% */
      letter-spacing: -0.16px;
    }

    color: var(--Gray-Gray_light-gray-700_light, #464646);
    text-align: center;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 36px; /* 150% */
    letter-spacing: -0.24px;
  }
`;

const Notice = styled.div`
  display: flex;
  position: relative;
  justify-content: space-evenly;
  margin-bottom: 6.2rem;
  > div {
    display: flex;
    flex-direction: column;

    align-items: center;
    width: 22.4rem;

    > span {
      color: var(--Gray-Gray_light-gray-600_light, #6c6c6c);
      text-align: center;
      font-family: Pretendard;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: 36px; /* 180% */
      letter-spacing: -0.2px;

      > span {
        font-weight: 700;
      }
    }
  }
`;

const ItemWrapper = styled.div`
  width: 9.6rem;
  height: 10rem;
  position: relative;
  margin-bottom: 1.6rem;
  > svg {
    position: absolute;
    &:last-child {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const SubmitButtonLayout = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

const SubmitButtonWrapper = styled.div`
  width: 19rem;
`;
