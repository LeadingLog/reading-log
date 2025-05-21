import axios from 'axios';

// 알라딘 API 호출 함수
export const fetchBooks = async ( userId: number, query: string, order?: number) => {
  if (!query.trim()) return null; // 빈 문자열 방지

  try {
    const response = await axios.get('https://api-readinglog.duckdns.org/books/search', {
      params: {
        userId: userId,
        query: query,
        start: order,
      },
    });


    // 응답 구조: { success: true, data: "<JSON 문자열>" }
     // <-- 문자열을 객체로 변환
    return JSON.parse(response.data.data); // 이제 진짜 JSON 객체
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    throw error; // 오류를 던져서 호출한 곳에서 처리하도록 함
  }
};