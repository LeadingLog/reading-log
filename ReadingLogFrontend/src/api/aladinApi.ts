import axios from 'axios';

// 알라딘 API 호출 함수
export const fetchBooks = async (query: string) => {
  if (!query.trim()) return null; // 빈 문자열 방지

  try {
    const { data } = await axios.get('/api/aladin/ItemSearch.aspx', {
      params: {
        ttbkey: import.meta.env.VITE_ALADIN_API, // 환경변수에서 API 키 가져오기
        Query: query,
        MaxResults: 10,
        start: 1,
        Cover: 'Big',
        SearchTarget: 'Book',
        output: 'js',
        Version: '20131101',
      },
    });

    return data; // API 응답 반환
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    throw error; // 오류를 던져서 호출한 곳에서 처리하도록 함
  }
};
