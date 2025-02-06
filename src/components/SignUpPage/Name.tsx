import InputBox from './InputBox';
import Label from './Label';
import Input from './Input';
import NameSVG from '@/assets/svg/SignUpPage/NameSVG.svg?react';

export default function Name() {
  return (
    <InputBox>
      <Label name="name">
        <NameSVG /> <span>Name</span>
      </Label>
      <Input name="name" type="text" placeholder="enter your real name" />
    </InputBox>
  );
}
