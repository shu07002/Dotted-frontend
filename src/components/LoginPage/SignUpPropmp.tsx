import React from 'react';
import styled from 'styled-components';

export default function SignUpPropmp() {
  return (
    <SignUpPropmpWrapper>
      <Text>Don't have an account?</Text>
      <GoToSignUp>Sign Up</GoToSignUp>
    </SignUpPropmpWrapper>
  );
}

const SignUpPropmpWrapper = styled.div`
  display: flex;
  gap: 2.1rem;
`;

const Text = styled.span`
  color: var(--Gray-Gray_light-gray-700_light, #464646);
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.8px;
`;

const GoToSignUp = styled.div`
  color: var(--Purple-Purple_light-purple-600_light, #9678d3);
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.8px;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: none;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
`;
