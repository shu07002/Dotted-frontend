// import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import BackIcon from '@/assets/svg/tips/culture/back.svg?react';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TiptapViewOnly } from '@/components/CommunityPage/TipTapViewOnly';

const fetchCultureData = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_DOMAIN}/api/campus/culture`
  );
  return response.json();
};

interface CultureDetail {
  title: string;
  createdAt: string;
  id: number;
  content: string;
  thumnail: string;
}

export default function CultureDetailPage() {
  const navigate = useNavigate();
  const { cultureId } = useParams();

  const [articleData, setArticleData] = useState<CultureDetail | null>(null);
  const { data, isLoading, error } = useQuery({
    queryKey: ['tipsClubs'],
    queryFn: fetchCultureData
  });

  useEffect(() => {
    if (cultureId && data) {
      const fetchedData = data?.filter(
        (item: CultureDetail) => item.id === parseInt(cultureId)
      );

      if (fetchedData) {
        setArticleData(fetchedData[0]);
      }
    }
  }, [cultureId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <Main>
      <Header>
        <h1>{articleData?.title}</h1>
        <p>{articleData?.createdAt}</p>
        <BackIcon onClick={() => navigate(-1)} />
      </Header>
      <ContentBox>
        {articleData?.content && (
          <TiptapViewOnly content={articleData.content} />
        )}
      </ContentBox>
    </Main>
  );
}

const Main = styled.main`
  width: 100%;
  padding: 5rem 15rem 2.6rem 15rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 900px) {
    padding-left: 7.7rem;
    padding-right: 7.7rem;
  }

  @media (max-width: 700px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
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

    @media (max-width: 700px) {
      font-size: 3.1rem;
    }
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
