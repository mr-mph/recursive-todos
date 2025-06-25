"use client";
import Todo from "./components/Todo";
import Column from "./components/Column";
import { useState } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
  todos: Todo[];
};

export default function Home() {
  const [todos, setTodos] = useState([
    {
      id: 0,
      text: "do something",
      completed: false,
      todos: [
        {
          id: 0,
          text: "part 1",
          completed: false,
          todos: [
            {
              id: 0,
              text: "part 1a",
              completed: false,
              todos: [],
            },
          ],
        },
        {
          id: 1,
          text: "part 2",
          completed: false,
          todos: [],
        },
      ],
    },
    {
      id: 1,
      text: "do another thing",
      completed: false,
      todos: [
        {
          id: 0,
          text: "another part 1",
          completed: false,
          todos: [],
        },
      ],
    },
  ]);

  const [selectedPath, setSelectedPath] = useState([1]);

  const onTodoClicked = (col: number, id: number) => {
    console.log(id);
    setSelectedPath((path) => {
      const newPath = [...path];
      newPath[col] = id;
      return newPath;
    });
  };

  const buildColumns = (
    subTodos: Todo[],
    path: number[],
    col: number
  ): React.ReactNode => {
    return (
      <>
        <Column>
          {subTodos.map((todo) => (
            <Todo
              key={todo.id}
              id={todo.id}
              col={col}
              completed={todo.completed}
              selected={todo.id === path[col]}
              onTodoClicked={onTodoClicked}
            >
              {todo.text}
            </Todo>
          ))}
        </Column>
        {subTodos.find((todo) => todo.id === path[col])?.todos &&
          buildColumns(
            subTodos.find((todo) => todo.id === path[col])?.todos || [],
            path,
            col + 1
          )}
      </>
    );
  };

  return (
    <div className="flex flex-row gap-4">
      {buildColumns(todos, selectedPath, 0)}
    </div>
  );
}
