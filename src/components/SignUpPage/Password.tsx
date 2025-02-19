import InputBox from './InputBox';
import Label from './Label';
import Input from './Input';
import ErrorMsg from './ErrorMsg';
import PasswordKey from '@/assets/svg/SignUpPage/PasswordKeySVG.svg?react';
import { SignUpFormData } from '@/types/signUpFormData';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';

interface PasswordProps {
  register: UseFormRegister<SignUpFormData>;
  watch: UseFormWatch<SignUpFormData>;
}

export default function Password({ register, watch }: PasswordProps) {
  const password = watch('password');
  const passwordCheck = watch('passwordCheck');

  const isVaild =
    (password !== '' || password !== null) && password === passwordCheck;
  return (
    <>
      <InputBox>
        <Label name="password">
          <PasswordKey /> <span>Password</span>
        </Label>

        <Input
          type="password"
          placeholder="●●●●●●●●●●●"
          {...register('password', {
            required: 'Plaese write down your password',
            minLength: {
              value: 7,
              message: 'Password must be at least 7 characters long'
            },
            maxLength: {
              value: 17,
              message: 'Password must be at most 17 characters long'
            }
          })}
        />
      </InputBox>

      <InputBox>
        <Label name="passwordCheck">
          <PasswordKey /> <span>Password Check</span>
        </Label>
        <Input
          type="password"
          placeholder="●●●●●●●●●●●"
          {...register('passwordCheck', {
            required: 'Plaese write down your password check'
          })}
        />

        {isVaild ? null : <ErrorMsg msg="Password does not match" />}
      </InputBox>
    </>
  );
}
