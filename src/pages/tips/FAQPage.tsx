import SearchBar from '@/components/CommunityPage/SearchBar';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Arrow from '@/assets/svg/tips/faq/arrow.svg?react';
import { EachFAQPost, useFAQ } from '@/hooks/useFAQ';
import { useSearchParams } from 'react-router-dom';

const POSTS_PER_PAGE = 7; // 7개씩 표시

export default function FAQPage() {
  const [keyword, setKeyword] = useState('');
  const [searchType, setSearchType] = useState('all');
  const { data, isLoading, error } = useFAQ();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [filteredData, setFilteredData] = useState<EachFAQPost[]>([]);
  const [pagedData, setPagedData] = useState<EachFAQPost[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  // 전체 페이지 계산
  const totalPages = filteredData
    ? Math.ceil(filteredData.length / POSTS_PER_PAGE)
    : 1;

  // 페이지네이션 그룹 설정
  const groupSize = 5;
  const currentGroup = Math.floor((currentPage - 1) / groupSize);
  const startPage = currentGroup * groupSize + 1;
  const endPage = Math.min(startPage + groupSize - 1, totalPages);

  // 🔹 검색어 필터링 함수
  const handleSearch = () => {
    if (!data) return;

    const filtered = data.filter((faq) => {
      const searchLower = keyword.toLowerCase();
      if (searchType === 'all') {
        return (
          faq.question.toLowerCase().includes(searchLower) ||
          faq.answer.toLowerCase().includes(searchLower)
        );
      } else if (searchType === 'title') {
        return faq.question.toLowerCase().includes(searchLower);
      } else if (searchType === 'content') {
        return faq.answer.toLowerCase().includes(searchLower);
      }
      return true;
    });

    setFilteredData(filtered);
    setSearchParams({ page: '1', keyword, searchType }); // 검색 시 페이지 1로 이동
  };

  // 데이터 업데이트 시 필터링 적용
  useEffect(() => {
    if (data) {
      setFilteredData(data);
    }
  }, [data]);

  // 현재 페이지의 데이터 가져오기
  useEffect(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    setPagedData(filteredData.slice(startIndex, endIndex));
  }, [filteredData, currentPage]);

  // 검색어 변경 핸들러
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const onChangeSearchType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value);
  };

  // 아코디언 토글
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (targetPage: number) => {
    setSearchParams({ page: targetPage.toString(), keyword, searchType });
  };

  return (
    <FAQPageContainer>
      <Wrapper>
        <Title>FAQ</Title>
        <NoticeAndSearch>
          <Notice>
            <span>Frequently asked questions from former students</span>
          </Notice>

          <SearchBar
            keyword={keyword}
            searchType={searchType}
            onChangeSearch={onChangeSearch}
            onChangeSearchType={onChangeSearchType}
            handleSearch={handleSearch}
          />
        </NoticeAndSearch>

        <FAQBox>
          {pagedData.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={item.id}>
                <FAQItem isOpen={isOpen} onClick={() => toggleFAQ(idx)}>
                  <div className="question">
                    <div>
                      <div>{idx + 1 + (currentPage - 1) * POSTS_PER_PAGE}</div>
                      {item.question}
                    </div>
                    <ArrowWrapper isOpen={isOpen}>
                      <Arrow />
                    </ArrowWrapper>
                  </div>
                </FAQItem>
                <Answer className={`answer ${isOpen ? 'open' : ''}`}>
                  {item.answer}
                </Answer>
              </div>
            );
          })}
        </FAQBox>

        {/* 페이지네이션 UI */}
        <PaginationBox>
          <button
            onClick={() => handlePageChange(startPage - 1)}
            disabled={currentGroup === 0}
          >
            {'<'}
          </button>
          {Array.from({ length: endPage - startPage + 1 }, (_, idx) => (
            <button
              key={idx}
              className={currentPage === startPage + idx ? 'selected' : ''}
              onClick={() => handlePageChange(startPage + idx)}
            >
              {startPage + idx}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(endPage + 1)}
            disabled={endPage === totalPages}
          >
            {'>'}
          </button>
        </PaginationBox>
      </Wrapper>
    </FAQPageContainer>
  );
}

const FAQPageContainer = styled.div`
  margin-top: 8rem;
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
  line-height: 3.6rem;
  letter-spacing: -0.18rem;
`;

const Notice = styled.div`
  margin: 2rem 0;
  > span {
    white-space: pre-wrap;
    color: ${({ theme }) => theme.colors.gray400};
    font-family: Pretendard;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: 2rem;
  }
`;

const NoticeAndSearch = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.5rem;
`;

const FAQBox = styled.ul`
  > li {
  }
`;

const ArrowWrapper = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const FAQItem = styled.li<{ isOpen: boolean }>`
  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.colors.purple600};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
  }
  cursor: pointer;
  padding: 2.5rem 4rem 2.5rem 2rem;
  background-color: ${({ theme, isOpen }) =>
    isOpen ? theme.colors.purple100 : ''};

  transition: background-color 0.3s ease;

  .question {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${({ theme }) => theme.colors.gray700};
    font-family: Inter;
    font-size: 2rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.1rem;
    cursor: pointer;

    > div {
      display: flex;
      gap: 2rem;

      > div {
        color: ${({ theme }) => theme.colors.purple600};
      }
    }
  }
`;

const Answer = styled.div`
  color: ${({ theme }) => theme.colors.gray700};
  font-family: Inter;
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
  letter-spacing: -0.04rem;
  padding: 0 3.8rem;
  max-height: 0;
  overflow: hidden;
  transition:
    max-height 0.3s ease,
    padding 0.3s ease;

  &.open {
    border-top: 1px solid ${({ theme }) => theme.colors.purple600};
    max-height: 30rem;
    padding: 2.5rem 3.8rem;
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
