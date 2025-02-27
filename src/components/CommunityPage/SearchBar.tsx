import styled from 'styled-components';
import Magnifier from '@/assets/svg/CommunityPage/Magnifier.svg?react';

interface SearchBarProps {
  keyword: string;
  searchType: string;
  onChangeSearch: (e: any) => void;
  onChangeSearchType: (e: any) => void;
  handleSearch: () => void;
}

export default function SearchBar({
  keyword,
  searchType,
  onChangeSearch,
  onChangeSearchType,
  handleSearch
}: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <SearchBarWrapper>
      <Filter onChange={onChangeSearchType} value={searchType}>
        <option value="all">All</option>
        <option value="title">Title</option>
        <option value="content">Content</option>
      </Filter>
      <Cross />
      <ContentInputWrapper>
        <label htmlFor="content">
          <input
            type="text"
            name="content"
            placeholder="Search"
            value={keyword}
            onChange={onChangeSearch}
            onKeyDown={handleKeyDown}
          />
        </label>

        <Magnifier onClick={handleSearch} />
      </ContentInputWrapper>
    </SearchBarWrapper>
  );
}

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.backgroundLayer1};
  margin-bottom: 1.4rem;
  border-radius: 0.5rem 0 0 0.5rem;
`;

const Filter = styled.select`
  cursor: pointer;
  border-radius: 0.5rem 0 0 0.5rem;
  outline: none;

  display: flex;
  color: ${({ theme }) => theme.colors.gray600};
  border: none;
  padding: 1.1rem 2rem 1.1rem 1.1rem;

  background: url('/src/assets/svg/CommunityPage/DropDown.svg') no-repeat 97%
    50%/15px auto;

  -webkit-appearance: none; /* 크롬 화살표 없애기 */
  -moz-appearance: none; /* 파이어폭스 화살표 없애기 */
  appearance: none; /* 화살표 없애기 */

  > option {
    color: ${({ theme }) => theme.colors.gray600};
    font-family: Inter;
    font-size: 1.4rem;
    @media (max-width: 460px) {
      font-size: 1.1rem;
    }
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const Cross = styled.div`
  margin: 0 1rem;
  width: 1px;
  height: 2rem;
  background-color: ${({ theme }) => theme.colors.gray600};
`;

const ContentInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 0 0.5rem 0.5rem 0;
  padding: 1.1rem 2rem 1.1rem 0;
  > label > input {
    width: 100%;
    padding-right: 1rem;
    border-radius: 0 0.5rem 0.5rem 0;
    border: none;
    outline: none;
    background-color: ${({ theme }) => theme.colors.backgroundLayer1};
  }

  > svg {
    cursor: pointer;
    position: absolute;
    right: 1.2rem;
  }
`;
