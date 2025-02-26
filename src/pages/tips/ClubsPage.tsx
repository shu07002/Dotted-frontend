import styled from 'styled-components';
import AllIcon from '@/assets/svg/tips/clubs/all.svg?react';
import VolunteerIcon from '@/assets/svg/tips/clubs/volunteer.svg?react';
import ArtIcon from '@/assets/svg/tips/clubs/art.svg?react';
import ReligionIcon from '@/assets/svg/tips/clubs/religion.svg?react';
import PEIcon from '@/assets/svg/tips/clubs/pe.svg?react';
import AcademicIcon from '@/assets/svg/tips/clubs/academic.svg?react';
import SocialIcon from '@/assets/svg/tips/clubs/social.svg?react';
import React, { useEffect, useState } from 'react';
import SearchBox from '@/components/tips/clubs/SearchBox';
import ClubsList from '@/components/tips/clubs/ClubsList';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const clubTabs = [
  { name: 'All', src: 'all' },
  { name: 'Volunteer', src: 'volunteer' },
  { name: 'Social Culture', src: 'social' },
  { name: 'Performing Arts', src: 'art' },
  { name: 'Religious', src: 'religion' },
  { name: 'Sports', src: 'pe' },
  { name: 'Academic', src: 'academic' }
];

const clubIcons: Record<string, React.FC> = {
  all: AllIcon,
  volunteer: VolunteerIcon,
  art: ArtIcon,
  religion: ReligionIcon,
  pe: PEIcon,
  academic: AcademicIcon,
  social: SocialIcon
};

export interface ClubData {
  id: number;
  college: number;
  college_name: string;
  name: string;
  photo: string;
  intro: string;
  category: string;
}

const fetchClubs = async (): Promise<ClubData[]> => {
  const res = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/campus/club`);
  if (!res.ok) {
    throw new Error('Failed to fetch clubs');
  }
  return res.json();
};

export default function ClubsPage() {
  const { data: clubs } = useQuery({
    queryKey: ['tipsClubs'],
    queryFn: fetchClubs
  });
  const [searchParam, setSearchParam] = useSearchParams();
  const [filterdData, setFilterdData] = useState<ClubData[]>([]);
  const [inputValue, setInputValue] = useState(''); // 인풋창 값
  const [searchTerm, setSearchTerm] = useState(''); // 실제 검색어

  function handleTabClick(tab: string) {
    setInputValue('');
    setSearchTerm('');
    setSearchParam({ q: tab.toLowerCase() });
  }

  // 엔터 또는 서치 아이콘 클릭 시 실행
  function handleSearch() {
    setSearchParam({ q: 'all' });
    setSearchTerm(inputValue);
  }

  // 초기 탭을 all로 설정
  useEffect(() => {
    setSearchParam({ q: 'all' });
  }, []);

  useEffect(() => {
    if (clubs) {
      let filtered = clubs;
      // 검색어가 존재하면 검색어에 해당하는 클럽들만 필터링 (카테고리 무시)
      if (searchTerm.trim() !== '') {
        filtered = clubs.filter(
          (club) =>
            club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            club.intro.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else {
        // 검색어가 없으면 선택된 카테고리에 따라 필터링 (all인 경우 전체 표시)
        if (searchParam.get('q') !== 'all') {
          filtered = clubs.filter(
            (club: ClubData) =>
              club.category.toLowerCase() === searchParam.get('q')
          );
        }
      }
      setFilterdData(filtered);
    }
  }, [clubs, searchTerm, searchParam]);

  return (
    <Main>
      <HeaderSection>
        <Nav>
          {clubTabs.map((tab, idx) => {
            const isActive = searchParam.get('q') === tab.name.toLowerCase();
            const IconComponent = clubIcons[tab.src];
            return (
              <TabElement key={idx} $active={isActive}>
                <span onClick={() => handleTabClick(tab.name)}>
                  <IconComponent />
                </span>
                <p>{tab.name}</p>
              </TabElement>
            );
          })}
        </Nav>
        {/* SearchBox에 인풋창 값, onChange, onSearch 핸들러 전달 */}
        <SearchBox
          searchValue={inputValue}
          onInputChange={setInputValue}
          onSearch={handleSearch}
        />
        {/* <a target="_blank" rel="noopener noreferrer">
          Download Club Guidebook ⟶
        </a> */}
      </HeaderSection>
      {clubs && <ClubsList filterdData={filterdData} />}
    </Main>
  );
}

const Main = styled.main`
  width: 100%;
  padding: 5rem 24rem 2.6rem 24rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 900px) {
    padding-right: 10rem;
    padding-left: 10rem;
  }
  @media (max-width: 700px) {
    padding-right: 5rem;
    padding-left: 5rem;
  }
  @media (max-width: 480px) {
    padding-right: 2rem;
    padding-left: 2rem;
  }
`;

const HeaderSection = styled.section`
  > a {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    color: ${({ theme }) => theme.colors.gray600};
    text-align: center;
    font-size: 1.4rem;
    font-weight: 400;
    text-decoration-line: underline;
    cursor: pointer;
  }
`;

const Nav = styled.nav`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5rem;
  padding: 2.8rem 0;

  @media (max-width: 900px) {
    gap: 3rem;
  }

  @media (max-width: 480px) {
    gap: 2rem;
  }
`;

const TabElement = styled.div<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;

  > span {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ $active, theme }) =>
      $active ? theme.colors.purple100 : ''};

    &:hover {
      background-color: ${({ theme }) => theme.colors.backgroundLayer1};
      cursor: pointer;
    }

    > svg {
      width: 2.4rem;
      height: 2.4rem;
      path {
        stroke: ${({ $active, theme }) =>
          $active ? theme.colors.purple600 : theme.colors.gray500};
      }

      g {
        path {
          stroke: ${({ $active, theme }) =>
            $active ? theme.colors.purple600 : ''};
        }
      }
    }
  }

  > p {
    text-align: center;
    font-size: 1.5rem;
    font-weight: 400;
    letter-spacing: -0.75px;
    color: ${({ $active, theme }) =>
      $active ? theme.colors.purple600 : theme.colors.gray500};
  }
`;
