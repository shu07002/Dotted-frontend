import styled from 'styled-components';
import SearchIcon from '@/assets/svg/tips/sogang-map/search.svg?react';
import { useEffect, useState } from 'react';
import { BuildsDataType } from './KakaoMap';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const fetchBuildings = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_DOMAIN}/api/campus/building`
  );
  return response.json();
};

export default function SearchBox() {
  const [isFocused, setIsFocused] = useState(false);
  const [_, setBuildingsData] = useState([]);
  const [buildingNames, setBuildingNames] = useState([]);
  const [filteredBuildingNames, setFilteredBuildingNames] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [__, setSearchValue] = useState('');
  const { data, isLoading, error } = useQuery({
    queryKey: ['buildings'],
    queryFn: fetchBuildings
  });

  if (error) {
    alert('error');
  }

  useEffect(() => {
    if (data && !isLoading) {
      setBuildingsData(data);
      const names = data.map((building: BuildsDataType) => ({
        name: building.name,
        building_id: building.id
      }));
      setBuildingNames(names);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (searchParams.get('search')) {
      setSearchValue(buildingNames[parseInt(searchParams.get('search')!) - 1]);
    }
  }, [searchParams]);

  const handleInputFocus = () => {
    setIsFocused(true);
  };
  const handleInputBlur = () => {
    setTimeout(() => setIsFocused(false), 200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    if (value === '') {
      setFilteredBuildingNames([]);
      return;
    }
    const filtered = buildingNames.filter(
      (building: { name: string; building_id: number }) =>
        building.name.toLowerCase().includes(value)
    );
    setFilteredBuildingNames(filtered.slice(0, 5));
  };

  const handleSearchedClick = (building_id: number) => {
    setIsFocused(false);
    setSearchParams({ search: building_id.toString() });
  };

  return (
    <Wrapper>
      {!isLoading && (
        <InputBox
          style={{ borderRadius: isFocused ? '2.5rem 2.5rem 0 0' : '6.5rem' }}
          className="search"
        >
          <SearchIcon className="search-icon" />
          <input
            onChange={(e) => handleInputChange(e)}
            onFocus={() => handleInputFocus()}
            onBlur={() => handleInputBlur()}
            type="text"
            placeholder="search..."
            //   value={searchValue}
          />
        </InputBox>
      )}
      {isFocused && (
        <ResultBox>
          {filteredBuildingNames.length > 0 ? (
            filteredBuildingNames.map(
              (
                building: { name: string; building_id: number },
                key: number
              ) => (
                <li
                  key={key}
                  onClick={() => handleSearchedClick(building.building_id)}
                >
                  {building.name}
                </li>
              )
            )
          ) : (
            <NotSearched>No Result</NotSearched>
          )}
        </ResultBox>
      )}
    </Wrapper>
  );
}

const NotSearched = styled.span`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray900};
  padding: 1rem 2rem;
  font-size: 1.4rem;
  font-weight: 400;
`;

const ResultBox = styled.ul`
  background-color: ${({ theme }) => theme.colors.backgroundLayer2};
  position: absolute;
  top: 5rem;
  left: 0;
  width: 100%;
  max-height: 25rem;
  border-radius: 0 0 2.5rem 2.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.gray200};
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  overflow-y: auto;
  li {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    color: ${({ theme }) => theme.colors.gray900};
    padding: 1.5rem 2rem;
    cursor: pointer;
    border-radius: 0;
    &:hover {
      background-color: ${({ theme }) => theme.colors.gray200};
    }
  }
`;

const InputBox = styled.li`
  width: fit-content;
  height: 5rem;
  background-color: ${({ theme }) => theme.colors.backgroundLayer2};
  color: var(--hover-text);
  border-radius: 2.5rem;
  padding: 1.2rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  letter-spacing: -0.5px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  input {
    background: none;
    border: none;
    height: 100%;
    padding: 0;
    &:focus {
      border: none;
      outline: none;
      box-shadow: none;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  position: relative;
`;
