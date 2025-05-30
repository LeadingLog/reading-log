import axios from 'axios';
import { fetchStatsYearApiParams } from "../types/statsYear.ts";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const fetchStatsYearApi = async ({ userId, year }: fetchStatsYearApiParams) => {
  return await axios.get(
    `${serverUrl}/api/readingrecord/stats/time/yylist`,
    {
      params: {
        userId: userId, // 실제 로그인 유저 ID로 교체 필요
        year: year,
      },
    }
  );
};