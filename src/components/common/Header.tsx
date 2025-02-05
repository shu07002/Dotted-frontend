import styled from 'styled-components';

export default function Header() {
  return (
    <Wrapper>
      <button>테마</button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 91px;
  background-color: ${({ theme }) => theme.colors.backgroundLayer1};
  color: ${({ theme }) => theme.colors.gray700};
`;
