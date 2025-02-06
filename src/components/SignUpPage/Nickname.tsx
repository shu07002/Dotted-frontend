import React from 'react';
import InputBox from './InputBox';
import Label from './Label';
import Input from './Input';
import NicknameSVG from '@/assets/svg/SignUpPage/NicknameSVG.svg?react';
import styled from 'styled-components';

export default function Nickname() {
  return (
    <InputBox>
      <Label name="nickname">
        <NicknameSVG /> <span>Nickname</span>
      </Label>
      <Input name="nickname" type="text" placeholder="nickname" />
      <SubText>You can change your nickname anytime</SubText>
    </InputBox>
  );
}

const SubText = styled.span`
  color: var(--Gray-Gray_light-gray-400_light, #b1b1b1);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: 36px; /* 225% */
  letter-spacing: -0.48px;
`;
