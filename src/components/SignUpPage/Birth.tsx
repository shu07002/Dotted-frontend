import { useEffect, useState } from 'react';
import InputBox from './InputBox';
import Label from './Label';
import BirthSVG from '@/assets/svg/SignUpPage/BirthSVG.svg?react';
import { getDaysInMonth, months, years } from '@/utils/dateUtils';
import styled from 'styled-components';
import { SignUpFormData } from '@/types/signUpFormData';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface BirthProps {
  setValue: UseFormSetValue<SignUpFormData>;
  register: UseFormRegister<SignUpFormData>;
}

export default function Birth({ setValue, register }: BirthProps) {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  useEffect(() => {
    if (year && month && day) {
      const formattedBirth = `${year}${month.padStart(2, '0')}${day.padStart(2, '0')}`;
      setValue('birth', formattedBirth);
    }
  }, [year, month, day]);

  return (
    <InputBox>
      <Label name="birth">
        <BirthSVG /> <span>Birth</span>
      </Label>
      <input
        type="hidden"
        {...register('birth', { required: 'Please select yout birthday' })}
      />
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
        <Select value={day} onChange={(e) => setDay(e.target.value)}>
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
  padding: 0 0.5rem;
  min-width: 80px;
  width: 100%;
  height: 50px;
  flex-shrink: 0;
  flex: 1;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.gray700};
  background: ${({ theme }) => theme.colors.backgroundLayer2};
  color: ${({ theme }) => theme.colors.gray700};
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 36px; /* 180% */
  letter-spacing: -0.6px;
  @media (max-width: 460px) {
    font-size: 1.4rem;
    padding-right: 0.1rem;
  }
`;
