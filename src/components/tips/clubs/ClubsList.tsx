import styled from 'styled-components';
import { clubData } from './testData';
import { useEffect, useState } from 'react';
// import { useQuery } from '@tanstack/react-query';

// const fetchClubData = async () => {
//   const response = await fetch(
//     `${import.meta.env.VITE_API_DOMAIN}/tips/tips-clubs`
//   );
//   return response.json();
// };

interface ClubData {
  imgUrl: string;
  name: string;
  desc: string;
}

export default function ClubsList() {
  // const {data, loading, error} = useQuery({
  //     queryKey: ['tipsClubs'],
  //     queryFn: fetchClubData
  // })
  const data = clubData;
  const [pagedData, setPagedData] = useState<ClubData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  //pagination 처리
  useEffect(() => {
    const start = (currentPage - 1) * 4;
    const end = start + 4;
    setPagedData(data.slice(start, end));
  }, [currentPage]);

  function handleDirectionBtn(targetPage: number) {
    if (targetPage < 1) {
      setCurrentPage(1);
    } else if (targetPage > Math.ceil(data.length / 4)) {
      setCurrentPage(Math.ceil(data.length / 4));
    } else {
      setCurrentPage(targetPage);
    }
  }

  function handlePageChange(targetPage: number) {
    setCurrentPage(targetPage);
  }

  return (
    <ListWrapper>
      <List>
        {pagedData.map((club: ClubData, idx: number) => (
          <li key={idx}>
            <img src={club.imgUrl} alt="club" />
            <div>
              <h3>{club.name}</h3>
              <p>{club.desc}</p>
            </div>
          </li>
        ))}
      </List>
      <PaginationBox>
        <button onClick={() => handleDirectionBtn(currentPage - 1)}>
          {'<'}
        </button>
        {Array.from({ length: Math.ceil(data.length / 4) }, (_, idx) => (
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
    </ListWrapper>
  );
}

const ListWrapper = styled.div`
  width: 100%;
  margin-top: 1.5rem;
`;

const List = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  li {
    width: inherit;
    height: 17rem;
    background-color: ${({ theme }) => theme.colors.backgroundLayer1};
    border-radius: 1.6rem;
    border: 1px solid ${({ theme }) => theme.colors.gray300};
    padding: 1.5rem;
    display: flex;
    gap: 3rem;

    img {
      width: 14rem;
      height: 14rem;
      flex-shrink: 0;
      border-radius: 1.6rem;
    }

    div {
      display: flex;
      flex-direction: column;
      gap: 1.8rem;
      padding-top: 0.7rem;

      h3 {
        font-size: 2.2rem;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.purple600};
        letter-spacing: -1.2px;
      }

      p {
        font-size: 1.4rem;
        font-weight: 400;
        color: ${({ theme }) => theme.colors.gray500};
        letter-spacing: -0.28px;
        line-height: 1.2;
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
