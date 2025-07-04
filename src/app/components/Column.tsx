import { FormEvent } from "react";
import { TodoItem } from "./RecursiveTodos";

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
    const text = e.currentTarget.text.value;
    e.currentTarget.text.value = "";
    const parentid = parentTodo?.id || "root";
    addTodo(text, parentid);
  };

  return (
    <div
      className={"flex flex-col gap-4 shrink-0"}
      style={{ width: `${width}px` }}
    >
      {children}
      <form onSubmit={handleSubmit}>
        <input
          name="text"
          placeholder="add new todo"
          className="flex border-1 h-8 px-3 hover:border-white w-full"
        ></input>
      </form>
    </div>
  );
}
