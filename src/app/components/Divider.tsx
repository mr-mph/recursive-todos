"use client";
import { MouseEvent, useRef, useEffect } from "react";

interface DividerProps {
  onResize: (deltaX: number) => void;
}

export default function Divider({ onResize }: DividerProps) {
  const isDragging = useRef(false);
  const startX = useRef(0);

  const handleMouseDown = (e: MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    document.body.style.cursor = "col-resize";
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - startX.current;
    onResize(deltaX);
    startX.current = e.clientX;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.body.style.cursor = "default";
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove as any);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove as any);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      className="w-3 hover:bg-gray-600 cursor-col-resize flex-shrink-0"
      onMouseDown={handleMouseDown}
    />
  );
}
