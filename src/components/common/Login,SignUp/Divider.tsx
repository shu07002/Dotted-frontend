import styled from 'styled-components';

export default function Divider() {
  return (
    <LineWrapper>
      <Line />
      <p>OR</p>
      <Line />
    </LineWrapper>
  );
}

const LineWrapper = styled.div`
  margin-bottom: 3.9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  > p {
    display: flex;
    width: 59px;
    height: 32px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.gray400};
    text-align: center;
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.45px;
  }
`;

const Line = styled.div`
  width: 32.3rem;
  height: 1px;
  flex-shrink: 0;
  stroke-width: 1px;
  background-color: ${({ theme }) => theme.colors.gray300};
`;
