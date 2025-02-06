import React, { useState } from 'react';
import InputBox from './InputBox';
import Label from './Label';
import GroupSVG from '@/assets/svg/SignUpPage/GroupSVG.svg?react';
import styled from 'styled-components';

export default function Group() {
  const [selectedGroup, setSelectedGroup] = useState('International Student');
  return (
    <InputBox>
      <Label name="group">
        <GroupSVG /> Select your Group
      </Label>
      <GroupWrapper>
        {[
          'International Student',
          'Exchange Student',
          'Language Education Center',
          'Others'
        ].map((item) => (
          <RadioLabel key={item}>
            <RadioInput
              type="radio"
              name="group"
              value={item}
              checked={selectedGroup === item}
              onChange={() => setSelectedGroup(item)}
            />
            {item}
          </RadioLabel>
        ))}
      </GroupWrapper>
    </InputBox>
  );
}

const GroupWrapper = styled.div`
  padding: 1.1rem;
  width: 398px;
  height: 88px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid var(--Gray-Gray_light-gray-300_light, #d5d5d5);
  background: var(--Gray-Gray_light-gray-100_light, #f8f8f8);
`;

const RadioLabel = styled.label`
  margin-right: 1.2rem;
  color: var(--Gray-Gray_light-gray-700_light, #464646);
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 34px; /* 212.5% */
  letter-spacing: -0.64px;
`;

const RadioInput = styled.input.attrs({ type: 'radio' })`
  margin-right: 1.4rem;
  appearance: none; /* 기본 라디오 버튼 숨김 */
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 3px solid #fff; /* 기본 테두리 */
  box-shadow: 0 0 0 1px #111; /* 바깥 라인 */
  background-color: transparent;
  transition: all 0.3s ease-in-out;

  &:checked {
    background-color: #fff; /* 내부 원 */
    border: 4.5px solid #9678d3; /* 내부와 외부 테두리 사이 색상 */
    box-shadow: 0 0 0 1px #6e6e6e; /* 바깥 라인 유지 */
  }
`;
