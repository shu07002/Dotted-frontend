import styled from 'styled-components';

export default function WhyCreated() {
  return (
    <Section>
      <h1>Why we created Dotted?</h1>
    </Section>
  );
}

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 9.6rem 0;
  overflow-x: hidden;

  > h1 {
    color: ${({ theme }) => theme.colors.gray700};
    text-align: center;
    font-size: 4.8rem;
    font-weight: 700;
    line-height: 6.3rem; /* 131.25% */
    letter-spacing: -2.4px;
  }
`;
