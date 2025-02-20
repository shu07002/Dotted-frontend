import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Posting from '@/components/CommunityPage/Posting';
import CommentSection from '@/components/CommunityPage/CommentSection';
import { useQuery } from '@tanstack/react-query';
import LoadingScreen from '@/components/common/LoadingScreen';

// -------------------- 타입 정의 --------------------
export interface PostImage {
  id: number;
  post: number; // post_id (FK)
  image_url: string;
  blob_name: string;
  order: number;
}

export interface PostDetail {
  id: number;
  writer_id: string;
  writer_nickname: string;
  tag: string;
  created_at: string;
  title: string;
  content: string;
  images: PostImage[]; // 이미지 배열
  comments: string; // 댓글 목록 (구조에 따라 수정 가능)
  view_count: number;
  like_count: number;
  scrap_count: number;
  comment_count: number;
  is_mine: boolean;
  is_liked: boolean;
  is_scrapped: boolean;
}

// -------------------- API 호출 함수 --------------------
async function fetchPostDetail(postId: number): Promise<PostDetail> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/posting/${postId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch post detail (status: ${response.status})`);
  }
  return response.json();
}

// -------------------- 컴포넌트 --------------------
export default function DetailCommunityPage() {
  const { id } = useParams();
  const postId = Number(id);

  // API를 통해 상세 게시글을 가져옴
  const {
    data: post,
    isLoading,
    isError
  } = useQuery<PostDetail, Error>({
    queryKey: ['postDetail', postId],
    queryFn: () => fetchPostDetail(postId)
  });

  // "other posts"는 기존 dummy 데이터를 사용 (현재 게시글 제외)
  // const otherPostsData = communityData.filter((el: any) => el.id !== postId);

  // // 기타 게시글 페이지네이션 (dummy 데이터 사용)
  // const [currentPage, setCurrentPage] = useState(1);
  // const [pagedData, setPagedData] = useState<any[]>([]);

  // 좋아요/스크랩 로컬 상태 (예시)
  const [isLiked, setIsLiked] = useState(false);
  const [isScraped, setIsScraped] = useState(false);

  const onClickLike = () => {
    setIsLiked(!isLiked);
  };

  const onClickScrap = () => {
    setIsScraped(!isScraped);
  };

  // function handleDirectionBtn(targetPage: number) {
  //   if (targetPage < 1) {
  //     setCurrentPage(1);
  //   } else if (targetPage > Math.ceil(otherPostsData.length / 3)) {
  //     setCurrentPage(Math.ceil(otherPostsData.length / 3));
  //   } else {
  //     setCurrentPage(targetPage);
  //   }
  // }

  // function handlePageChange(targetPage: number) {
  //   setCurrentPage(targetPage);
  // }

  if (isLoading) {
    return <div style={{ minHeight: '116rem' }} />;
  }

  if (isError || !post) {
    return <div style={{ minHeight: '116rem' }} />;
  }

  console.log(post);

  return (
    <DetailCommunityPageContainer>
      <Wrapper>
        <Posting
          post={post}
          isLiked={isLiked}
          isScraped={isScraped}
          onClickLike={onClickLike}
          onClickScrap={onClickScrap}
        />

        <CommentSection post={post} />

        {/* <OtherPostWrapper>
          <Text>other posts</Text>
          <PostingList pagedData={pagedData} />
          <PaginationBox>
            <button onClick={() => handleDirectionBtn(currentPage - 1)}>
              {'<'}
            </button>
            {Array.from(
              { length: Math.ceil(otherPostsData.length / 3) },
              (_, idx) => (
                <button
                  className={currentPage === idx + 1 ? 'selected' : ''}
                  key={idx}
                  onClick={() => handlePageChange(idx + 1)}
                >
                  {idx + 1}
                </button>
              )
            )}
            <button onClick={() => handleDirectionBtn(currentPage + 1)}>
              {'>'}
            </button>
          </PaginationBox>
        </OtherPostWrapper> */}
      </Wrapper>
    </DetailCommunityPageContainer>
  );
}

// -------------------- 스타일 컴포넌트 --------------------
const DetailCommunityPageContainer = styled.div`
  min-height: 116rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 144rem;
  margin-top: 5.7rem;
  padding: 0 23rem;
`;

// const OtherPostWrapper = styled.div`
//   margin-bottom: 9rem;
// `;

// const Text = styled.div`
//   padding: 1.5rem;
//   color: ${({ theme }) => theme.colors.purple600};
//   font-family: Inter;
//   font-size: 2rem;
//   font-style: normal;
//   font-weight: 600;
//   line-height: normal;
//   letter-spacing: -0.1rem;
//   border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
// `;

// const PaginationBox = styled.div`
//   width: 100%;
//   padding: 5rem 0;
//   display: flex;
//   justify-content: center;
//   gap: 1.5rem;

//   button {
//     width: 3.1rem;
//     height: 3.1rem;
//     border-radius: 50%;
//     border: none;
//     background: none;
//     font-size: 1.6rem;
//     font-weight: 400;

//     &.selected {
//       background-color: ${({ theme }) => theme.colors.purple600};
//       color: ${({ theme }) => theme.colors.gray50};
//     }

//     &:hover {
//       background-color: ${({ theme }) => theme.colors.backgroundBase};
//       cursor: pointer;
//     }
//   }
// `;

const LoadingContainer = styled.div`
  min-height: 116rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;

const ErrorContainer = styled.div`
  min-height: 116rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
  font-size: 2rem;
`;
