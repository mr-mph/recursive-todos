"use client";
import { useRef, useEffect } from "react";

interface DividerProps {
  onResize: (deltaX: number) => number;
}

export default function Divider({ onResize }: DividerProps) {
  const isDragging = useRef(false);
  const startX = useRef(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    document.body.style.userSelect = "none";
    isDragging.current = true;
    startX.current = e.clientX;
    document.body.style.cursor = "col-resize";
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - startX.current;
    const appliedDelta = onResize(deltaX);
    startX.current += appliedDelta;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.body.style.cursor = "default";
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  });

  return (
    <div
      className="w-3 hover:bg-gray-600 cursor-col-resize flex-shrink-0"
      onMouseDown={handleMouseDown}
    />
  );
}
