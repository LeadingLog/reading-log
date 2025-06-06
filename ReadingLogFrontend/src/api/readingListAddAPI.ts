import axios from "axios";
import { ReadingListAddApiRequestBody } from "../types/readingListAdd.ts";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export async function readingListAddApi(ReadingListAddApiRequestBody: ReadingListAddApiRequestBody) {
  const { data } = await axios.post(
    `${serverUrl}/readinglist/add`, ReadingListAddApiRequestBody, {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  return data;
}
