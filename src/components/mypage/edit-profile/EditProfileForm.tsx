import BitrhIcon from '@/assets/svg/mypage/birth.svg?react';
import KeyIcon from '@/assets/svg/mypage/key.svg?react';
import NicknameIcon from '@/assets/svg/mypage/nickname.svg?react';
import ProfileIcon from '@/assets/svg/mypage/profile.svg?react';
import WarningIcon from '@/assets/svg/mypage/warning.svg?react';
import styled from 'styled-components';

export default function EditProfileForm() {
  return (
    <Form>
      <FieldBox>
        <label htmlFor="name">
          <ProfileIcon />
          Name
        </label>
        <InputBox>
          <input type="text" id="name" />
        </InputBox>
      </FieldBox>
      <FieldBox>
        <label htmlFor="password">
          <KeyIcon />
          Password
        </label>
        <InputBox>
          <input type="password" id="password" />
          <button>Change Password</button>
        </InputBox>
      </FieldBox>
      <FieldBox>
        <label htmlFor="birth">
          <BitrhIcon />
          Birth
        </label>
        <BirthBox>
          <span>
            <label htmlFor="year">Year</label>
            <select name="year" id="year">
              <option>2002</option>
            </select>
          </span>
          <span>
            <label htmlFor="month">Month</label>
            <select name="month" id="month">
              <option>08</option>
            </select>
          </span>
          <span>
            <label htmlFor="day">Day</label>
            <select name="day" id="day">
              <option>08</option>
            </select>
          </span>
        </BirthBox>
      </FieldBox>
      <FieldBox>
        <label htmlFor="nickname">
          <NicknameIcon />
          Nickname
        </label>
        <InputBox>
          <input type="text" id="nickname" />
          <button>Validation Check</button>
        </InputBox>
        <p>
          <WarningIcon /> You can't use this nickname
        </p>
      </FieldBox>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FieldBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  margin-bottom: 1rem;

  > label {
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 2.4rem;
    letter-spacing: -0.8px;
    color: ${({ theme }) => theme.colors.gray700};

    svg {
      path {
        stroke: ${({ theme }) => theme.colors.purple600};
      }
    }
  }

  > p {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 2rem;
    letter-spacing: -0.8px;
    color: var(--negative-900);
  }
`;

const InputBox = styled.span`
  display: flex;
  align-items: center;
  gap: 1rem;

  > input {
    width: 30vw;
    height: 4rem;
    padding: 0 2.3rem;
    background-color: ${({ theme }) => theme.colors.gray100};
    border: 0.1rem solid ${({ theme }) => theme.colors.gray300};
    border-radius: 5px;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 2.8rem;
    letter-spacing: -0.3px;
    color: ${({ theme }) => theme.colors.gray700};
  }

  > button {
    width: 20rem;
    height: 4rem;
    border: none;
    border-radius: 5px;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 2.4rem;
    letter-spacing: -0.6px;
    background-color: ${({ theme }) => theme.colors.gray800};
    color: ${({ theme }) => theme.colors.gray50};
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.colors.gray700};
    }
  }
`;

const BirthBox = styled.div`
  display: flex;
  gap: 1.5rem;

  > span {
    display: flex;
    flex-direction: column;
    /* gap: 1rem; */

    > label {
      margin-bottom: 1rem;
      font-size: 1.4rem;
      font-weight: 300;
      /* line-height: 3rem; */
      letter-spacing: -0.8px;
    }

    > select {
      width: 10vw;
      height: 4rem;
      padding: 0 0 0 2.3rem;
      background-color: ${({ theme }) => theme.colors.gray100};
      border: 0.1rem solid ${({ theme }) => theme.colors.gray300};
      border-radius: 5px;
      font-size: 1.6rem;
      font-weight: 400;
      line-height: 2.8rem;
      letter-spacing: -0.3px;
      color: ${({ theme }) => theme.colors.gray700};
    }
  }
`;
