import styled from 'styled-components';

interface SendCodePartProps {
  onChangeStep: () => void;
}

export default function SendCodePart({ onChangeStep }: SendCodePartProps) {
  return (
    <SendCodePartWrapper>
      <EmailInput placeholder="email@address.com" type="email" />
      <SendCodeButton onClick={onChangeStep}>Send Code</SendCodeButton>
    </SendCodePartWrapper>
  );
}

const SendCodePartWrapper = styled.div`
  width: 100%;
`;

const EmailInput = styled.input`
  padding-left: 2.3rem;
  margin-bottom: 2.3rem;
  width: 100%;
  height: 5rem;

  border-radius: 5px;
  border: 1px solid var(--Gray-Gray_light-gray-300_light, #d5d5d5);
  background: var(--Gray-Gray_light-gray-100_light, #f8f8f8);

  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 36px; /* 180% */
  letter-spacing: -0.6px;
`;

const SendCodeButton = styled.button`
  cursor: pointer;
  width: 100%;
  height: 5rem;
  border-radius: 5px;
  background: var(--Purple-Purple_light-purple-600_light, #9678d3);
  color: var(--Gray-Gray_light-gray-50_light, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 36px; /* 180% */
  letter-spacing: -1px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
`;
