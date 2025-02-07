import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

interface HeaderNavProps {
  setHoveredTab: (value: string) => void;
}

const NavList = ['ABOUT', 'TIPS', 'COMMUNITY', 'MARKET'];

export default function HeaderNav({ setHoveredTab }: HeaderNavProps) {
  const { pathname } = useLocation();
  const path = pathname.split('/')[1];

  function handleMouseEnter(e: React.MouseEvent<HTMLDivElement>) {
    setHoveredTab(e.currentTarget.innerText);
  }

  return (
    <NavWrapper>
      {NavList.map((nav, idx) => (
        <div
          key={idx}
          className={path === nav.toLowerCase() ? 'selected' : ''}
          onMouseEnter={handleMouseEnter}
        >
          {nav}
        </div>
      ))}
    </NavWrapper>
  );
}

const NavWrapper = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  height: 100%;

  > div {
    text-align: center;
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 2.1rem;
    letter-spacing: -0.48px;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.gray700};
    transition: all ease-in 0.1s;
    cursor: pointer;

    &.selected {
      color: ${({ theme }) => theme.colors.purple600};
    }

    &:hover {
      color: ${({ theme }) => theme.colors.purple600};
    }
  }
`;
