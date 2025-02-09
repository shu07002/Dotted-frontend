import PostingList from '@/components/CommunityPage/PostingList';
import SearchBar from '@/components/CommunityPage/SearchBar';
import TagList from '@/components/CommunityPage/TagList';
import { communityData } from '@/components/CommunityPage/testData';
import { CommunityPost } from '@/types/CommunityPost';

import { useEffect, useState } from 'react';
import styled from 'styled-components';

const data = communityData;

export default function CommunityPage() {
  const [selectedTag, setSelectedTag] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagedData, setPagedData] = useState<CommunityPost[]>([]);

  const onClickTag = (tag: string) => {
    setSelectedTag(tag);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    const start = (currentPage - 1) * 8;
    const end = start + 8;
    setPagedData(data.slice(start, end));
  }, [currentPage]);

  function handleDirectionBtn(targetPage: number) {
    if (targetPage < 1) {
      setCurrentPage(1);
    } else if (targetPage > Math.ceil(data.length / 8)) {
      setCurrentPage(Math.ceil(data.length / 8));
    } else {
      setCurrentPage(targetPage);
    }
  }

  function handlePageChange(targetPage: number) {
    setCurrentPage(targetPage);
  }

  return (
    <CommunityPageContainer>
      <Wrapper>
        <Title>Community</Title>

        <TagAndSearch>
          <TagList selectedTag={selectedTag} onClickTag={onClickTag} />
          <SearchBar />
        </TagAndSearch>

        <PostingList pagedData={pagedData} />

        <BottomWrapper>
          <PaginationBox>
            <button onClick={() => handleDirectionBtn(currentPage - 1)}>
              {'<'}
            </button>
            {Array.from({ length: Math.ceil(data.length / 8) }, (_, idx) => (
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

          <WriteButton>Write</WriteButton>
        </BottomWrapper>
      </Wrapper>
    </CommunityPageContainer>
  );
}

const CommunityPageContainer = styled.div`
  margin-top: 2.5rem;
  width: 100%;
  padding: 0 24.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1024px) {
    padding: 0 10rem;
  }
`;

const Wrapper = styled.div`
  width: 100%;
`;

const Title = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.gray700};
  font-family: Pretendard;
  font-size: 3.6rem;
  font-style: normal;
  font-weight: 700;
  line-height: 3.6rem; /* 100% */
  letter-spacing: -0.18rem;
`;

const TagAndSearch = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-top: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};

  @media (max-width: 1125px) {
    flex-direction: column;
    align-items: normal;
    > ul:first-child {
      margin-bottom: 2rem;
    }
  }
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

const BottomWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const WriteButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 11.8rem;
  height: 3.4rem;
  flex-shrink: 0;
  position: absolute;
  right: 0;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.gray700};
  border: none;

  color: var(--Gray-Gray_light-gray-50_light, #fff);
  text-align: center;
  font-family: Inter;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray600};
  }
`;
