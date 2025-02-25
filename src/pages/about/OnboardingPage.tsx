import Community from '@/components/about/onboarding/Community';
import LastSection from '@/components/about/onboarding/LastSection';
import Market from '@/components/about/onboarding/Market';
import TipsForSogang from '@/components/about/onboarding/TipsForSogang';
import WhatIsDotted from '@/components/about/onboarding/WhatIsDotted';
import WhyCreated from '@/components/about/onboarding/WhyCreated';
import styled from 'styled-components';

export default function OnboardingPage() {
  return (
    <Main>
      <WhatIsDotted />
      <WhyCreated />
      <TipsForSogang />
      <Market />
      <Community />
      <LastSection />
    </Main>
  );
}

const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 5rem 0;
`;
