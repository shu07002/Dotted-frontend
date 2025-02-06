import styled from 'styled-components';

interface NextButtonProps {
  onChangeStep: () => void;
}

export default function NextButton({ onChangeStep }: NextButtonProps) {
  return (
    <NextButtonWrapper onClick={onChangeStep}>
      <NextButtonText>Next</NextButtonText>
    </NextButtonWrapper>
  );
}

const NextButtonWrapper = styled.div`
  cursor: pointer;
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-bottom: 2.3rem;
  width: 60.5rem;
  height: 50px;
  flex-shrink: 0;
  border-radius: 5px;
  background: var(--Purple-Purple_light-purple-600_light, #9678d3);
  > span {
    color: var(--Gray-Gray_light-gray-50_light, #fff);
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 36px; /* 180% */
    letter-spacing: -1px;
  }
`;

const NextButtonText = styled.div`
  color: var(--Gray-Gray_light-gray-50_light, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 36px; /* 180% */
  letter-spacing: -1px;
`;
