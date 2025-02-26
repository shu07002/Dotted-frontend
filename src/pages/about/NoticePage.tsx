import SearchBar from '@/components/CommunityPage/SearchBar';
import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { EachNoticePost, useNotice } from '@/hooks/useNotice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';

const POSTS_PER_PAGE = 7; // 7개씩 표시

export default function NoticePage() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [searchType, setSearchType] = useState('all');
  const { data } = useNotice();
  const [filteredData, setFilteredData] = useState<EachNoticePost[]>([]);
  const [pagedData, setPagedData] = useState<EachNoticePost[]>([]);

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

  // 페이지 변경 핸들러
  const handlePageChange = (targetPage: number) => {
    setSearchParams({ page: targetPage.toString(), keyword, searchType });
  };

  return (
    <FAQPageContainer>
      <Wrapper>
        <Title>Notice</Title>
        <NoticeAndSearch>
          <Notice>
            <span>Announcement from Dotted</span>
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
            return (
              <div key={item.id}>
                <FAQItem onClick={() => navigate(`/about/notice/${item.id}`)}>
                  <div className="question">
                    <div>
                      <div>{idx + 1 + (currentPage - 1) * POSTS_PER_PAGE}</div>
                      {item.question}
                    </div>
                    <ArrowWrapper>
                      {dayjs(item.created_at).format('YYYY/MM/DD')}
                    </ArrowWrapper>
                  </div>
                </FAQItem>
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
  min-height: 80rem;
  width: 100%;
  padding: 0 24.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1200px) {
    padding: 0 10rem;
  }

  @media (max-width: 700px) {
    padding: 0 2rem;
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

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const FAQBox = styled.ul``;

const ArrowWrapper = styled.div`
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
  padding: 0.5rem;
  padding-left: 1.5rem;
  color: ${({ theme }) => theme.colors.gray400};
  font-size: 1.2rem;
  font-weight: 400;
`;

const FAQItem = styled.li`
  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.colors.purple600};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
  }
  cursor: pointer;
  padding: 2.5rem 4rem 2.5rem 2rem;

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

    @media (max-width: 700px) {
      font-size: 1.5rem;
    }

    > div {
      display: flex;
      gap: 2rem;

      > div {
        color: ${({ theme }) => theme.colors.purple600};
      }
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
