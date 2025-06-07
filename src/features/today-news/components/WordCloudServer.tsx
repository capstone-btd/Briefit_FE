import React from "react";
import WordCloudClient from "./WordCloudClient";

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

function getRandomColor(): string {
  const colors = ["text-orange-100", "text-purple-500", "text-green-500"];
  return colors[Math.floor(Math.random() * colors.length)];
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

export default function WordCloudServer({ wordList }: { wordList: string[] }) {
  const containerWidth = 900;
  const containerHeight = 500;
  const margin = 20;

  const positionedWords: PositionedWord[] = [];
  const existingRects: DOMRectLike[] = [];

  for (let i = 0; i < wordList.length; i++) {
    const word = wordList[i];
    const fontSize = Math.floor(Math.random() * 40) + 14;
    const width = word.length * (fontSize * 0.6);
    const height = fontSize * 1.2;
    const color = getRandomColor();

    let attempts = 0;
    let position: { top: number; left: number };

    while (true) {
      const left = Math.random() * (containerWidth - width - margin);
      const top = Math.random() * (containerHeight - height - margin);
      const newRect = { top, left, width, height };

      if (!isOverlapping(newRect, existingRects, margin) || attempts > 50) {
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
