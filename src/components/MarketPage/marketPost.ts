import { MarketPost } from '@/types/MarketPost';

export const marketPost: MarketPost[] = [
  {
    id: 1,
    img: 'https://via.placeholder.com/150',
    tag: 'On Sale',
    title: 'Wireless Earbuds',
    createdAt: '2024-02-10',
    price: '$79.99',
    writer: 'Alice',
    comment_count: 5,
    scrap_count: 12,
    content: 'High-quality wireless earbuds with noise cancellation.'
  },
  {
    id: 2,
    img: 'https://via.placeholder.com/150',
    tag: 'Sold Out',
    title: "Men's Leather Wallet",
    createdAt: '2024-02-09',
    price: '$29.99',
    writer: 'Bob',
    comment_count: 3,
    scrap_count: 7,
    content: 'Genuine leather wallet with RFID protection.'
  },
  {
    id: 3,
    img: 'https://via.placeholder.com/150',
    tag: 'On Sale',
    title: 'Non-Stick Frying Pan',
    createdAt: '2024-02-08',
    price: '$49.99',
    writer: 'Charlie',
    comment_count: 2,
    scrap_count: 5,
    content: 'Durable non-stick frying pan for everyday cooking.'
  },
  {
    id: 4,
    img: 'https://via.placeholder.com/150',
    tag: 'Sold Out',
    title: 'The Art of Clean Code',
    createdAt: '2024-02-07',
    price: '$19.99',
    writer: 'Dave',
    comment_count: 6,
    scrap_count: 10,
    content: 'A must-read book for software developers on writing clean code.'
  },
  {
    id: 5,
    img: 'https://via.placeholder.com/150',
    tag: 'On Sale',
    title: 'Remote Control Car',
    createdAt: '2024-02-06',
    price: '$39.99',
    writer: 'Eve',
    comment_count: 4,
    scrap_count: 9,
    content: 'Fast and durable remote control car for kids and adults.'
  }
  // 나머지 객체들도 동일한 방식으로 추가
];
