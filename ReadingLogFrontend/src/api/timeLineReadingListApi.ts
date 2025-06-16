import axios from 'axios';
import { fetchTimeLineReadingListParams } from "../types/timeLine.ts";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const fetchTimeLineReadingList = async ({ userId, year }: fetchTimeLineReadingListParams) => {

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
};