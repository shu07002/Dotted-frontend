import InfoSVG from '@/assets/svg/SignUpPage/InfoSVG.svg?react';
import styled from 'styled-components';

export default function Info() {
  return (
    <InfoText>
      <div>
        <InfoSVG />
      </div>
      <div>
        <span>
          This information collected (Real name, Birthday, and Group) is for
          internal purposes and will not be shared publicly.
        </span>
      </div>
    </InfoText>
  );
}
const InfoText = styled.div`
  padding: 0.4rem;
  padding-top: 1.3rem;
  display: flex;
  gap: 1.2rem;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    > span {
      color: ${({ theme }) => theme.colors.purple600};
      font-family: Pretendard;
      font-size: 16px;
      font-style: normal;
      font-weight: 300;
      line-height: 24px; /* 150% */
      letter-spacing: -0.48px;
    }
  }
`;
