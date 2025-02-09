import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { communityData } from '@/components/CommunityPage/testData';
import { useEffect, useState } from 'react';
import Posting from './Posting';

import CommentSection from './CommentSection';
import { CommunityPost } from '@/types/CommunityPost';
import PostingList from '@/components/CommunityPage/PostingList';

export default function DetailCommunityPage() {
  const { id } = useParams();
  const [post] = communityData.filter((el) => el.id === Number(id));

  const [isLiked, setIsLiked] = useState(false);
  const [isScraped, setIsScraped] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pagedData, setPagedData] = useState<CommunityPost[]>([]);

  const data = communityData.filter((el) => el.id !== Number(id));

  useEffect(() => {
    const start = (currentPage - 1) * 3;
    const end = start + 3;
    setPagedData(data.slice(start, end));
  }, [currentPage]);

  const onClickLike = () => {
    setIsLiked(!isLiked);
  };

  const onClickScrap = () => {
    setIsScraped(!isScraped);
  };

  function handleDirectionBtn(targetPage: number) {
    if (targetPage < 1) {
      setCurrentPage(1);
    } else if (targetPage > Math.ceil(data.length / 3)) {
      setCurrentPage(Math.ceil(data.length / 3));
    } else {
      setCurrentPage(targetPage);
    }
  }

  function handlePageChange(targetPage: number) {
    setCurrentPage(targetPage);
  }

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

        <OtherPostWrapper>
          <Text>other posts</Text>
          <PostingList pagedData={pagedData} />
          <PaginationBox>
            <button onClick={() => handleDirectionBtn(currentPage - 1)}>
              {'<'}
            </button>
            {Array.from({ length: Math.ceil(data.length / 3) }, (_, idx) => (
              <button
                className={currentPage === idx + 1 ? 'selected' : ''}
                key={idx}
                onClick={() => handlePageChange(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
            <button onClick={() => handleDirectionBtn(currentPage + 1)}>
              {'>'}
            </button>
          </PaginationBox>
        </OtherPostWrapper>
      </Wrapper>
    </DetailCommunityPageContainer>
  );
}

const DetailCommunityPageContainer = styled.div`
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

const OtherPostWrapper = styled.div`
  margin-bottom: 9rem;
`;

const Text = styled.div`
  padding: 1.5rem;
  color: ${({ theme }) => theme.colors.purple600};
  font-family: Inter;
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
`;

const PaginationBox = styled.div`
  width: 100%;
  padding: 5rem 0;
  display: flex;
  justify-content: center;
  gap: 1.5rem;

  button {
    width: 3.1rem;
    height: 3.1rem;
    border-radius: 50%;
    border: none;
    background: none;
    font-size: 1.6rem;
    font-weight: 400;

    &.selected {
      background-color: ${({ theme }) => theme.colors.purple600};
      color: ${({ theme }) => theme.colors.gray50};
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors.backgroundBase};
      cursor: pointer;
    }
  }
`;
