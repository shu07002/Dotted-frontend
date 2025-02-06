import styled from 'styled-components';
import SendCodeButton from './SendCodeButton';
import { UseFormRegister } from 'react-hook-form';
import { SignUpFormData } from '@/types/signUpFormData';

interface isSogangEmail {
  isSogangEmail: boolean;
  isSendCodeClicked: boolean;
  onClickSendCodeButton: () => void;
  register: UseFormRegister<SignUpFormData>;
}

export default function EmailInputField({
  isSogangEmail,
  isSendCodeClicked,
  onClickSendCodeButton,
  register
}: isSogangEmail) {
  const emailText = isSogangEmail
    ? 'Sogang University Email Address (ID)'
    : 'Email Address (ID)';
  const emailDomain = isSogangEmail ? '@sogang.ac.kr' : null;
  const emailPlaceholder = isSogangEmail ? 'email' : 'email@address.com';

  return (
    <EmailInputFieldWrapper>
      <span>{emailText}</span>
      <EmailInput $isSogangEmail={isSogangEmail}>
        <label htmlFor="email">
          <input
            id="email"
            type={isSogangEmail ? 'text' : 'email'}
            placeholder={emailPlaceholder}
            {...register('email', { required: 'Plaese write your email' })}
          />
        </label>
        {emailDomain ? <span>{emailDomain}</span> : null}
      </EmailInput>

      <SendCodeButton
        isSendCodeClicked={isSendCodeClicked}
        onClickSendCodeButton={onClickSendCodeButton}
      />
    </EmailInputFieldWrapper>
  );
}

const EmailInputFieldWrapper = styled.div`
  width: 60.5rem;
  margin-top: 5rem;

  > span {
    color: var(--Gray-Gray_light-gray-600_light, #6c6c6c);
    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 36px; /* 200% */
    letter-spacing: -0.9px;
  }
`;

const EmailInput = styled.div<{ $isSogangEmail: boolean }>`
  margin-bottom: 2.6rem;
  display: flex;
  gap: 2rem;
  align-items: center;
  > label {
    input {
      padding-left: 2.3rem;
      width: ${(props) => (props.$isSogangEmail ? '38.2rem' : '60.5rem')};
      height: 5rem;
      flex-shrink: 0;
      border-radius: 5px;
      border: 1px solid var(--Gray-Gray_light-gray-300_light, #d5d5d5);
      background: var(--Gray-Gray_light-gray-100_light, #f8f8f8);
      font-family: Pretendard;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: 36px; /* 180% */
      letter-spacing: -0.6px;
      outline: none;
    }
  }

  > span {
    color: var(--Gray-Gray_light-gray-700_light, #464646);
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 36px; /* 180% */
    letter-spacing: -0.6px;
  }
`;
