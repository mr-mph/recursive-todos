import { FormEvent } from "react";
import { TodoItem } from "../todos/page";
import { Plus } from "lucide-react";

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
      <form
        onSubmit={handleSubmit}
        className="border-gray-600 bg-[#1c1c20] items-center flex border-1 rounded-sm  hover:bg-gray-800"
      >
        <input
          id="myinput"
          name="text"
          placeholder="add new todo"
          className="pl-1 ml-1.5 focus:outline-none focus:border-blue-200 border-1 w-full rounded-sm border-gray-700 m-0.5 px-1 py-0.5 hover:bg-gray-600"
        ></input>
        <button type="submit">
          <Plus className="w-8 h-8 m-1 px-1 border-1 rounded-sm border-gray-700 flex-shrink-0 hover:bg-gray-600 active:bg-gray-500" />
        </button>
      </form>
    </div>
  );
}
