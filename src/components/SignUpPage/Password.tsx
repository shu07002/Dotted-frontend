import InputBox from './InputBox';
import Label from './Label';
import Input from './Input';
import ErrorMsg from './ErrorMsg';
import PasswordKey from '@/assets/svg/SignUpPage/PasswordKeySVG.svg?react';

export default function Password() {
  return (
    <>
      <InputBox>
        <Label name="password">
          <PasswordKey /> <span>Password</span>
        </Label>
        <Input name="password" type="password" placeholder="●●●●●●●●●●●" />
        <ErrorMsg />
      </InputBox>

      <InputBox>
        <Label name="passwordCheck">
          <PasswordKey /> <span>Password Check</span>
        </Label>
        <Input name="passwordCheck" type="password" placeholder="●●●●●●●●●●●" />

        <ErrorMsg />
      </InputBox>
    </>
  );
}
