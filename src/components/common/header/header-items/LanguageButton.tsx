import styled from 'styled-components';
import DownIcon from '@/assets/icons/header/down.svg?react';

const Languages = ['ENG', 'KOR', 'CHN'];

export default function LanguageButton() {
  return (
    <LanguageBox>
      <span>{Languages[0]}</span>
      <DownIcon />
    </LanguageBox>
  );
}

const LanguageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  cursor: pointer;
  padding: 1rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundLayer1};
  }

  > svg {
    width: 1.8rem;
    height: 0.9rem;
    stroke: ${({ theme }) => theme.colors.gray700};

    path {
      stroke: ${({ theme }) => theme.colors.gray700};
    }
  }

  > span {
    margin-right: 0.3rem;
    text-align: center;
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2.1rem;
    letter-spacing: -0.16px;
  }
`;
