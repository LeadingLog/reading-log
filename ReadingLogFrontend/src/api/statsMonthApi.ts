import axios from 'axios';
import { fetchStatsMonthApiParams } from "../types/statsMonth.ts";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const fetchStatsMonthApi = async ({ userId, year, month }: fetchStatsMonthApiParams) => {
  const { data } = await axios.get(
    `${serverUrl}/api/readingrecord/stats/time/yymm/book_id`,
    {
      params: {
        userId: userId, // 실제 로그인 유저 ID로 교체 필요
        year: year,
        month: month
      },
    }
  );

  return data; // API 응답 반환
};