import styled from 'styled-components';
import loadingGif from '@/assets/gif/SignUpPage/logo-motion.gif';

export default function LoadingScreen() {
  return (
    <LoadingContainer>
      <img src={loadingGif} alt="Loading..." />
    </LoadingContainer>
  );
}

const LoadingContainer = styled.div`
  width: 100%;
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
