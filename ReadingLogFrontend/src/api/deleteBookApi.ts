import axios from "axios";
import { DeleteBook } from "../types/deleteBook.ts";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export async function deleteBookApi(DeleteBook: DeleteBook) {
  const { data } = await axios.delete(`${serverUrl}/readinglist/delete`, {
    headers: {
      "Content-Type": "application/json"
    },
    data: DeleteBook
  });

  return data;
}