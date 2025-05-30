import axios from 'axios';
import { fetchThisMonthReadingListParams } from "../types/monthReadingList.ts";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const fetchThisMonthReadingList = async ({
                                                  userId,
                                                  year,
                                                  month,
                                                  page,
                                                  size
                                                }: fetchThisMonthReadingListParams) => {

  const { data } = await axios.get(
    `${serverUrl}/readinglist/yymm`,
    {
      params: {
        userId: userId, // 실제 로그인 유저 ID로 교체 필요
        year: year,
        month: month,
        page: page,
        size: size
      },
    }
  );

  return data; // API 응답 반환
};