import styled from 'styled-components';
import Info from '@/assets/svg/SignUpPage/InfoSVG.svg?react';

interface AccessRestrictedModalProps {
  onClickLater: () => void;
  onClickNow: () => void;
}

export default function AccessRestrictedModal({
  onClickLater,
  onClickNow
}: AccessRestrictedModalProps) {
  return (
    <AccessRestrictedWrapper>
      <div>
        <AccessRestricted>
          <IconWrapper>
            <InfoSVG />
          </IconWrapper>

          <Text>
            <span>
              To full access ‘Community’ and ‘Market’ you
              <span>
                need to <br />
                verify that you are a student at Sogang university.
              </span>
            </span>
          </Text>

          <Text>
            <span>
              <span>
                Beta period: Free access to Community and Market until March
                22nd without verification.After that date, only verified
                students will have full access.
              </span>
            </span>
          </Text>

          <Text>
            <span>
              The verification document will never be shared publicily.
            </span>
          </Text>

          <Text>
            <span>
              You can verify now or complete it later in
              <br /> Mypage {'>'} Student Verification.{' '}
            </span>
          </Text>
        </AccessRestricted>
        <ButtonBox>
          <LaterButton onClick={onClickLater}>verify later</LaterButton>
          <NowButton onClick={onClickNow}>verify now</NowButton>
        </ButtonBox>
      </div>
    </AccessRestrictedWrapper>
  );
}

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
  width: 58rem;
  height: 51.8rem;
  flex-shrink: 0;
  border-radius: 5px 5px 0 0;
  background: ${({ theme }) => theme.colors.backgroundLayer1};

  /* popup */
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.11);
`;

const IconWrapper = styled.div`
  text-align: center;
`;

const InfoSVG = styled(Info).attrs({ width: '3.9rem', height: '3.9rem' })``;
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
  width: 40%;
  border-radius: 0px 0px 0px 5px;
  background: ${({ theme }) => theme.colors.backgroundBase};
  color: ${({ theme }) => theme.colors.gray700};
`;
const NowButton = styled.div`
  width: 60%;
  border-radius: 0px 0px 5px 0px;
  background: ${({ theme }) => theme.colors.purple600};
  color: ${({ theme }) => theme.colors.gray50};
`;
