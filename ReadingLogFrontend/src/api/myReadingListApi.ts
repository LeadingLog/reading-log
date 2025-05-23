import axios from 'axios';
import { fetchMyReadingListParams } from "../types/myReadingList.ts";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const fetchMyReadingList = async ({ userId, tabType, page, size }: fetchMyReadingListParams) => {

  try {
    const { data } = await axios.get(
      `${serverUrl}/readinglist/readingList`,
      {
        params: {
          userId: userId, // 실제 로그인 유저 ID로 교체 필요
          tabType: tabType,
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