import { ReactNode } from 'react';
import styled from 'styled-components';
import PentagonSVG from '@/assets/svg/SignUpPage/PentagonSVG.svg?react';

interface IconProps {
  icon: ReactNode;
}

export default function Icon({ icon }: IconProps) {
  return (
    <ItemWrapper>
      <StyledPentagonSVG />
      {icon}
    </ItemWrapper>
  );
}

const ItemWrapper = styled.div`
  width: 9.6rem;
  height: 10rem;
  position: relative;
  margin-bottom: 1.6rem;
  > svg {
    position: absolute;
    &:last-child {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const StyledPentagonSVG = styled(PentagonSVG)`
  path {
    fill: ${({ theme }) => theme.colors.purple100};
  }
`;
