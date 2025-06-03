import axios from 'axios';
import { fetchTimeLineReadingListParams } from "../types/timeLine.ts";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const fetchTimeLineReadingList = async ({ userId, year } : fetchTimeLineReadingListParams) => {

  try {
    const { data } = await axios.get(
      `${serverUrl}/readinglist/timeline/yymm`,
      {
        params: {
          userId: userId, // 실제 로그인 유저 ID로 교체 필요
          year: year,
        },
      }
    );

    return data; // API 응답 반환
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    throw error; // 오류를 던져서 호출한 곳에서 처리하도록 함
  }
};