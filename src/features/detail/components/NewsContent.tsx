"use client";

import React, { useRef, useEffect } from 'react';
import { Highlight, useNewsCustomStore } from "@/stores/detail/useNewsCustomStore";

export default function NewsContent ({body, highlights}: {body: string; highlights: Highlight[]}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const { activeHighlightColor, addHighlight } = useNewsCustomStore();

  useEffect(() => {
    const handleMouseUp = () => {
      if (!contentRef.current) return;

      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(contentRef.current);
      preCaretRange.setEnd(range.startContainer, range.startOffset);

      const startIndex = preCaretRange.toString().length;
      const endIndex = startIndex + range.toString().length;

      if (activeHighlightColor && startIndex < endIndex) {
        addHighlight(startIndex, endIndex, activeHighlightColor);
        selection.removeAllRanges(); // Clear selection after highlighting
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      if (contentElement) {
        contentElement.removeEventListener('mouseup', handleMouseUp);
      }
    };
  }, [activeHighlightColor, addHighlight]);

  const renderContent = () => {
    const elements: React.ReactNode[] = [];
    let currentIndex = 0;

    // Sort highlights to handle them in order
    const sortedHighlights = [...highlights].sort((a, b) => a.startIndex - b.startIndex);

    sortedHighlights.forEach(highlight => {
      // Add plain text before the current highlight
      if (highlight.startIndex > currentIndex) {
        elements.push(body.substring(currentIndex, highlight.startIndex));
      }
      // Add highlighted text
      elements.push(
        <span
          key={`${highlight.startIndex}-${highlight.endIndex}-${highlight.color}`}
          style={{ backgroundColor: `var(--${highlight.color})` }}
        >
          {body.substring(highlight.startIndex, highlight.endIndex)}
        </span>
      );
      currentIndex = highlight.endIndex;
    });

    // Add any remaining plain text after the last highlight
    if (currentIndex < body.length) {
      elements.push(body.substring(currentIndex));
    }

    return elements;
  };

  return (
      <div ref={contentRef} className="font-basic-20-m mb-55">
       {renderContent()}
      </div>
    );
}