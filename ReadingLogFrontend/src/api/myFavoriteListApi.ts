import axios from 'axios';
import { fetchMyFavoriteListParams } from "../types/myFavoriteList.ts";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const fetchMyFavoriteList = async ({ userId, tabType, page, size }: fetchMyFavoriteListParams) => {

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
};