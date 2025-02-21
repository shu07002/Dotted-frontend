import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import styled from 'styled-components';

import { useEffect, useRef, useState } from 'react';
import CommentSection from '@/components/CommunityPage/CommentSection';
import { useMutation, useQuery } from '@tanstack/react-query';
import MarketPosting from '@/components/MarketPage/MarketPosting';

export interface MarketPostImage {
  id: number;
  post: number; // post_id (FK)
  image_url: string;
  blob_name: string;
  order: number;
}

export interface MarketPostDetail {
  id: number;
  writer_id: string;
  writer_nickname: string;
  status: string;
  created_at: string;
  title: string;
  content: string;
  price: number;
  images: MarketPostImage[]; // 이미지 배열
  comments: string; // 댓글 목록 (구조에 따라 수정 가능)
  scrap_count: number;
  comment_count: number;
  is_scrapped: boolean;
}

export default function DetailMarketPage() {
  const { id } = useParams();
  const postId = Number(id);
  const [isScraped, setIsScraped] = useState(false);

  const {
    data: post,
    isLoading,
    isError
  } = useQuery<MarketPostDetail, Error>({
    queryKey: ['postDetail', postId],
    queryFn: () => fetchPostDetail(postId)
  });

  useEffect(() => {
    if (post) {
      setIsScraped(post.is_scrapped);
    }
  }, [post]);

  // -------------------- API 호출 함수 --------------------
  async function fetchPostDetail(postId: number): Promise<MarketPostDetail> {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/posting/market/${postId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch post detail (status: ${response.status})`
      );
    }

    return response.json();
  }

  const scrapMutation = useMutation({
    mutationFn: async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        console.error('No access');
        return;
      }
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/posting/${id}/scrap`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({ id })
          }
        );

        if (!response.ok) {
          throw new Error('Failed to like');
        }

        return await response.json();
      } catch (error) {
        console.log(error);
        throw error; // onError 핸들러에서 처리됨
      } finally {
        // 요청 성공/실패 여부와 관계없이 항상 실행됨
      }
    },
    onSuccess: (data) => {
      setIsScraped(data.is_scrapped);
      console.log(data);
    },
    onError: (error) => {
      console.log(`Error: ${error.message}`);
    }
  });

  const onClickScrap = () => {
    setIsScraped(!isScraped);
    scrapMutation.mutate();
  };

  if (isLoading) {
    return <div style={{ minHeight: '116rem' }} />;
  }

  if (isError || !post) {
    return <div style={{ minHeight: '116rem' }} />;
  }

  return (
    <DetailMarketPageContainer>
      <Wrapper>
        <MarketPosting
          post={post}
          isScraped={isScraped}
          onClickScrap={onClickScrap}
        />
        <ContentWrapper>{post.content}</ContentWrapper>

        {/* <CommentSection post={post} /> */}
      </Wrapper>
    </DetailMarketPageContainer>
  );
}

const DetailMarketPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  margin-top: 5.7rem;
  padding: 0 23rem;
`;

const ContentWrapper = styled.div`
  padding: 2rem 0;
  width: 100%;
  min-height: 12rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
  margin-bottom: 3.2rem;

  color: ${({ theme }) => theme.colors.gray800};
  font-family: Inter;
  font-size: 2rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: -0.06rem;
`;
