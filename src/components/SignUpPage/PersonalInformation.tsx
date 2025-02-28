import styled from 'styled-components';
import Password from './Password';
import Nickname from './Nickname';
import Name from './Name';
import Birth from './Birth';
import Group from './Group';
import Info from './Info';
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
  loginType?: string;
}

export default function PersonalInformation({
  isSogangEmail,
  register,
  watch,
  setValue,
  loginType
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
      <div>
        {loginType === 'EMAIL' && (
          <Password register={register} watch={watch} />
        )}
        <Nickname register={register} watch={watch} />

        <Box>
          <Name register={register} />
          <Birth setValue={setValue} register={register} />
          <Group setValue={setValue} />
        </Box>

        <Info />

        <SubmitButton type="submit">Submit</SubmitButton>
      </div>
    </PersonalInformationWrapper>
  );
}

const PersonalInformationWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  > div {
    max-width: 60.5rem;
    @media (max-width: 700px) {
      padding: 0 2rem;
    }
  }
`;

const Box = styled.div`
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  padding: 0 2.3rem;
`;

const SubmitButton = styled.button`
  cursor: pointer;
  margin-top: 2.6rem;
  margin-bottom: 15.5rem;
  width: 100%;
  height: 50px;
  flex-shrink: 0;
  border-radius: 5px;
  border: none;
  background: ${({ theme }) => theme.colors.purple600};
  color: ${({ theme }) => theme.colors.gray50};
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 36px; /* 180% */
  letter-spacing: -1px;
`;
