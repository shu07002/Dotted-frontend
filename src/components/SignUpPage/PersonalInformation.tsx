import styled from 'styled-components';
import Password from './Password';
import Nickname from './Nickname';
import Name from './Name';
import Birth from './Birth';
import Group from './Group';
import Info from './Info';
import SubmitButton from './SubmitButton';
import { SignUpFormData } from '@/types/signUpFormData';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
} from 'react-hook-form';
import { useEffect } from 'react';

interface PersoPersonalInformationProps {
  isSogangEmail: boolean;
  register: UseFormRegister<SignUpFormData>;
  watch: UseFormWatch<SignUpFormData>;
  setValue: UseFormSetValue<SignUpFormData>;
}

export default function PersonalInformation({
  isSogangEmail,
  register,
  watch,
  setValue
}: PersoPersonalInformationProps) {
  useEffect(() => {
    if (isSogangEmail && !watch('email').includes('@')) {
      const email = watch('email');
      const domain = '@sogang.ac.kr';
      setValue('email', email + domain);
    }
  }, []);
  return (
    <PersonalInformationWrapper>
      <div style={{ width: '60.5rem' }}>
        <Password register={register} watch={watch} />

        <Nickname register={register} />

        <Box>
          <Name register={register} />

          <Birth setValue={setValue} register={register} />

          <Group setValue={setValue} />
        </Box>

        <Info />

        <SubmitButton />
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
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  padding: 0 2.3rem;
`;
