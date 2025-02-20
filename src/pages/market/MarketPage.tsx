import SearchBar from '@/components/CommunityPage/SearchBar';
import TagList from '@/components/CommunityPage/TagList';
import MakrketList from '@/components/MarketPage/MakrketList';
import { marketPost } from '@/components/MarketPage/marketPost';
import { MarketPost } from '@/types/MarketPost';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const tags = ['All', 'Only On Sale'];
const data = marketPost;

export default function MarketPage() {
  const [selectedTag, setSelectedTag] = useState('All');
  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagedData, setPagedData] = useState<MarketPost[]>([]);
  const navigate = useNavigate();

  const onChangeSearch = (e: any) => {
    setSearch(e.target.value);
  };

  const onChangeSearchType = (e: any) => {
    setSearchType(e.target.value);
  };

  const onClickTag = (tag: string) => {
    setSelectedTag(tag);
  };

  function handleDirectionBtn(targetPage: number) {
    if (targetPage < 1) {
      setCurrentPage(1);
    } else if (targetPage > Math.ceil(data.length / 12)) {
      setCurrentPage(Math.ceil(data.length / 12));
    } else {
      setCurrentPage(targetPage);
    }
  }

  function handlePageChange(targetPage: number) {
    setCurrentPage(targetPage);
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    const start = (currentPage - 1) * 12;
    const end = start + 12;
    setPagedData(data.slice(start, end));
  }, [currentPage]);

  return (
    <MarketPageContainer>
      <Wrapper>
        <Title>Market</Title>
        <Notice>
          <span>
            In the market community, you can use the secret comment function
            {`\n`}
            when sharing sensitive information related to transaction
          </span>
        </Notice>

        <TagAndSearch>
          <TagList
            tags={tags}
            selectedTag={selectedTag}
            onClickTag={onClickTag}
          />
          <SearchBar
            search={search}
            searchType={searchType}
            onChangeSearch={onChangeSearch}
            onChangeSearchType={onChangeSearchType}
          />
        </TagAndSearch>

        <MakrketList pagedData={pagedData} />

        <BottomWrapper>
          <PaginationBox>
            <button onClick={() => handleDirectionBtn(currentPage - 1)}>
              {'<'}
            </button>
            {Array.from({ length: Math.ceil(data.length / 12) }, (_, idx) => (
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

          <WriteButton onClick={() => navigate('write')}>Write</WriteButton>
        </BottomWrapper>
      </Wrapper>
    </MarketPageContainer>
  );
}

const MarketPageContainer = styled.div`
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

const Notice = styled.div`
  margin: 2rem 0;
  > span {
    white-space: pre-wrap;
    color: ${({ theme }) => theme.colors.gray400};
    font-family: Pretendard;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: 2rem; /* 125% */
  }
`;

const TagAndSearch = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-top: 2rem;

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
