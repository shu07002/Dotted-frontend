import styled from 'styled-components';

export default function Header() {
  return <Wrapper></Wrapper>;
}

const Wrapper = styled.div`
  width: 100%;
  height: 9.1rem;
  background-color: ${({ theme }) => theme.colors.backgroundLayer2};
  color: ${({ theme }) => theme.colors.gray700};
`;
