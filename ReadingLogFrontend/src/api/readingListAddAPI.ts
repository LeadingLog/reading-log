import axios from "axios";
import { ReadingListAddBody } from "../types/readingListAdd.ts";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export async function readingListAddApi(ReadingListAddBody: ReadingListAddBody) {
  const {data} = await axios.post(
    `${serverUrl}/readingrecord/add`, ReadingListAddBody, {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  return data;
}
