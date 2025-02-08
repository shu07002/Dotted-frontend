import TagList from '@/components/CommunityPage/TagList';
import { useState } from 'react';
import styled from 'styled-components';

import Magnifier from '@/assets/svg/CommunityPage/Magnifier.svg?react';

export default function CommunityPage() {
  const [selectedTag, setSelectedTag] = useState('All');

  const onClickTag = (tag: string) => {
    setSelectedTag(tag);
  };

  return (
    <CommunityPageContainer>
      <Wrapper>
        <Title>Community</Title>

        <TagAndSearch>
          <TagList selectedTag={selectedTag} onClickTag={onClickTag} />
          <SearchBar>
            <Filter>
              <option value="all">All</option>
              <option value="title">Title</option>
              <option value="content">Content</option>
            </Filter>
            <Cross />
            <ContentInputWrapper>
              <label htmlFor="content"></label>
              <input type="text" name="content" placeholder="search" />
              <Magnifier />
            </ContentInputWrapper>
          </SearchBar>
        </TagAndSearch>
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

const SearchBar = styled.div`
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
  > input {
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
