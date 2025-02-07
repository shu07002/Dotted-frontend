import styled from 'styled-components';
import PrevIcon from '@/assets/svg/MainPage/Prev.svg?react';
import NextIcon from '@/assets/svg/MainPage/Next.svg?react';

// prevArrow 컴포넌트 수정
const PrevArrow = (props: any) => {
  const { className, style, onClick } = props; // 불필요한 props 제거
  return (
    <StyledPrevArrow className={className} style={style} onClick={onClick}>
      <PrevIcon />
    </StyledPrevArrow>
  );
};

// nextArrow 컴포넌트 수정
const NextArrow = (props: any) => {
  const { className, style, onClick } = props; // 불필요한 props 제거
  return (
    <StyledNextArrow className={className} style={style} onClick={onClick}>
      <NextIcon />
    </StyledNextArrow>
  );
};

// styled-components로 스타일 추가
const StyledPrevArrow = styled.div`
  left: -50px;
  z-index: 10;
  cursor: pointer;
`;

const StyledNextArrow = styled.div`
  right: -50px;
  z-index: 10;
  cursor: pointer;
`;

export { PrevArrow, NextArrow };
