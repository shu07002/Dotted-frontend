import EditProfileForm from '@/components/mypage/edit-profile/EditProfileForm';
import styled from 'styled-components';

export default function EditProfilePage() {
  return (
    <Main>
      <EditProfileForm />
      <DeleteBtn>
        <button>Delete Account</button>
      </DeleteBtn>
      <SubmitBtn>
        <button>Submit</button>
      </SubmitBtn>
    </Main>
  );
}

const Main = styled.main`
  padding-bottom: 3rem;
  height: 100%;
  > h1 {
    font-size: 3.2rem;
    font-weight: 700;
    line-height: 3.6rem;
    letter-spacing: -1.6px;
    color: ${({ theme }) => theme.colors.gray800};
  }
`;

const DeleteBtn = styled.div`
  width: 100%;
  padding: 2rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  button {
    border: none;
    background: none;
    color: ${({ theme }) => theme.colors.gray400};
    font-size: 1.6rem;
    font-weight: 300;
    letter-spacing: -0.8px;
    text-decoration-line: underline;
  }
`;

const SubmitBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  button {
    width: 19rem;
    height: 4rem;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.purple600};
    color: ${({ theme }) => theme.colors.gray50};
    border: none;
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 3.6rem;
    letter-spacing: -0.6px;
  }
`;
