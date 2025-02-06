import styled from 'styled-components';

interface HeaderNavProps {
  hoveredTab: string;
  setHoveredTab: (value: string) => void;
}

export default function HeaderNav({
  // hoveredTab,
  setHoveredTab
}: HeaderNavProps) {
  function handleMouseEnter(e: React.MouseEvent<HTMLDivElement>) {
    setHoveredTab(e.currentTarget.innerText);
  }

  return (
    <NavWrapper>
      <div onMouseEnter={handleMouseEnter}>ABOUT</div>
      <div onMouseEnter={handleMouseEnter}>TIPS</div>
      <div onMouseEnter={handleMouseEnter}>COMMUNITY</div>
      <div onMouseEnter={handleMouseEnter}>MARKET</div>
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

    &:hover {
      color: ${({ theme }) => theme.colors.purple600};
    }
  }
`;
