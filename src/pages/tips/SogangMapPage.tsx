import CafeIcon from '@/assets/svg/tips/sogang-map/cafe.svg?react';
import PrinterIcon from '@/assets/svg/tips/sogang-map/printer.svg?react';
import BookIcon from '@/assets/svg/tips/sogang-map/book.svg?react';
import HospitalIcon from '@/assets/svg/tips/sogang-map/hospital.svg?react';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import KakaoMap from '@/components/tips/sogang-map/KakaoMap';
import SearchBox from '@/components/tips/sogang-map/SearchBox';
import { useTheme } from '@/context/ThemeContext';
import BackIcon from '@/assets/svg/tips/culture/back.svg?react';

export default function SogangMapPage() {
  const [_, setSearchParams] = useSearchParams();
  const [modalOpen, setModalOpen] = useState(false);
  const {} = useTheme();
  const navigate = useNavigate();

  const handleTabClick = (spot: string) => {
    setSearchParams({ spot: spot });
    setModalOpen(false);
  };

  return (
    <Main>
      <LocationTab>
        <div className="backbox" onClick={() => navigate('/')}>
          <BackIcon className="back" />
        </div>
        <div className="title">Sogang Map</div>
        <SearchBox />
        <LocationElement className="all" onClick={() => handleTabClick('all')}>
          All
        </LocationElement>
        <LocationElement
          className="study"
          onClick={() => handleTabClick('study')}
        >
          <BookIcon /> <span>study spot</span>
        </LocationElement>
        <LocationElement
          className="cafe"
          onClick={() => handleTabClick('cafe')}
        >
          <CafeIcon />
          <span>cafeteria</span>
        </LocationElement>
        <LocationElement
          className="printer"
          onClick={() => handleTabClick('printer')}
        >
          <PrinterIcon />
          <span>printer</span>
        </LocationElement>
        <LocationElement
          className="health"
          onClick={() => handleTabClick('health')}
        >
          <HospitalIcon />
          <span>health center</span>
        </LocationElement>
      </LocationTab>
      <div className="mapWrapper">
        <KakaoMap modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </div>
    </Main>
  );
}

const Main = styled.main`
  overflow-x: hidden;
  width: 100%;
  height: 100svh;
  display: flex;
  flex-direction: column;
  position: relative;
  /* margin-top: 5rem; */

  .mapWrapper {
    width: 100vw;
    height: 100%;
  }
`;

const LocationTab = styled.ul`
  width: 100vw;
  z-index: 50;
  position: absolute;
  top: 1rem;
  left: 5px;
  display: flex;
  align-items: center;
  gap: 1rem;
  list-style: none;
  font-size: 1.6rem;
  flex-wrap: wrap;
  /* overflow-x: hidden; */
  @media (max-width: 900px) {
    top: 1rem;
  }

  svg {
    &.back {
      width: 2rem;
      height: 2rem;
      stroke-width: 4;
      cursor: pointer;
      transition: transform 0.3s;
      @media (max-width: 400px) {
        width: 6vw;
        height: 6vw;
      }
      path {
        stroke: ${({ theme }) => theme.colors.purple700};
      }
    }
  }

  div {
    &.backbox {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 5.2rem;
      height: 5rem;
      border-radius: 2.5rem;
      cursor: pointer;
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
      background-color: ${({ theme }) => theme.colors.backgroundLayer2};
    }
    &.title {
      font-size: 2.6rem;
      font-weight: 800;
      color: ${({ theme }) => theme.colors.purple600};
      letter-spacing: -0.8px;
      @media (max-width: 400px) {
        display: none;
      }
    }
  }
`;

const LocationElement = styled.li`
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  overflow: hidden;
  max-width: 8rem;
  height: 5rem;
  background-color: ${({ theme }) => theme.colors.backgroundLayer1};
  color: ${({ theme }) => theme.colors.gray50};
  border-radius: 2.5rem;
  padding: 1.2rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  letter-spacing: -0.5px;
  transition:
    color 0.3s,
    background-color 0.3s,
    max-width 1s;
  svg path {
    stroke-width: 2;
    stroke: ${({ theme }) => theme.colors.gray50};
  }
  &.search {
    padding: 0.5rem 2rem;
    svg path {
      stroke: none;
      fill: ${({ theme }) => theme.colors.purple600};
    }
  }
  @media (hover: hover) and (pointer: fine) {
    &:not(.search):hover {
      max-width: 25rem;
    }
  }

  svg {
    width: 1.8rem;
    height: 1.8rem;
    stroke-width: 2;
    flex-shrink: 0;
  }
  path {
    transition: stroke 0.3s;
  }
  span {
    margin-left: 0.5rem;
    display: none;
    opacity: 0;
    transition-delay: 0.5s;
    transition:
      opacity 0.2s,
      visibility 0.2s,
      display 0.2s;
    flex-shrink: 0;
  }
  @media (hover: hover) and (pointer: fine) {
    &:hover > span {
      display: inline;
      opacity: 1;
    }
  }

  &:active {
    scale: 0.9;
  }
  &.all {
    background-color: ${({ theme }) => theme.colors.purple450};
  }
  &.study {
    background-color: ${({ theme }) => theme.colors.purple600};
  }
  &.cafe {
    background-color: ${({ theme }) => theme.colors.purple850};
  }
  &.printer {
    background-color: ${({ theme }) => theme.colors.purple950};
  }
  &.health {
    background-color: ${({ theme }) => theme.colors.purple1000};
  }
`;
