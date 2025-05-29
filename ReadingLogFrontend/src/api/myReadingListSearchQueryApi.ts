import axios from 'axios';
import { fetchMyReadingListParams } from "../types/myReadingList.ts";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const fetchMyReadingListSearch = async ({ userId, tabType, query }: fetchMyReadingListParams) => {

  try {
    const { data } = await axios.get(
      `${serverUrl}/readinglist/search`,
      {
        params: {
          userId: userId, // 실제 로그인 유저 ID로 교체 필요
          tabType: tabType,
          query: query
        },
      }
    );

    return data; // API 응답 반환
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    throw error; // 오류를 던져서 호출한 곳에서 처리하도록 함
  }
};