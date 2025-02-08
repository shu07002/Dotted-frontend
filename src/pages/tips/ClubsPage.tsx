import styled from 'styled-components';
import AllIcon from '@/assets/svg/tips/clubs/all.svg?react';
import VolunteerIcon from '@/assets/svg/tips/clubs/volunteer.svg?react';
import ArtIcon from '@/assets/svg/tips/clubs/art.svg?react';
import ReligionIcon from '@/assets/svg/tips/clubs/religion.svg?react';
import PEIcon from '@/assets/svg/tips/clubs/pe.svg?react';
import AcademicIcon from '@/assets/svg/tips/clubs/academic.svg?react';
import React from 'react';
import SearchBox from '@/components/tips/clubs/SearchBox';
import ClubsList from '@/components/tips/clubs/ClubsList';

const clubTabs = [
  { name: 'All', src: 'all' },
  { name: 'Volunteer', src: 'volunteer' },
  { name: 'Art', src: 'art' },
  { name: 'Religion', src: 'religion' },
  { name: 'P.E', src: 'pe' },
  { name: 'Academic', src: 'academic' }
];

const clubIcons: Record<string, React.FC> = {
  all: AllIcon,
  volunteer: VolunteerIcon,
  art: ArtIcon,
  religion: ReligionIcon,
  pe: PEIcon,
  academic: AcademicIcon
};

export default function ClubsPage() {
  return (
    <Main>
      <HeaderSection>
        <Nav>
          {clubTabs.map((tab, idx) => {
            const IconComponent = clubIcons[tab.src];
            return (
              <TabElement key={idx}>
                <span>{<IconComponent />}</span>
                <p>{tab.name}</p>
              </TabElement>
            );
          })}
        </Nav>
        <SearchBox />
        <a target="_blank">Download Club Guidebook ⟶</a>
      </HeaderSection>
      <ClubsList />
    </Main>
  );
}

const Main = styled.main`
  width: 100%;
  padding: 5rem 24rem 2.6rem 24rem;
  display: flex;
  flex-direction: column;
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
  justify-content: center;
  gap: 5rem;
  padding: 2.8rem 0;
`;

const TabElement = styled.div`
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

    &:hover {
      background-color: ${({ theme }) => theme.colors.backgroundLayer1};
      cursor: pointer;
    }

    > svg {
      width: 2.4rem;
      height: 2.4rem;
      path {
        stroke: ${({ theme }) => theme.colors.gray500};
      }
    }
  }

  > p {
    font-size: 1.5rem;
    font-weight: 400;
    letter-spacing: -0.75px;
    color: ${({ theme }) => theme.colors.gray500};
  }
`;
