import PostingList from '@/components/CommunityPage/PostingList';
import SearchBar from '@/components/CommunityPage/SearchBar';
import TagList from '@/components/CommunityPage/TagList';
import { communityData } from '@/components/CommunityPage/testData';
import { useSearchPosts } from '@/hooks/useSearchPosts';
import { CommunityPost, EachPost } from '@/types/CommunityPost';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const data = communityData;
const tags = ['All', 'HOT', 'Campus Life', 'Travel', 'Living', 'Others'];

const POST_PER_PAGE = 5;

export default function CommunityPage() {
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchResults, setSearchResults] = useState<CommunityPost>();
  const [pagedData, setPagedData] = useState<EachPost[]>([]);
  const [keyword, setKeyword] = useState('');
  const [searchType, setSearchType] = useState('all');
  const searchPosts = useSearchPosts();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    searchPosts.mutate(
      {
        keyword,
        searchType,
        tag: selectedTag,
        page: currentPage
      },
      {
        onSuccess: (data) => {
          setSearchResults(data);
          setPagedData(data.results); // ✅ 검색 결과 업데이트
          setIsLoading(false);
        },
        onError: (error) => {
          console.error('❌ 검색 실패:', error);
          setIsLoading(false);
        }
      }
    );
  };

  useEffect(() => {
    handleSearch();
  }, [selectedTag, currentPage]);

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  const navigate = useNavigate();

  const onChangeSearch = (e: any) => {
    setKeyword(e.target.value);
  };

  const onChangeSearchType = (e: any) => {
    setSearchType(e.target.value);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    const start = (currentPage - 1) * POST_PER_PAGE;
    const end = start + POST_PER_PAGE;
    setPagedData(data.slice(start, end));
  }, [currentPage]);

  const onClickTag = (tag: string) => {
    setSelectedTag(tag);
    setSearchParams({ page: '1', tag: tag, keyword }); // ✅ 태그 변경 시 첫 페이지로
  };

  const handlePageChange = (targetPage: number) => {
    setSearchParams({ page: targetPage.toString(), tag: selectedTag, keyword });
  };

  return (
    <CommunityPageContainer>
      <Wrapper>
        <Title>Community</Title>

        <TagAndSearch>
          <TagList
            tags={tags}
            selectedTag={selectedTag}
            onClickTag={onClickTag}
          />
          <SearchBar
            keyword={keyword}
            searchType={searchType}
            onChangeSearch={onChangeSearch}
            onChangeSearchType={onChangeSearchType}
            handleSearch={handleSearch}
          />
        </TagAndSearch>

        {isLoading ? (
          <div style={{ minHeight: '46rem' }}></div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={JSON.stringify(pagedData)} // ✅ 데이터 변경 시 애니메이션 트리거
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <PostingList pagedData={pagedData} />
            </motion.div>
          </AnimatePresence>
        )}

        <BottomWrapper>
          <PaginationBox>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1 || isLoading} // ✅ 로딩 중에는 비활성화
            >
              {'<'}
            </button>
            {Array.from(
              {
                length: Math.ceil(
                  searchResults ? searchResults.count / POST_PER_PAGE : 1
                )
              },
              (_, idx) => (
                <button
                  className={currentPage === idx + 1 ? 'selected' : ''}
                  key={idx}
                  onClick={() => handlePageChange(idx + 1)}
                  disabled={isLoading} // ✅ 로딩 중에는 비활성화
                >
                  {idx + 1}
                </button>
              )
            )}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={
                currentPage >=
                  Math.ceil((searchResults?.count || 0) / POST_PER_PAGE) ||
                isLoading
              }
            >
              {'>'}
            </button>
          </PaginationBox>
          <WriteButton onClick={() => navigate('write')}>write</WriteButton>
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
