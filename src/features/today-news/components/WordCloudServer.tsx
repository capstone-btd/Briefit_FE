import React from "react";
import WordCloudClient from "./WordCloudClient";
import { WordCloudData } from "@/types/wordcloud/wordCloudData";

type PositionedWord = {
  word: string;
  top: number;
  left: number;
  fontSize: number;
  color: string;
};

type DOMRectLike = {
  top: number;
  left: number;
  width: number;
  height: number;
};

// 시드 기반 랜덤 생성
function seededRandom(seed: number): () => number {
  return function () {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

function getRandomColor(rand: () => number): string {
  const colors = ["text-orange-100", "text-purple-500", "text-green-500"];
  const index = Math.floor(rand() * colors.length);
  return colors[index];
}

function isOverlapping(
  newRect: DOMRectLike,
  existingRects: DOMRectLike[],
  margin: number,
): boolean {
  return existingRects.some((rect) => {
    return !(
      newRect.left + newRect.width + margin < rect.left ||
      newRect.left > rect.left + rect.width + margin ||
      newRect.top + newRect.height + margin < rect.top ||
      newRect.top > rect.top + rect.height + margin
    );
  });
}

function normalizeScoreToFontSize(
  score: number,
  min: number,
  max: number,
  minScore: number,
  maxScore: number,
): number {
  if (maxScore === minScore) return (min + max) / 2;
  return ((score - minScore) / (maxScore - minScore)) * (max - min) + min;
}

export default function WordCloudServer({
  wordCloudData
}: {
  wordCloudData: WordCloudData;
  }) {
  const createdAt = wordCloudData.createdAt;
  const wordList = wordCloudData.words;

  const containerWidth = 800;
  const containerHeight = 500;
  const margin = 15;

  const seed = new Date(createdAt).getTime();
  const rand = seededRandom(seed); // 동일한 seed 값으로 같은 패턴 난수 생성

  const positionedWords: PositionedWord[] = [];
  const existingRects: DOMRectLike[] = [];

  const scores = wordList.map((w) => w.score);
  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);

  for (let i = 0; i < wordList.length; i++) {
    const { word, score } = wordList[i];
    const fontSize = normalizeScoreToFontSize(
      score,
      14,
      55,
      minScore,
      maxScore,
    );
    const width = word.length * (fontSize * 0.6);
    const height = fontSize * 1.2;
    const color = getRandomColor(rand);

    let attempts = 0;
    let position: { top: number; left: number };

    while (true) {
      const left = rand() * (containerWidth - width - margin);
      const top = rand() * (containerHeight - height - margin);
      const newRect = { top, left, width, height };

      if (!isOverlapping(newRect, existingRects, margin) || attempts > 20) { // 최대 20번만 수행
        existingRects.push(newRect);
        position = { top, left };
        break;
      }

      attempts++;
    }

    positionedWords.push({
      word,
      fontSize,
      top: position.top,
      left: position.left,
      color,
    });
  }

  return (
    <WordCloudClient
      positionedWords={positionedWords}
      width={containerWidth}
      height={containerHeight}
    />
  );
}
