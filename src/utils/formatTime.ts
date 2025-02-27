export function formatRelativeTime(timestamp: string): string {
  const date: Date = new Date(timestamp);
  const now: Date = new Date();
  const diff: number = now.getTime() - date.getTime();

  // 1분(60초) 미만이면 "now"로 표시
  if (diff < 60000) {
    return 'now';
  }

  // 1시간(3600초) 미만이면 분 단위로 표시
  if (diff < 3600000) {
    const minutes: number = Math.floor(diff / (1000 * 60));
    return `${minutes}m ago`;
  }

  // 1시간 이상 1일 미만이면 시간 단위로 표시
  if (diff < 86400000) {
    const hours: number = Math.floor(diff / (1000 * 60 * 60));
    return `${hours}h ago`;
  }

  // 1일 이상이면 날짜로 표시 (작성일: YYYY-MM-DD)
  const year: number = date.getFullYear();
  const month: string = String(date.getMonth() + 1).padStart(2, '0');
  const day: string = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
