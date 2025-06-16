import axios from 'axios';
import { fetchMyReadingListParams } from "../types/myReadingList.ts";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const fetchMyReadingListSearch = async ({ userId, MyReadingListTabType, query }: fetchMyReadingListParams) => {

  const { data } = await axios.get(
    `${serverUrl}/readinglist/search`,
    {
      params: {
        userId: userId, // 실제 로그인 유저 ID로 교체 필요
        tabType: MyReadingListTabType,
        query: query
      },
    }
  );

  return data; // API 응답 반환
};