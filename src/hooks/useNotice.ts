import { useQuery } from '@tanstack/react-query';

export interface EachNoticePost {
  id: number;
  college: number;
  college_name: string;
  question: string;
  answer: string;
  created_at: string;
}

const fetchNotice = async (): Promise<EachNoticePost[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_DOMAIN}/api/campus/faq`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch FAQ data');
  }

  return response.json();
};

export const useNotice = () => {
  return useQuery<EachNoticePost[]>({
    queryKey: ['campus_faq'],
    queryFn: fetchNotice
  });
};
