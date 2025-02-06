import React, { useState } from 'react';
import styled from 'styled-components';
import Checked from '@/assets/svg/SignUpPage/CheckedSVG.svg?react';
import Link from '@/assets/svg/SignUpPage/LinkSVG.svg?react';
import { useNavigate } from 'react-router-dom';

interface AgreeItemProps {
  text: string;
  link: string;
  onChangeChecked: () => void;
  ischecked: boolean;
}

export default function AgreeItem({
  text,
  link,
  onChangeChecked,
  ischecked
}: AgreeItemProps) {
  const navigate = useNavigate();

  return (
    <AgreeItemBox>
      <CheckBox onClick={onChangeChecked} $checked={ischecked}>
        {ischecked && <CheckedSVG />}
      </CheckBox>
      <span>{text}</span>
      <LinkSVG onClick={() => navigate(link)} />
    </AgreeItemBox>
  );
}

const AgreeItemBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > label {
    width: 1.9rem;
    height: 1.9rem;
    margin-right: 1.4rem;
    flex-shrink: 0;
    input {
      width: 100%;
      height: 100%;
      margin: 0;

      accent-color: purple;
    }
  }

  > span {
    color: var(--Gray-Gray_light-gray-800_light, #222);
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.8px;
  }
`;

const CheckBox = styled.div<{ $checked: boolean }>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1.2rem;
  width: 1.9rem;
  height: 1.9rem;
  flex-shrink: 0;
  border-radius: 0.4rem;
  border: 1px solid var(--Gray-Gray_light-gray-500_light, #909090);

  background: ${(props) =>
    props.$checked && `var(--Purple-Purple_light-purple-600_light, #9678d3)`};
`;

const CheckedSVG = styled(Checked)`
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
`;

const LinkSVG = styled(Link)`
  cursor: pointer;
  width: 2.3rem;
  height: 2.3rem;
  flex-shrink: 0;
`;
