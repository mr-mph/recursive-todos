"use client";
import Todo from "./components/Todo";
import Column from "./components/Column";
import { nanoid } from "nanoid";
import { FormEvent, useState } from "react";

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  todos: TodoItem[];
}

const updateTodoById = (
  todos: TodoItem[],
  id: string,
  update: (todo: TodoItem) => TodoItem
): TodoItem[] => {
  return todos.map((todo) => {
    if (todo.id === id) {
      return update(todo);
    }
    if (todo.todos.length > 0) {
      return {
        ...todo,
        todos: updateTodoById(todo.todos, id, update),
      };
    }
    return todo;
  });
};

export default function Home() {
  const [todos, setTodos] = useState<TodoItem[]>([
    {
      id: nanoid(),
      text: "do something",
      completed: false,
      todos: [
        {
          id: nanoid(),
          text: "part 1",
          completed: false,
          todos: [
            {
              id: nanoid(),
              text: "part 1a",
              completed: false,
              todos: [],
            },
          ],
        },
        {
          id: nanoid(),
          text: "part 2",
          completed: false,
          todos: [],
        },
      ],
    },
    {
      id: nanoid(),
      text: "do another thing",
      completed: false,
      todos: [
        {
          id: nanoid(),
          text: "another part 1",
          completed: false,
          todos: [],
        },
      ],
    },
  ]);

  const [selectedPath, setSelectedPath] = useState<string[]>([]);

  const handleCheck = (id: string, val: boolean) => {
    setTodos((todos) =>
      updateTodoById(todos, id, (todo) => ({
        ...todo,
        completed: val,
      }))
    );
  };

  const onTodoClicked = (col: number, id: string) => {
    setSelectedPath((path) => {
      const newPath = [...path];
      newPath[col] = id;
      newPath.length = col + 1;
      return newPath;
    });
  };

  const addTodo = (text: string, parentid: string) => {
    setTodos((prevTodos) => {
      const newTodos = [...prevTodos];
      const newTodo = {
        id: nanoid(),
        text: text,
        completed: false,
        todos: [],
      };
      if (parentid === "root") {
        newTodos.push(newTodo);
      } else {
        return updateTodoById(newTodos, parentid, (todo) => ({
          ...todo,
          todos: [...todo.todos, newTodo],
        }));
      }
      return newTodos;
    });
  };

  const buildColumns = (
    parentTodo: TodoItem | null,
    subTodos: TodoItem[],
    path: string[],
    col: number
  ): React.ReactNode => {
    return (
      <>
        <Column addTodo={addTodo} parentTodo={parentTodo}>
          {subTodos.map((todo) => (
            <Todo
              key={todo.id}
              id={todo.id}
              col={col}
              completed={todo.completed}
              selected={todo.id === path[col]}
              onTodoClicked={onTodoClicked}
              onChecked={handleCheck}
            >
              {todo.text}
            </Todo>
          ))}
        </Column>
        {subTodos.find((todo) => todo.id === path[col])?.todos &&
          buildColumns(
            subTodos.find((todo) => todo.id === path[col]) || null,
            subTodos.find((todo) => todo.id === path[col])?.todos || [],
            path,
            col + 1
          )}
      </>
    );
  };

  return (
    <div className="flex flex-row gap-4">
      {buildColumns(null, todos, selectedPath, 0)}
    </div>
  );
}
