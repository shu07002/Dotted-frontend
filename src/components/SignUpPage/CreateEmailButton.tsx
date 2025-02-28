import styled from 'styled-components';
import PurpleLink from '@/assets/svg/SignUpPage/PurPleLinkSVG.svg?react';

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
  width: 100%;
  max-width: 38.6rem;
  height: 38px;
  flex-shrink: 0;
  border-radius: 24px;
  background: ${({ theme }) => theme.colors.purple100};
`;

const CreateEmailText = styled.p`
  color: ${({ theme }) => theme.colors.purple600};
  text-align: center;
  font-size: 20px;
  @media (max-width: 400px) {
    font-size: 15px;
  }
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: -1px;
`;

const PurpleLinkSVG = styled(PurpleLink)``;
