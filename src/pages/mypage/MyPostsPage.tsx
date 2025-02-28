import CommunityPosts from '@/components/mypage/my-post/CommunityPosts';
import MarketPosts from '@/components/mypage/my-post/MarketPosts';
import { useState } from 'react';
import styled from 'styled-components';

export default function MyPostsPage() {
  const [selectedTab, setSelectedTab] = useState('community');
  function handleTabClick(tab: 'community' | 'market') {
    setSelectedTab(tab);
  }
  return (
    <Main>
      <h1>My Posts</h1>
      <nav>
        <div
          onClick={() => handleTabClick('community')}
          className={selectedTab === 'community' ? 'selected' : ''}
        >
          Community
        </div>
        <div
          onClick={() => handleTabClick('market')}
          className={selectedTab === 'market' ? 'selected' : ''}
        >
          Market
        </div>
        <p className={selectedTab === 'market' ? 'market' : ''}></p>
      </nav>
      {selectedTab === 'community' && <CommunityPosts />}
      {selectedTab === 'market' && <MarketPosts />}
    </Main>
  );
}

const Main = styled.main`
  > h1 {
    color: ${({ theme }) => theme.colors.gray700};
    font-size: 3.2rem;
    font-weight: 700;
    letter-spacing: -0.8px;
    @media (max-width: 768px) {
      display: none;
    }
  }

  > nav {
    display: flex;
    justify-content: flex-start;
    gap: 1.6rem;
    margin-top: 2.4rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
    position: relative;
    > p {
      width: 8rem;
      height: 2px;
      background-color: ${({ theme }) => theme.colors.purple600};
      position: absolute;
      bottom: -1px;
      left: 0;
      transition: left 0.3s;
      &.market {
        left: 8rem;
      }
    }
    > div {
      width: 8rem;
      color: ${({ theme }) => theme.colors.gray500};
      font-size: 1.6rem;
      font-weight: 500;
      letter-spacing: -0.4px;
      cursor: pointer;
      padding-bottom: 1.2rem;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: ${({ theme }) => theme.colors.gray600};
        }
      }

      &.selected {
        color: ${({ theme }) => theme.colors.purple600};
      }
    }
  }
`;
