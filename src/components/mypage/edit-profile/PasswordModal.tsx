import { useState } from 'react';
import styled from 'styled-components';

export default function PasswordModal({
  setModalOpen,
  email
}: {
  setModalOpen: (value: boolean) => void;
  email: string | undefined;
}) {
  const [isVerified, setIsVerified] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const handleEmailSent = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_DOMAIN}/api/user/password-reset/email`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        }
      );
      if (response.ok) {
        setIsEmailSent(true);
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleVerification = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_DOMAIN}/api/user/password-reset/verify`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, code: verificationCode })
        }
      );
      if (response.ok) {
        setIsVerified(true);
      } else {
        console.error('Verification failed');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(newPassword === e.target.value);
  };

  const handleSubmit = async () => {
    if (!passwordMatch) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_DOMAIN}/api/user/password-reset/change`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, new_password: newPassword })
        }
      );
      if (response.ok) {
        alert('Password changed successfully');
        setModalOpen(false);
      } else {
        console.error('Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  return (
    <Wrapper>
      <Modal>
        <h1>Change Password</h1>
        <Form>
          <SendEmailBtn onClick={handleEmailSent}>
            Send email to verify ⟶
          </SendEmailBtn>
          {isEmailSent && (
            <EmailVerify>
              <div>
                {/* <label htmlFor="verification-code">Verification Code</label> */}
                <input
                  placeholder="enter verification code"
                  type="text"
                  id="verification-code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
              </div>
              <button onClick={handleVerification}>Verify</button>
            </EmailVerify>
          )}
          {isVerified && <h2>◉ Success to verify</h2>}
          {isVerified && (
            <PasswordBox>
              <div>
                <label htmlFor="new-password">New Password</label>
                <input
                  type="password"
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={handlePasswordChange}
                />
                {!passwordMatch && <h2>◉ Password does not match</h2>}
              </div>
            </PasswordBox>
          )}
        </Form>
        <Buttons>
          <button onClick={() => setModalOpen(false)}>Cancel</button>
          <button
            onClick={handleSubmit}
            className={passwordMatch ? '' : 'notMatch'}
            disabled={!passwordMatch || !newPassword || !confirmPassword}
          >
            Submit
          </button>
        </Buttons>
      </Modal>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  width: 50%;
  height: 70%;
  background-color: ${({ theme }) => theme.colors.gray50};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  > h1 {
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 3.4rem;
    letter-spacing: -0.8px;
    color: ${({ theme }) => theme.colors.gray800};
    margin-bottom: 1rem;
    padding: 2rem 3rem 0 3rem;
  }
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 3rem;
  height: 100%;
  h2 {
    font-size: 1.2rem;
    font-weight: 400;
    letter-spacing: -0.8px;
    color: ${({ theme }) => theme.colors.purple600};
  }
`;
const SendEmailBtn = styled.button`
  width: fit-content;
  padding: 1rem 2rem;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.purple600};
  color: ${({ theme }) => theme.colors.gray50};
  border: none;
  font-size: 1.3rem;
  font-weight: 500;
`;
const EmailVerify = styled.div`
  display: flex;
  gap: 1rem;
  > div {
    display: flex;
    align-items: center;
    gap: 1.1rem;
    > label {
      font-size: 1.6rem;
      font-weight: 400;
      color: ${({ theme }) => theme.colors.gray700};
    }
    > input {
      width: 30vw;
      height: 4rem;
      padding: 0 1.4rem;
      border-radius: 5px;
      font-size: 1.6rem;
      color: ${({ theme }) => theme.colors.gray700};
      border: 1px solid ${({ theme }) => theme.colors.gray300};
    }
  }
  > button {
    width: fit-content;
    padding: 1rem 2rem;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.purple600};
    color: ${({ theme }) => theme.colors.gray50};
    border: none;
    font-size: 1.3rem;
    font-weight: 500;
  }
`;
const PasswordBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  > div {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    > label {
      margin-top: 2rem;
      font-size: 1.3rem;
      font-weight: 400;
      color: ${({ theme }) => theme.colors.gray700};
    }
    > input {
      width: 30vw;
      height: 4rem;
      padding: 0 1.4rem;
      border-radius: 5px;
      font-size: 1.6rem;
      color: ${({ theme }) => theme.colors.gray700};
      border: 1px solid ${({ theme }) => theme.colors.gray300};
    }
  }
  > button {
    width: fit-content;
    padding: 1rem 2rem;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.purple600};
    color: ${({ theme }) => theme.colors.gray50};
    border: none;
    font-size: 1.3rem;
    font-weight: 500;
  }
`;

const Buttons = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  button {
    width: 50%;
    height: 3rem;
    background-color: ${({ theme }) => theme.colors.gray800};
    color: ${({ theme }) => theme.colors.gray50};
    border: none;
    font-size: 1.3rem;
    font-weight: 500;
    padding: 2rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    &:first-child {
    }
    &:last-child {
      background-color: ${({ theme }) => theme.colors.purple600};
    }
    &.notMatch {
      cursor: not-allowed;
      background-color: ${({ theme }) => theme.colors.gray300};
    }
  }
`;
