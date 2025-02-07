import InputBox from './InputBox';
import Label from './Label';
import Input from './Input';
import NameSVG from '@/assets/svg/SignUpPage/NameSVG.svg?react';
import { UseFormRegister } from 'react-hook-form';
import { SignUpFormData } from '@/types/signUpFormData';

interface NameProps {
  register: UseFormRegister<SignUpFormData>;
}

export default function Name({ register }: NameProps) {
  return (
    <InputBox>
      <Label name="name">
        <NameSVG /> <span>Name</span>
      </Label>
      <Input
        type="text"
        placeholder="enter your real name"
        {...register('name', { required: 'Please enter your real name' })}
      />
    </InputBox>
  );
}
