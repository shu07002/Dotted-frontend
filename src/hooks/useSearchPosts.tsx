import { CommunityPost } from '@/types/CommunityPost';
import { MarketPost } from '@/types/MarketPost';
import { useMutation } from '@tanstack/react-query';

interface SearchPostsParams {
  name: string; // 'market' 또는 'community'
  keyword: string;
  searchType: string;
  tag?: string; // 커뮤니티 게시글 검색 시 사용
  status?: string; // 마켓 게시글 검색 시 사용
  page: number;
}

const fetchPosts = async ({
  name,
  keyword,
  searchType,
  tag,
  status,
  page
}: SearchPostsParams): Promise<CommunityPost | MarketPost> => {
  const queryParams = new URLSearchParams();
  const accessToken = localStorage.getItem('accessToken');
  const apiLink = { url: 'posting' };

  if (keyword) queryParams.append('keyword', keyword);
  if (searchType) queryParams.append('search_type', searchType);
  if (page) queryParams.append('page', page.toString());

  if (name === 'market') {
    apiLink.url = 'posting/market';
    if (status) queryParams.append('status', status); // 마켓의 경우 status 사용
  } else {
    if (tag && tag !== 'All') queryParams.append('tag', tag); // 커뮤니티의 경우 tag 사용
  }

  console.log(queryParams.toString());
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
