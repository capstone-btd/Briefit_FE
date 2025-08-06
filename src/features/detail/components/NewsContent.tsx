import React from "react";
import type { HighlightInfo } from "@/types/custom/highlightInfo";
import { gethWordDefinition } from "../api/newsWordDefinition";
import { WordDefinition } from "@/types/news/newsWordDefinitionData";
import { X } from "lucide-react";

export default function NewsContent({
  body,
  themeTextColor1,
  activeIcon,
  highlights,
  addHighlight,
  removeHighlight,
  activeHighlightColor,
}: {
  body: string;
  themeTextColor1?: string | null;
  activeIcon?: string | null;
  highlights: HighlightInfo[];
  addHighlight: (start: number, end: number, color: string) => void;
  removeHighlight: (start: number, end: number) => void;
  activeHighlightColor: string;
}) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState<number | null>(null);
  const [dragRange, setDragRange] = React.useState<{
    start: number;
    end: number;
  } | null>(null);

  // 단어 뜻 팝업 상태
  const [wordPopup, setWordPopup] = React.useState<{
    word: string;
    definition: WordDefinition | null;
    position: { x: number; y: number };
    isLoading: boolean;
  } | null>(null);

  // 부모 요소 ref
  const contentRef = React.useRef<HTMLDivElement>(null);

  // activeIcon이 'highlight'인 경우에만 형광펜 기능 활성화
  const isHighlightMode = activeIcon === "highlighter";
  const isEraserMode = activeIcon === "eraser";
  const isCustomMode =
    activeIcon === "highlighter" ||
    activeIcon === "eraser" ||
    activeIcon === "theme";

  const fetchWordDefinition = async (word: string) => {
    const response = await gethWordDefinition(word);
    return response;
  };

  const handleMouseDown = (index: number) => {
    if (!isHighlightMode && !isEraserMode) return;
    setIsDragging(true);
    setDragStart(index);
    setDragRange(null);
  };

  const handleMouseEnter = (index: number) => {
    if (!isHighlightMode && !isEraserMode) return;
    if (isDragging && dragStart !== null) {
      setDragRange({
        start: Math.min(dragStart, index),
        end: Math.max(dragStart, index),
      });
    }
  };

  const handleMouseUp = async () => {
    if (isCustomMode) {
      // 커스텀 모드일 때는 하이라이트/지우개 기능만 동작
      setIsDragging(false);
      if (dragRange) {
        if (isHighlightMode && activeHighlightColor) {
          addHighlight(dragRange.start, dragRange.end, activeHighlightColor);
        } else if (isEraserMode) {
          removeHighlight(dragRange.start, dragRange.end);
        }
      }
      setDragStart(null);
      setDragRange(null);
      return;
    }

    // 커스텀 모드가 아닐 때만 단어 뜻 검색
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      const selectedText = selection.toString().trim();

      // 선택된 텍스트가 1-10자 사이인 경우만 검색
      if (selectedText.length >= 1 && selectedText.length <= 10) {
        // 이미 같은 단어의 팝업이 열려있으면 새로 검색하지 않음
        if (wordPopup && wordPopup.word === selectedText) {
          return;
        }

        const rect = selection.getRangeAt(0).getBoundingClientRect();

        // ref를 사용하여 부모 요소의 위치 계산
        const parentRect = contentRef.current?.getBoundingClientRect();

        if (parentRect) {
          // 팝업이 화면 밖으로 나가지 않도록 위치 조정
          let x = rect.left - parentRect.left;
          const y = rect.bottom - parentRect.top + 5;

          // 팝업 너비 추정치 (320px)
          const popupWidth = 320;

          // 오른쪽 경계 체크
          if (x + popupWidth > parentRect.width) {
            x = parentRect.width - popupWidth - 10; // 10px 여백
          }

          // 왼쪽 경계 체크
          if (x < 10) {
            x = 10;
          }

          setWordPopup({
            word: selectedText,
            definition: null,
            position: { x, y },
            isLoading: true,
          });
        } else {
          setWordPopup({
            word: selectedText,
            definition: null,
            position: {
              x: rect.left,
              y: rect.bottom + 5,
            },
            isLoading: true,
          });
        }

        // API 호출
        const definition = await fetchWordDefinition(selectedText);
        setWordPopup((prev) =>
          prev
            ? {
                ...prev,
                definition,
                isLoading: false,
              }
            : null,
        );
      }
    }
  };

  // 팝업 닫기
  const closeWordPopup = () => {
    setWordPopup(null);
  };

  // 하이라이트 범위를 빠르게 확인하기 위한 Set 생성
  const highlightedRanges = new Set<number>();
  highlights.forEach(({ startPoint, endPoint }) => {
    for (let i = startPoint; i <= endPoint; i++) {
      highlightedRanges.add(i);
    }
  });

  return (
    <div
      className={`relative mb-55 font-basic-20-m ${themeTextColor1 ?? ""}`}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        userSelect: wordPopup ? "none" : "auto", // 팝업이 열려있으면 텍스트 선택 방지
      }}
      ref={contentRef}
    >
      {body.split("").map((char, index) => {
        if (char === "\n") {
          return <br key={index} />;
        }

        const isHighlighted = highlightedRanges.has(index);
        const highlightClass = isHighlighted
          ? highlights.find((h) => index >= h.startPoint && index <= h.endPoint)
              ?.highlightsColor
          : null;

        return (
          <span
            key={index}
            className={`inline-block ${highlightClass ? `bg-${highlightClass}` : ""} whitespace-pre-line`}
            onMouseDown={() => handleMouseDown(index)}
            onMouseEnter={() => handleMouseEnter(index)}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}

      {/* 단어 뜻 팝업 */}
      {wordPopup && (
        <div
          className="absolute z-50 w-200 rounded-lg border bg-white p-14 shadow-lg"
          style={{
            left: wordPopup.position.x,
            top: wordPopup.position.y,
          }}
          onClick={closeWordPopup}
        >
          <div className="mb-2 flex items-center justify-between">
            <div className="flex flex-row gap-10">
              <h3 className="font-semibold text-gray-800">{wordPopup.word}</h3>
              <p className="text-13 text-gray-400">
                {wordPopup.definition?.pos}
              </p>
            </div>
            <X
              size={25}
              onClick={closeWordPopup}
              className="pr-2 pb-4 text-gray-400 hover:text-gray-600"
            />
          </div>

          {wordPopup.isLoading ? (
            <div className="text-sm text-gray-500">검색 중...</div>
          ) : wordPopup.definition ? (
            <div>
              <div className="text-sm font-light text-gray-700">
                {wordPopup.definition.definition.map((def, index) => (
                  <div key={index} className="mb-1">
                    {index + 1}. {def}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500">뜻을 찾을 수 없습니다.</div>
          )}
        </div>
      )}
    </div>
  );
}
