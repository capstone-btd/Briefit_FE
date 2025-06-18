import React, { useState } from "react";

export default function NewsContent({
  body,
  highlightColor,
  themeTextColor1,
  activeIcon,
}: {
  body: string;
  highlightColor?: string | null;
  themeTextColor1?: string | null;
  activeIcon?: string | null;
}) {
  const highlights = `bg-${highlightColor}`;
  const [highlightRanges, setHighlightRanges] = useState<
    { start: number; end: number }[]
  >([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);

  // activeIcon이 'highlight'인 경우에만 형광펜 기능 활성화
  const isHighlightMode = activeIcon === "highlighter";
  const isEraserMode = activeIcon === "eraser";

  const handleMouseDown = (index: number) => {
    if (!isHighlightMode && !isEraserMode) return;

    setIsDragging(true);
    setDragStart(index);
    // 클릭만해도 한글자씩 하이라이팅
    // handleHighlight(index, index);
  };

  const handleMouseEnter = (index: number) => {
    if (!isHighlightMode && !isEraserMode) return;

    if (isDragging && dragStart !== null) {
      const start = Math.min(dragStart, index);
      const end = Math.max(dragStart, index);
      handleHighlight(start, end);
    }
  };

  const handleMouseUp = () => {
    if (!isHighlightMode && !isEraserMode) return;

    setIsDragging(false);
    setDragStart(null);
  };

  const handleHighlight = (start: number, end: number) => {
    if (isEraserMode) {
      // 지우개 모드: 해당 범위의 하이라이트 제거
      const newRanges = highlightRanges.filter(
        (range) =>
          !(start <= range.end && end >= range.start) &&
          !(range.start <= end && range.end >= start),
      );
      setHighlightRanges(newRanges);
    } else {
      // 하이라이트 모드: 기존 로직 유지
      const newRanges = [...highlightRanges];
      const overlappingIndex = newRanges.findIndex(
        (range) =>
          (start <= range.end && end >= range.start) ||
          (range.start <= end && range.end >= start),
      );

      if (overlappingIndex >= 0) {
        // 겹치는 범위가 있으면 병합
        const existing = newRanges[overlappingIndex];
        newRanges[overlappingIndex] = {
          start: Math.min(existing.start, start),
          end: Math.max(existing.end, end),
        };
      } else {
        // 새로운 범위 추가
        newRanges.push({ start, end });
      }

      setHighlightRanges(newRanges);
    }
  };

  return (
    <div
      className={`mb-55 font-basic-20-m ${themeTextColor1 ?? ""}`}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {body.split("").map((char, index) => {
        const isHighlighted = highlightRanges.some(
          (range) => index >= range.start && index <= range.end,
        );
        return (
          <span
            key={index}
            className={`inline-block ${isHighlighted ? highlights : ""} whitespace-pre-line`}
            onMouseDown={() => handleMouseDown(index)}
            onMouseEnter={() => handleMouseEnter(index)}
          >
            {/* 공백, 줄바꿈 처리 */}
            {char === " " ? "\u00A0" : char === "\n" ? <br /> : char}
          </span>
        );
      })}
    </div>
  );
}
