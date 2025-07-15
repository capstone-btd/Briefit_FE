import ApiException from "@/exception/apiException";
import axios from "axios";
import { getAccessTokenFromCookies } from "../auth/cookie";

// '서버 컴포넌트용' 요청/응답 인터셉트 및 로깅

// Axios 인스턴스 생성
const apiServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.defaults.withCredentials = true;

// 요청 인터셉터
apiServer.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessTokenFromCookies();

    const skipAuth = config.headers?.["x-auth-not-required"]; // 인증 헤더가 필요 없는 경우

    console.log(`🚀 [Request] ${config.method?.toUpperCase()} ${config.url}`, { // 요청 로그
      config,
    });

    if (skipAuth) {
      return config;
    }

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      console.warn("🔐 [Auth Warning] accessToken이 없습니다.");
    }
    return config;
  },
  (error) => {
    console.error("❌ [Request Error]", error);
    return Promise.reject(error);
  },
);

apiServer.interceptors.response.use(
  (response) => {
    const { status, config, data } = response;
    if (status >= 200 && status < 300) {
      // 성공 응답
      console.log(`💡 [Response] ${status} ${config.url}`, data);
      return response;
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    if (error.response) {
      const { status, config, data } = error.response;
      const url = config?.url || "";

      if (status >= 400 && status < 500) {
        console.error(`[❌ Error] ${status} ${config.url}`, data);
        const customMessage = data?.message || "";
        return Promise.reject(
          new ApiException(customMessage, status, data, url),
        );
      } else if (status >= 500) {
        // 서버 에러
        console.error(`[❌ Server Error] ${status} ${config.url}`, data);
      }
    }
    return Promise.reject(error); // 이후 catch문에서 처리
  },
);

export default apiServer;
