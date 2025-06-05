import axios from "axios";

// 요청/응답 인터셉트 및 로깅

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.defaults.withCredentials = true;

// 요청 인터셉터
api.interceptors.request.use(
    (config) => {
    const auth_header = config.headers["x-auth-not-required"];
        if (auth_header) return config;
        
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 요청 로그
    console.log(
      `🚀 [Request] ${config.method?.toUpperCase()} ${config.url}`,
      config,
    );

    return config;
  },
  (error) => {
    console.error("❌ [Request Error]", error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
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

      if (status >= 400 && status < 500) {
        // 클라이언트 에러 -> 예외 처리 가능
        console.error(`[❌ Error] ${status} ${config.url}`, data);
      } else if (status >= 500) {
        // 서버 에러
        console.error(`[❌ Server Error] ${status} ${config.url}`, data);
      }
    } else if (error.request) {
      console.error("[❌ No Response]", error.request);
    } else {
      console.error("[❌ Axios Config Error]", error.message);
    }
    return Promise.reject(error); // 이후 catch문에서 처리
  },
);

export default api;
