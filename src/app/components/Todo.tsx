"use client";
import { Trash2 } from "lucide-react";
import { ChangeEvent, FocusEvent, KeyboardEvent } from "react";

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
      className={`bg-[#1c1c20] items-center flex border-1 rounded-sm  hover:bg-gray-800 ${
        selected ? "border-blue-400" : "border-gray-600"
      }`}
    >
      <input
        className="mx-3 w-5 h-5 flex-shrink-0 "
        type="checkbox"
        onChange={handleCheck}
        checked={completed}
      />
      <input
        className="focus:outline-none focus:border-blue-200 border-1 w-full rounded-sm border-gray-700 m-0.5 px-1 py-0.5 hover:bg-gray-600"
        onClick={handleClick}
        defaultValue={text}
        onKeyDown={detectEnter}
        onBlur={onUnfocus}
      />
      <Trash2
        className="w-8 h-8 m-1 px-1 border-1 rounded-sm border-gray-700 flex-shrink-0 hover:bg-gray-600 active:bg-gray-500"
        onClick={() => onEdited(id, completed, "")}
      />
    </div>
  );
}
