import { FormEvent } from "react";
import { TodoItem } from "../page";

type ColumnProps = {
  children: React.ReactNode;
  parentTodo: TodoItem | null;
  addTodo: (text: string, parentid: string) => void;
};

export default function Column({ children, parentTodo, addTodo }: ColumnProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = e.currentTarget.text.value;
    e.currentTarget.text.value = "";
    const parentid = parentTodo?.id || "root";
    addTodo(text, parentid);
  };

  return (
    <div className="flex flex-col gap-4">
      {children}
      <form onSubmit={handleSubmit}>
        <input
          name="text"
          placeholder="add new todo"
          className="flex border-1 h-8 w-40 px-3 hover:border-white"
        ></input>
      </form>
    </div>
  );
}
