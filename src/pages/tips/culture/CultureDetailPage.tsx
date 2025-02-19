// import { useQuery } from '@tanstack/react-query';
import { cultureData } from '@/components/tips/culture/testData';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import BackIcon from '@/assets/svg/tips/culture/back.svg?react';
import { useEffect, useState } from 'react';

// const fetchCultureDetail = async (id: number) => {
//   const response = await fetch(
//     `${import.meta.env.VITE_API_URL}/tips/tips-clubs/${id}`
//   );
//   return response.json();
// };

interface CultureDetail {
  title: string;
  createdAt: string;
  id: number;
  content: string;
  thumnail: string;
}

export default function CultureDetailPage() {
  // const { data:articleData, error } = useQuery({
  //   queryKey: ['cultureDetail', 1],
  //   queryFn: () => fetchCultureDetail(1),
  // })
  const navigate = useNavigate();
  const [articleData, setArticleData] = useState<CultureDetail>();
  const { cultureId } = useParams();
  const [articleContent, setArticleContent] = useState<string[]>([]);

  useEffect(() => {
    if (cultureId) {
      setArticleData(cultureData[parseInt(cultureId) - 1]);
      setArticleContent(
        cultureData[parseInt(cultureId) - 1].content.split('\n')
      );
    }
  }, [cultureId]);

  return (
    <Main>
      <Header>
        <h1>{articleData?.title}</h1>
        <p>{articleData?.createdAt}</p>
        <BackIcon onClick={() => navigate(-1)} />
      </Header>
      <ContentBox>
        {articleContent.map((line, idx) =>
          line.startsWith('http') ? (
            <img key={idx} src={line} alt="contentImage" />
          ) : (
            <p key={idx}>{line}</p>
          )
        )}
      </ContentBox>
    </Main>
  );
}

const Main = styled.main`
  width: 100%;
  padding: 5rem 34.4rem 2.6rem 34.4rem;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: center;
  position: relative;
  padding: 7rem 0 1.8rem 0;

  > h1 {
    font-size: 3.6rem;
    font-weight: 600;
    letter-spacing: -1.8px;
    color: ${({ theme }) => theme.colors.gray800};
  }

  > p {
    font-size: 1.6rem;
    font-weight: 500;
    letter-spacing: -0.8px;
    color: ${({ theme }) => theme.colors.gray500};
  }

  > svg {
    position: absolute;
    left: 0;
    cursor: pointer;
  }
`;

const ContentBox = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;

  > img {
    width: 100%;
    height: 30rem;
    border-radius: 5px;
    object-fit: contain;
  }

  > p {
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 2.4rem;
    letter-spacing: -0.6px;
    color: ${({ theme }) => theme.colors.gray800};
    text-align: center;
    word-break: keep-all;
  }
`;
