import axios from 'axios';

// 알라딘 API 호출 함수
export const fetchBooks = async (userId: number | null, query: string, order?: number) => {
  if (!query.trim()) return null; // 빈 문자열 방지

  const response = await axios.get( 'https://api-readinglog.duckdns.org/books/search', {
    params: {
      userId: userId,
      query: query,
      start: order,
    },
  } );

  return response.data;
};