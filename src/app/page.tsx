"use client";
import Todo from "./components/Todo";
import Column from "./components/Column";
import Divider from "./components/Divider";
import { nanoid } from "nanoid";
import { FormEvent, useEffect, useState } from "react";

export type TodoItem = {
  id: string;
  text: string;
  completed: boolean;
  todos: TodoItem[];
};

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

const deleteTodoById = (todos: TodoItem[], id: string): TodoItem[] => {
  return todos.filter((todo) => {
    if (todo.id === id) {
      return false;
    }
    if (todo.todos.length > 0) {
      todo.todos = deleteTodoById(todo.todos, id);
    }
    return true;
  });
};

export default function Home() {
  const defaultWidth = 200;

  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  const [columnWidths, setColumnWidths] = useState<number[]>([defaultWidth]);

  useEffect(() => {
    setTodos(JSON.parse(window.localStorage.getItem("todos") || "[]"));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleEdit = (id: string, checked: boolean, text: string) => {
    setTodos((todos) =>
      text === ""
        ? deleteTodoById(todos, id)
        : updateTodoById(todos, id, (todo) => ({
            ...todo,
            completed: checked,
            text: text,
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

  const handleResize = (colIndex: number, deltaX: number) => {
    setColumnWidths((widths) => {
      const newWidths = [...widths];
      while (newWidths.length <= colIndex) {
        newWidths.push(defaultWidth);
      }
      newWidths[colIndex] = Math.max(100, newWidths[colIndex] + deltaX);
      return newWidths;
    });
  };

  const buildColumns = (
    parentTodo: TodoItem | null,
    subTodos: TodoItem[],
    path: string[],
    col: number
  ): React.ReactNode => {
    if (columnWidths.length <= col) {
      setColumnWidths((widths) => [...widths, defaultWidth]);
    }

    const currentColumn = (
      <Column
        addTodo={addTodo}
        parentTodo={parentTodo}
        width={columnWidths[col] || defaultWidth}
      >
        {subTodos.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            col={col}
            completed={todo.completed}
            selected={todo.id === path[col]}
            onTodoClicked={onTodoClicked}
            onEdited={handleEdit}
            text={todo.text}
          />
        ))}
      </Column>
    );

    const nextColumn =
      subTodos.find((todo) => todo.id === path[col])?.todos &&
      buildColumns(
        subTodos.find((todo) => todo.id === path[col]) || null,
        subTodos.find((todo) => todo.id === path[col])?.todos || [],
        path,
        col + 1
      );

    if (!nextColumn) return currentColumn;

    return (
      <>
        {currentColumn}
        <Divider onResize={(deltaX) => handleResize(col, deltaX)} />
        {nextColumn}
      </>
    );
  };

  return (
    <div className="flex flex-row gap-4 overflow-x-auto p-4">
      {buildColumns(null, todos, selectedPath, 0)}
    </div>
  );
}
