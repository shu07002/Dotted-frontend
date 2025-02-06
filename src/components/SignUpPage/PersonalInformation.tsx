import styled from 'styled-components';
import Password from './Password';
import Nickname from './Nickname';
import Name from './Name';
import Birth from './Birth';
import Group from './Group';
import Info from './Info';
import SubmitButton from './SubmitButton';

interface PersoPersonalInformationProps {
  onChangeStep: () => void;
}

export default function PersonalInformation({
  onChangeStep
}: PersoPersonalInformationProps) {
  return (
    <PersonalInformationWrapper>
      <div style={{ width: '60.5rem' }}>
        <Password />

        <Nickname />

        <Box>
          <Name />

          <Birth />

          <Group />
        </Box>

        <Info />

        <SubmitButton onChangeStep={onChangeStep} />
      </div>
    </PersonalInformationWrapper>
  );
}

const PersonalInformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Box = styled.div`
  width: 60.5rem;
  border-radius: 5px;
  border: 1px solid var(--Gray-Gray_light-gray-300_light, #d5d5d5);
  padding: 0 2.3rem;
`;
