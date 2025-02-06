import { useState } from 'react';
import InputBox from './InputBox';
import Label from './Label';
import BirthSVG from '@/assets/svg/SignUpPage/BirthSVG.svg?react';
import { getDaysInMonth, months, years } from '@/utils/dateUtils';
import styled from 'styled-components';

export default function Birth() {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  return (
    <InputBox>
      <Label name="birth">
        <BirthSVG /> <span>Birth</span>
      </Label>
      <BirthSelectWrapper>
        {/* 연도 선택 */}
        <Select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="">Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>

        {/* 월 선택 */}
        <Select value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value="">Month</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </Select>

        {/* 일 선택 (연도 & 월 반영) */}
        <Select>
          <option value="">Day</option>
          {Array.from({ length: getDaysInMonth(year, month) }, (_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </Select>
      </BirthSelectWrapper>
    </InputBox>
  );
}

const BirthSelectWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Select = styled.select`
  padding: 0 1rem;
  width: 104px;
  height: 50px;
  flex-shrink: 0;
  flex: 1;
  border-radius: 5px;
  border: 1px solid var(--Gray-Gray_light-gray-700_light, #464646);
  background: var(--Background-Background_light-Layer-2_light, #fff);
  color: var(--Gray-Gray_light-gray-700_light, #464646);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 36px; /* 180% */
  letter-spacing: -0.6px;
`;
