// src/utils/dateUtils.ts

// 해당 연도와 월의 마지막 날짜를 반환하는 함수
export const getDaysInMonth = (
  year: string | number,
  month: string | number
): number => {
  if (!year || !month) return 31; // 기본값 (선택되지 않은 경우 31일)

  const monthIndex = Number(month) - 1; // JS에서 월은 0부터 시작
  const lastDay = new Date(Number(year), monthIndex + 1, 0).getDate();
  return lastDay;
};

// 연도 목록 (1975~2024 예제)
export const years = Array.from({ length: 50 }, (_, i) =>
  (1975 + i).toString()
);

// 월 목록 (1~12월)
export const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
