"use client";
import { useEffect, useRef } from "react";

interface AdFitProps {
  unitId: string;
  width: number;
  height: number;
}

export default function KaKaoAdFit({
  unitId,
  width,
  height,
}: AdFitProps) {
  const adLoaded = useRef(false);

  useEffect(() => {
    if (adLoaded.current) return; // 중복 방지
    adLoaded.current = true;

    // 광고 컨테이너 생성
    const adContainer = document.createElement("ins");
    adContainer.className = "kakao_ad_area";
    adContainer.style.display = "none";
    adContainer.setAttribute("data-ad-unit", unitId);
    adContainer.setAttribute("data-ad-width", width.toString());
    adContainer.setAttribute("data-ad-height", height.toString());

    // 스크립트 생성
    const script = document.createElement("script");
    script.async = true;
    script.src = "//t1.daumcdn.net/kas/static/ba.min.js";

    // DOM에 추가
    const wrapper = document.querySelector(".adfit-wrapper");
    if (wrapper) {
      wrapper.appendChild(adContainer);
      wrapper.appendChild(script);
    }
  }, [unitId, width, height]);

  return <div className="adfit-wrapper" style={{ textAlign: "center" }} />;
}