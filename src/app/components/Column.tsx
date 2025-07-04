import { FormEvent } from "react";
import { TodoItem } from "../todos/page";

type ColumnProps = {
  children: React.ReactNode;
  parentTodo: TodoItem | null;
  addTodo: (text: string, parentid: string) => void;
  width: number;
};

export default function Column({
  children,
  parentTodo,
  addTodo,
  width,
}: ColumnProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.currentTarget.text.value === "") return;
    const text = e.currentTarget.text.value;
    e.currentTarget.text.value = "";
    const parentid = parentTodo?.id || "root";
    addTodo(text, parentid);
  };

  return (
    <div
      className={
        "flex flex-col gap-4 shrink-0 border-1 rounded-md p-2 bg-[#101014] border-gray-700"
      }
      style={{ width: `${width}px` }}
    >
      {children}
      <form onSubmit={handleSubmit}>
        <input
          name="text"
          placeholder="add new todo"
          className="bg-[#1c1c20] focus:outline-none focus:border-blue-200 flex border-1 rounded-sm h-8 px-3 hover:bg-gray-800 w-full border-gray-600"
        ></input>
      </form>
    </div>
  );
}
