import React from 'react';
import styled from 'styled-components';
import PurpleLink from '@/assets/svg/LoginPage/PurPleLinkSVG.svg?react';

export default function CreateEmailButton() {
  return (
    <CreateEmailButtonBox>
      <CreateEmailText>How to create a Sogang Email?</CreateEmailText>
      <PurpleLinkSVG />
    </CreateEmailButtonBox>
  );
}

const CreateEmailButtonBox = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 386px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 24px;
  background: var(--Purple-Purple_light-purple-100_light, #f2f0fa);
`;

const CreateEmailText = styled.p`
  color: var(--Purple-Purple_light-purple-600_light, #9678d3);
  text-align: center;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: -1px;
`;

const PurpleLinkSVG = styled(PurpleLink)``;
