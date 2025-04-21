import axios from 'axios';

// 알라딘 API 호출 함수
// 알라딘 API 직접 호출 함수 (로컬 fallback 용)
export const fetchBooks = async (query: string, order?: number) => {
  if (!query.trim()) return null; // 빈 문자열 방지

  try {
    const { data } = await axios.get('/api/aladin/ItemSearch.aspx', {
      params: {
        ttbkey: import.meta.env.VITE_ALADIN_API, // 환경변수에서 API 키 가져오기
        Query: query,
        MaxResults: 10,
        start: order,
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
// // 알라딘 API 호출 함수 (백엔드 우선, 실패 시 로컬 호출)
// export const fetchBooks = async (query: string, order?: number) => {
//   if (!query.trim()) return null;
//
//   try {
//     const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/book/search`, {
//       params: {
//         query,
//         start: order,
//       },
//       timeout: 2000, // 서버 연결 안 되면 빠르게 fallback
//     });
//
//     return data;
//   } catch (error) {
//     console.warn("서버 연결 실패, 로컬 알라딘 API 직접 호출로 대체합니다.");
//     try {
//       return await fetchBooksFromAladin(query, order);
//     } catch (fallbackError) {
//       console.error('알라딘 API 직접 호출도 실패:', fallbackError);
//       throw fallbackError;
//     }
//   }
// };