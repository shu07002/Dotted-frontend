import { CommunityPost } from '@/types/CommunityPost';
import { useMutation } from '@tanstack/react-query';

interface SearchPostsParams {
  keyword: string;
  searchType: string;
  tag: string;
  page: number;
}

const fetchPosts = async ({
  keyword,
  searchType,
  tag,
  page
}: SearchPostsParams): Promise<CommunityPost> => {
  const queryParams = new URLSearchParams();
  const accessToken = localStorage.getItem('accessToken');

  if (keyword) queryParams.append('keyword', keyword);
  if (searchType) queryParams.append('search_type', searchType);
  if (tag !== 'All') queryParams.append('tag', tag);
  if (page) queryParams.append('page', page.toString());

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/posting?${queryParams.toString()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    }
  );

  if (!response.ok) {
    throw new Error(`Error fetching posts: ${response.status}`);
  }

  return response.json();
};

export const useSearchPosts = () => {
  return useMutation<CommunityPost, Error, SearchPostsParams>({
    mutationFn: fetchPosts
  });
};
