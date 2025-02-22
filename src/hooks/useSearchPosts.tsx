import { CommunityPost } from '@/types/CommunityPost';
import { MarketPost } from '@/types/MarketPost';
import { useMutation } from '@tanstack/react-query';

interface SearchPostsParams {
  name: string;
  keyword: string;
  searchType: string;
  tag: string;
  page: number;
}

const fetchPosts = async ({
  name,
  keyword,
  searchType,
  tag,
  page
}: SearchPostsParams): Promise<CommunityPost | MarketPost> => {
  const queryParams = new URLSearchParams();
  const accessToken = localStorage.getItem('accessToken');
  const apiLink = { url: 'posting' };

  if (keyword) queryParams.append('keyword', keyword);
  if (searchType) queryParams.append('search_type', searchType);
  if (tag !== 'All') queryParams.append('tag', tag);
  if (page) queryParams.append('page', page.toString());

  if (name === 'market') apiLink.url = 'posting/market';
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/${apiLink.url}?${queryParams.toString()}`,
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
  return useMutation<CommunityPost | MarketPost, Error, SearchPostsParams>({
    mutationFn: fetchPosts
  });
};
