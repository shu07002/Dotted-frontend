import React from 'react';
import styled from 'styled-components';

export default function Recomended() {
  return (
    <RecomendedTextWrapper>
      <RecomendedTextBox>
        <RecomendedText>recomended</RecomendedText>
      </RecomendedTextBox>
    </RecomendedTextWrapper>
  );
}

const RecomendedTextWrapper = styled.div`
  margin-top: 1.2rem;
  margin-right: 1.8rem;
  display: flex;
  justify-content: end;
`;

const RecomendedTextBox = styled.div`
  width: 103px;
  height: 19px;
  flex-shrink: 0;
  border-radius: 5px;
  background: var(--Semantic-Notice-100, #ffeccc);
  display: flex;
  align-items: center; /* 세로 정렬 */
  justify-content: center; /* 가로 정렬 */
`;

const RecomendedText = styled.p`
  color: var(--Semantic-Notice-900, #f68512);
  display: flex;
  align-items: center; /* 세로 정렬 */
  justify-content: center; /* 가로 정렬 */
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.56px;
`;
