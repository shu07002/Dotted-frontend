// useSearchPosts.ts
import { CommunityPost } from '@/types/CommunityPost';
import { MarketPost } from '@/types/MarketPost';
import { fetchWithAuth } from '@/utils/auth';
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
  const apiLink = { url: 'posting' };

  if (keyword) queryParams.append('keyword', keyword);
  if (searchType) queryParams.append('search_type', searchType);
  if (page) queryParams.append('page', page.toString());

  if (name === 'market') {
    apiLink.url = 'posting/market';
    if (status) queryParams.append('status', status);
  } else {
    if (tag && tag !== 'All') queryParams.append('tag', tag);
  }

  console.log(queryParams.toString());
  const url = `${import.meta.env.VITE_API_DOMAIN}/${apiLink.url}?${queryParams.toString()}`;

  // fetchWithAuth를 사용하여 401 발생 시 자동 재발급 및 재시도 처리
  return fetchWithAuth<CommunityPost | MarketPost>(url, {
    method: 'GET'
  });
};

export const useSearchPosts = () => {
  return useMutation<CommunityPost | MarketPost, Error, SearchPostsParams>({
    mutationFn: fetchPosts
  });
};
