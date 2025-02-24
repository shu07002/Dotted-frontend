import { useState } from 'react';
import styled from 'styled-components';
import Eye from '@/assets/svg/LoginPage/Eye.svg?react';
import ErrorMsg from '@/components/SignUpPage/ErrorMsg';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

interface NewPasswordPartProps {
  email: string;
}

async function changePasswordRequest(email: string, newPassword: string) {
  const response = await fetch(
    `${import.meta.env.VITE_API_DOMAIN}/user/password-reset/change`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, new_password: newPassword })
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Password reset failed');
  }

  return response.json();
}

export default function NewPasswordPart({ email }: NewPasswordPartProps) {
  const navigate = useNavigate();
  const [eyeOn, setEyeOn] = useState(false);
  const onClickEyeOn = () => {
    setEyeOn(!eyeOn);
  };

  const [eyeOn2, setEyeOn2] = useState(false);
  const onClickEyeOn2 = () => {
    setEyeOn2(!eyeOn2);
  };

  const [newPassword, setNewPassword] = useState('');
  const [newPasswordCheck, setNewPasswordCheck] = useState('');

  const mutation = useMutation({
    mutationFn: () => changePasswordRequest(email, newPassword),
    onSuccess: () => {
      alert('Password has been changed successfully.');
      navigate('/login');
    },
    onError: (error: any) => {
      console.error('Password change error:', error.message);
      alert('This password is too common. Please choose another one.');
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validatePassword(newPassword);
    if (validationError) {
      return;
    }

    if (newPassword !== newPasswordCheck) {
      alert('Password does not match.');
      return;
    }
    mutation.mutate();
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }
    if (/^\d+$/.test(password)) {
      alert('Password cannot consist of only numbers.');
      return;
    }
    return ''; // 유효성 검사 통과
  };

  return (
    <NewPasswordPartWrapper>
      <InputWrapper>
        <Label htmlFor="password">New Password</Label>
        <div style={{ width: '100%', position: 'relative' }}>
          <Input
            type={eyeOn ? 'text' : 'password'}
            name="password"
            id="password"
            placeholder="●●●●●●●●●●"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <EyeStyled $eyeOn={eyeOn} onClick={onClickEyeOn} />
        </div>
      </InputWrapper>

      <InputWrapper>
        <Label htmlFor="passwordCheck">New Password Check</Label>
        <div style={{ width: '100%', position: 'relative' }}>
          <Input
            type={eyeOn2 ? 'text' : 'password'}
            name="passwordCheck"
            id="passwordCheck"
            placeholder="●●●●●●●●●●"
            value={newPasswordCheck}
            onChange={(e) => setNewPasswordCheck(e.target.value)}
          />
          <EyeStyled $eyeOn={eyeOn2} onClick={onClickEyeOn2} />
        </div>

        <ErrorMsg msg="Password does not match" />
      </InputWrapper>
      {newPassword !== '' &&
        newPasswordCheck !== '' &&
        newPassword !== newPasswordCheck && (
          <ErrorMsg msg="Password does not match" />
        )}

      <SubmitButton onClick={handleSubmit}>
        {mutation.isPending ? 'Submitting...' : 'Submit'}
      </SubmitButton>
    </NewPasswordPartWrapper>
  );
}

const NewPasswordPartWrapper = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Label = styled.label`
  width: 100%;
  color: ${({ theme }) => theme.colors.gray700};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: 36px; /* 225% */
  letter-spacing: -0.8px;
`;

const Input = styled.input`
  padding-left: 2.3rem;
  width: 100%;
  height: 5rem;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  background: ${({ theme }) => theme.colors.gray100};
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 36px; /* 180% */
  letter-spacing: -0.6px;
`;

const EyeStyled = styled(Eye)<{ $eyeOn: boolean }>`
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 2rem;

  transform: translateY(-50%);

  g {
    path {
      stroke: ${({ theme, $eyeOn }) => ($eyeOn ? theme.colors.purple1000 : '')};
    }
  }
`;

const SubmitButton = styled.button`
  cursor: pointer;
  width: 100%;
  height: 5rem;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.purple600};
  border: none;

  color: ${({ theme }) => theme.colors.gray50};
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 36px; /* 180% */
  letter-spacing: -1px;
`;
