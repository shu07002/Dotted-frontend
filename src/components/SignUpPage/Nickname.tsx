import InputBox from './InputBox';
import Label from './Label';
import Input from './Input';
import NicknameSVG from '@/assets/svg/SignUpPage/NicknameSVG.svg?react';
import styled from 'styled-components';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { SignUpFormData } from '@/types/signUpFormData';
import VerificationCheckButton from './VerificationCheckButton';

interface NicknameProps {
  register: UseFormRegister<SignUpFormData>;
}

export default function Nickname({ register }: NicknameProps) {
  return (
    <InputBox>
      <Label name="nickname">
        <NicknameSVG /> <span>Nickname</span>
      </Label>
      <Wrapper>
        <Input
          type="text"
          placeholder="nickname"
          {...register('nickname', { required: 'Please your nickname' })}
        />
        <VerificationCheckButton />
      </Wrapper>

      <SubText>You can change your nickname anytime</SubText>
    </InputBox>
  );
}

const SubText = styled.span`
  color: ${({ theme }) => theme.colors.gray400};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: 36px; /* 225% */
  letter-spacing: -0.48px;
`;

const Wrapper = styled.div`
  width: 100%;
  position: relative;

  display: flex;
`;
