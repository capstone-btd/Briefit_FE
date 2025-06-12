import { ApiException } from "@/exception/apiException";
import axios from "axios";

async function fetchNewsDetail({ id }: { id: number }) { // 수정 필요
  const params = { "article-id": id };
  try {
    const response = await axios.get("/articles", { params });
    return response.data;
  } catch (error) {
    if (error instanceof ApiException) {
      // 예외 처리
    } else {
      console.error(error);
    }
    return;
  }
}
