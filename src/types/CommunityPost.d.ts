export interface CommunityPost {
  count: number;
  next: string;
  prev: string;
  results: EachPost[];
}

export interface EachPost {
  id: number;
  writer_id: number;
  writer_nickname: string;
  tag: string;
  created_at: string;
  title: string;
  like_count: number;
  view_count: number;
  comment_count: number;
}
