"use client";
import { ChangeEvent, useState } from "react";

interface TodoProps {
  completed: boolean;
  id: string;
  col: number;
  selected: boolean;
  onTodoClicked: (col: number, id: string) => void;
  onChecked: (id: string, val: boolean) => void;
  children: React.ReactNode; // passed in todo el text
}

export default function Todo({
  completed,
  id,
  col,
  selected,
  onTodoClicked,
  onChecked,
  children,
}: TodoProps) {
  const handleClick = () => {
    onTodoClicked(col, id);
  };

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    onChecked(id, e.target.checked);
  };

  return (
    <div
      className={`flex border-1 w-40 hover:border-white ${
        selected ? "border-green-400" : "border-red-400"
      }`}
    >
      <input
        className="mx-3"
        type="checkbox"
        onChange={handleCheck}
        checked={completed}
      />

      <div className="border-1 w-full" role="button" onClick={handleClick}>
        {children}
      </div>
    </div>
  );
}
