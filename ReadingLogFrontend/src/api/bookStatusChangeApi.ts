import axios from "axios";
import { bookStatusChangeBody } from "../types/bookStatusChange.ts";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export async function bookStatusChangeApi(bookStatusChangeBody: bookStatusChangeBody) {
  const { data } = await axios.patch(
    `${serverUrl}/readinglist/update`, bookStatusChangeBody, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    }
  );

  return data;
}