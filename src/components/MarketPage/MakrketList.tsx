import { MarketPost } from '@/types/MarketPost';
import styled from 'styled-components';

interface MarketListProps {
  pagedData: MarketPost[];
}

export default function MakrketList({ pagedData }: MarketListProps) {
  return (
    <MarketListContainer>
      <ul>
        {pagedData.map((post) => (
          <li key={post.id}>
            <MarketImageWrapper>image</MarketImageWrapper>
            <ItemInfo>
              <span>{post.title}</span>
              <div>
                <span>{post.price}</span>
                <span>{post.createdAt}</span>
              </div>
            </ItemInfo>
          </li>
        ))}
      </ul>
    </MarketListContainer>
  );
}

const MarketListContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  > ul {
    margin-top: 2rem;
    width: 100%;
    display: grid;
    flex: 1;
    justify-content: space-between;
    grid-template-columns: repeat(auto-fit, minmax(20%, auto));
    grid-gap: 2rem;

    @media (max-width: 1200px) {
      grid-template-columns: repeat(auto-fit, 30%);
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 47.5%);
    }

    > li {
      cursor: pointer;
      aspect-ratio: 0.7;
      display: flex;
      flex-direction: column;

      border-radius: 16px;
      border: 1px solid ${({ theme }) => theme.colors.backgroundBase};
      background: ${({ theme }) => theme.colors.backgroundLayer2};

      > div {
      }
    }
  }
`;

const MarketImageWrapper = styled.div`
  width: 100%;
  height: 70%;
  background-color: skyblue;
  border-radius: 16px 16px 0 0;
`;

const ItemInfo = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  > div {
    display: flex;
    justify-content: space-between;
  }
  > span {
    line-height: 3rem;
    &:first-child {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: ${({ theme }) => theme.colors.gray700};
      font-family: Inter;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      letter-spacing: -1px;
    }

    &:nth-child(2) {
      color: ${({ theme }) => theme.colors.gray400};
      font-family: Inter;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 21px; /* 131.25% */
      letter-spacing: -0.8px;
    }
  }
`;
