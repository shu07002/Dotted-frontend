export interface MarketPost {
  count: number;
  next: string;
  previous: string;
  results: EachMarketPost[];
}

export interface EachMarketPost {
  id: number;
  writer_id: number;
  writer_nickname: string;
  created_at: string;
  title: string;
  price: number;
  status: string;
  thumbnail: string;
}
