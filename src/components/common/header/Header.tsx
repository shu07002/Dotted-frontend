import styled from 'styled-components';
import HeaderNav from './header-items/HeaderNav';
import AlarmButton from './header-items/AlarmButton';
import ProfileButton from './header-items/ProfileButton';
import LanguageButton from './header-items/LanguageButton';
import { useEffect, useState } from 'react';
import SubHeader from './SubHeader';
import { useNavigate } from 'react-router-dom';

export default function Header({ scrollY }: { scrollY: number }) {
  const navigate = useNavigate();
  const [hoveredTab, setHoveredTab] = useState<string>('');

  useEffect(() => {
    console.log('scrollY:', scrollY);
  }, [hoveredTab]);

  return (
    <HeaderContainer onMouseLeave={() => setHoveredTab('')}>
      <UpWrapper $scrollY={scrollY}>
        <LeftSection>
          <Logo onClick={() => navigate('/')}>
            <img src="/logo.svg" alt="logo" />
            <span>Dotted</span>
          </Logo>
          <HeaderNav setHoveredTab={setHoveredTab} />
        </LeftSection>
        <RightSection onMouseEnter={() => setHoveredTab('')}>
          <AlarmButton />
          <ProfileButton />
          <LanguageButton />
        </RightSection>
      </UpWrapper>
      <SubHeader hoveredTab={hoveredTab} />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1000;
`;

const UpWrapper = styled.div<{ $scrollY: number }>`
  width: 100vw;
  height: 8rem;
  /* background-color: ${({ theme, $scrollY }) =>
    $scrollY > 0
      ? theme.colors.backgroundLayer2
      : theme.colors.backgroundLayer2}; */
  background-color: ${({ theme }) => theme.colors.backgroundLayer2};
  color: ${({ theme }) => theme.colors.gray800};
  display: flex;
  justify-content: space-between;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2.8rem;
  height: 100%;
  width: 50%;
  margin-left: 9.1rem;
`;

const RightSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  width: fit-content;
  height: 100%;
  margin-right: 9.1rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  flex-shrink: 0;
  font-size: 3.6rem;
  font-weight: 700;
  line-height: 2.1rem;
  letter-spacing: -2.16px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  > img {
    width: 3.5rem;
    height: 3.5rem;
    flex-shrink: 0;
  }
`;
