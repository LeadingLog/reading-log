import axios from 'axios';

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const fetchThisMonthReadingList = async (userId: number, yearMonth?: number, page?: number,size?: number) => {

  try {
    const { data } = await axios.get(
      `${serverUrl}/readinglist/yymm`,
      {
        headers: {
          Authorization: 'Bearer mock-access-token', // 🔐 임시 헤더
        },
        params: {
          userId: userId, // 실제 로그인 유저 ID로 교체 필요
          yearMonth: yearMonth,
          page: page,
          size: size
        },
      }
    );

    return data; // API 응답 반환
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    throw error; // 오류를 던져서 호출한 곳에서 처리하도록 함
  }
};