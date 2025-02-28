import styled from 'styled-components';

export default function PageLayout() {
  return (
    <SignUpPageLayoutBox>
      <CircleWrapper>
        <PurpleCircle></PurpleCircle>
        <GrayCircle></GrayCircle>
      </CircleWrapper>
    </SignUpPageLayoutBox>
  );
}

const SignUpPageLayoutBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.backgroundLayer2};
`;

const CircleWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const PurpleCircle = styled.div`
  width: 76.6rem;
  height: 76.6rem;
  flex-shrink: 0;
  border-radius: 76.6rem;
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(150, 120, 211, 0.4) 0%,
    rgba(150, 120, 211, 0) 100%
  );
  filter: blur(5rem);
`;

const GrayCircle = styled.div`
  position: absolute;
  top: 31.5rem;
  left: 65.4rem;
  width: 59.9rem;
  height: 59.9rem;
  flex-shrink: 0;
  border-radius: 59.9rem;
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(164, 164, 164, 0.6) 0%,
    rgba(164, 164, 164, 0) 100%
  );
  filter: blur(5rem);
`;
