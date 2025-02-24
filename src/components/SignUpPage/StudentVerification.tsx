import styled from 'styled-components';

import WarnSVG from '@/assets/svg/SignUpPage/ErrorMsgSVG.svg?react';
import ImgFileSVG from '@/assets/svg/SignUpPage/ImgFileSVG.svg?react';
import TimeSVG from '@/assets/svg/SignUpPage/TimeSVG.svg?react';
import TrashcanSVG from '@/assets/svg/SignUpPage/TrashcanSVG.svg?react';
import UnlockSVG from '@/assets/svg/SignUpPage/UnlockSVG.svg?react';
import PentagonSVG from '@/assets/svg/SignUpPage/PentagonSVG.svg?react';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { SignUpFormData } from '@/types/signUpFormData';
import { UseFormWatch } from 'react-hook-form';

interface StudentVerificatProps {
  onChangeStep: () => void;
  watch: UseFormWatch<SignUpFormData>;
}

export default function StudentVerificat({
  onChangeStep,
  watch
}: StudentVerificatProps) {
  const [preview, setPreview] = useState<string>('');
  const imgFileRef = useRef<HTMLInputElement>(null);
  const [imgFile, setImgFile] = useState<File | null>(null);

  let emailValue = watch('email');
  if (emailValue) if (!emailValue.includes('@')) emailValue += '@sogang.ac.kr';
  const passwordValue = watch('password');

  const autoLoginMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: emailValue, // 🔹 자동 로그인할 계정 정보
            password: passwordValue
          })
        }
      );

      if (!response.ok) {
        throw new Error('자동 로그인 실패');
      }

      return response.json();
    },

    // 🚨 일단 로컬 스토리지에 저장하여 테스트
    onSuccess: (data) => {
      console.log('✅ 자동 로그인 성공:', data);
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
    },
    onError: (error) => {
      console.error('❌ 자동 로그인 실패:', error);
    }
  });

  // 페이지 렌더링 시 자동 로그인 실행
  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      console.log('🔹 토큰 없음, 자동 로그인 시도');
      autoLoginMutation.mutate();
    } else {
      console.log('✅ 이미 로그인 상태');
    }
  }, []);

  const uploadUniversityImageMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('image_upload', file); // ✅ 파일 추가

      // 로컬 스토리지에서 access_token 가져오기
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token found. Please log in again.');
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/univrequest`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error('University verification request failed.');
      }

      onChangeStep();
      return response.json();
    },
    onSuccess: (data) => {
      console.log('🎉 University verification request successful:', data);
      alert('University verification request has been successfully submitted.');
    },
    onError: (error) => {
      console.error('❌ University verification request failed:', error);
      alert(
        'You are either already verified, or an error occurred during the request.'
      );
    }
  });

  const onClickReupload = () => {
    console.log(imgFileRef.current);
    if (imgFileRef.current) {
      imgFileRef.current.value = '';
      imgFileRef.current.click();
    }
  };

  const onClickDelete = () => {
    setPreview('');
    setImgFile(null);
  };

  const onSaveImage = () => {
    const reader = new FileReader();

    if (imgFileRef.current?.files) {
      const file = imgFileRef.current.files[0];
      console.log(file);
      setImgFile(file);

      if (file) {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setPreview(reader.result as string);

          if (imgFileRef.current) {
            imgFileRef.current.value = '';
          }
        };
      }
    }
  };

  const onClickImgSubmit = () => {
    if (!imgFile) {
      alert('Please Attach Image File');
      return;
    }

    uploadUniversityImageMutation.mutate(imgFile);
  };

  return (
    <StudentVerificationLayout>
      <StudentVerificationWrapper>
        <Title>Student Verification</Title>

        <Guide>
          <span>Please upload an image file to </span>
          <span>prove that you are a student at Sogang University.</span>
        </Guide>

        <Example>
          ex. Student ID Card, Saint Main page Screenshot, Course Records
        </Example>

        <Warnning>
          <div>
            <WarnSVG />
          </div>
          <span>
            Your real name and university name must be visible. <br />
            You can hide other personal details such as card numbers or photos.
          </span>
        </Warnning>

        <AttatchImage>
          {preview === '' ? (
            <>
              <label htmlFor="file">
                <ImgFileSVG />
                <span>Attach Image File</span>
                <span>JPG, PNG, JPEG</span>
              </label>
            </>
          ) : (
            <>
              <img src={preview} alt="proving-source" />
            </>
          )}
          <input
            type="file"
            accept="image/*"
            id="file"
            name="file"
            ref={imgFileRef}
            onChange={onSaveImage}
            style={{ display: 'none', cursor: 'pointer' }}
          />
        </AttatchImage>

        {preview !== '' && (
          <ButtonWrapper>
            <button onClick={onClickReupload}>reupload</button>
            <button onClick={onClickDelete}>delete</button>
          </ButtonWrapper>
        )}

        <Notice>
          <div>
            <ItemWrapper>
              <StyledPentagonSVG />
              <TimeSVG />
            </ItemWrapper>
            <span>
              It takes some <span>time</span> to accept you because we have to
              check this file.
            </span>
          </div>
          <div>
            <ItemWrapper>
              <StyledPentagonSVG />
              <TrashcanSVG />
            </ItemWrapper>
            <span>
              We will <span>destroy</span> this file after checking.
            </span>
          </div>
          <div>
            <ItemWrapper>
              <StyledPentagonSVG />
              <UnlockSVG />
            </ItemWrapper>
            <span>
              <span>Community</span>
              and <span>Market</span> can be used after you are approved.
            </span>
          </div>
        </Notice>

        <SubmitButtonLayout>
          <SubmitButtonWrapper>
            <SubmitButton onClick={onClickImgSubmit}>Submit</SubmitButton>
          </SubmitButtonWrapper>
        </SubmitButtonLayout>
      </StudentVerificationWrapper>
    </StudentVerificationLayout>
  );
}

const StudentVerificationLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StudentVerificationWrapper = styled.div`
  width: 94.2rem;
`;

const Title = styled.div`
  width: 100%;
  margin-bottom: 3.1rem;
  display: flex;

  height: 43px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.gray700};
  font-family: Pretendard;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 36px; /* 100% */
  letter-spacing: -1.8px;
`;

const Guide = styled.div`
  width: 100%;
  > span {
    &:last-child {
      color: ${({ theme }) => theme.colors.purple600};
      font-family: Pretendard;
      font-size: 24px;
      font-style: normal;
      font-weight: 700;
      line-height: 36px;
      letter-spacing: -0.72px;
    }
    color: ${({ theme }) => theme.colors.gray700};
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 36px; /* 150% */
    letter-spacing: -0.72px;
  }
`;

const Example = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.gray500};
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: 36px; /* 180% */
  letter-spacing: -0.6px;
  margin-bottom: 0.5rem;
`;

const Warnning = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 2.7rem;

  > span {
    color: var(--Semantic-Negative-900, #ea3729);
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 32px; /* 160% */
    letter-spacing: -0.2px;
  }
`;

const AttatchImage = styled.div`
  cursor: pointer;
  width: 100%;
  height: 20.2rem;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px dashed ${({ theme }) => theme.colors.purple650};
  background: ${({ theme }) => theme.colors.backgroundLayer1};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 3.4rem;

  > img {
    height: 80%;
    object-fit: cover;
  }

  > label {
    width: 100%;
    height: 100%;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > span {
      &:last-child {
        color: ${({ theme }) => theme.colors.purple600};
        text-align: center;
        font-family: Pretendard;
        font-size: 16px;
        font-style: normal;
        font-weight: 300;
        line-height: 36px; /* 225% */
        letter-spacing: -0.16px;
      }

      color: ${({ theme }) => theme.colors.gray700};
      text-align: center;
      font-family: Pretendard;
      font-size: 24px;
      font-style: normal;
      font-weight: 700;
      line-height: 36px; /* 150% */
      letter-spacing: -0.24px;
    }
  }
`;

const Notice = styled.div`
  display: flex;
  position: relative;
  justify-content: space-evenly;
  margin-bottom: 6.2rem;
  > div {
    display: flex;
    flex-direction: column;

    align-items: center;
    width: 22.4rem;

    > span {
      color: ${({ theme }) => theme.colors.gray600};
      text-align: center;
      font-family: Pretendard;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: 36px; /* 180% */
      letter-spacing: -0.2px;

      > span {
        font-weight: 700;
      }
    }
  }
`;

const ItemWrapper = styled.div`
  width: 9.6rem;
  height: 10rem;
  position: relative;
  margin-bottom: 1.6rem;
  > svg {
    position: absolute;
    &:last-child {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const SubmitButtonLayout = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

const SubmitButtonWrapper = styled.div`
  width: 19rem;
`;

const StyledPentagonSVG = styled(PentagonSVG)`
  path {
    fill: ${({ theme }) => theme.colors.purple100};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  gap: 2rem;
  margin-bottom: 3.4rem;

  > button {
    cursor: pointer;
    width: 10rem;
    padding: 1.2rem;
    border-radius: 5px;
    border: none;
    background: ${({ theme }) => theme.colors.purple600};
    color: ${({ theme }) => theme.colors.gray50};
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 36px; /* 180% */
    letter-spacing: -1px;
  }
`;

const SubmitButton = styled.div`
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
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 36px; /* 180% */
  letter-spacing: -1px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
