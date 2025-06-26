"use client";
import { ChangeEvent, FocusEvent, KeyboardEvent, useState } from "react";

interface TodoProps {
  completed: boolean;
  id: string;
  col: number;
  selected: boolean;
  onTodoClicked: (col: number, id: string) => void;
  onEdited: (id: string, checked: boolean, text: string) => void;
  text: string;
}

export default function Todo({
  completed,
  id,
  col,
  selected,
  onTodoClicked,
  onEdited,
  text,
}: TodoProps) {
  // const [editing, setEditing] = useState(false);

  const onUnfocus = (e: FocusEvent<HTMLInputElement>) => {
    onEdited(id, completed, e.target.value);
  };

  const handleClick = () => {
    onTodoClicked(col, id);
  };

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    onEdited(id, e.target.checked, text);
  };

  const detectEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  return (
    <div
      className={`flex border-1 hover:bg-gray-800 ${
        selected ? "border-green-400" : "border-red-400"
      }`}
    >
      <input
        className="mx-3"
        type="checkbox"
        onChange={handleCheck}
        checked={completed}
      />
      <input
        className="border-1 w-full"
        onClick={handleClick}
        defaultValue={text}
        onKeyDown={detectEnter}
        onBlur={onUnfocus}
      />
    </div>
  );
}
