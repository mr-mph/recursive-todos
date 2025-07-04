"use client";
import Todo from "../components/Todo";
import Column from "../components/Column";
import Divider from "../components/Divider";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

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

export default function Todos() {
  const defaultWidth = 200;
  const minWidth = 150;

  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  const [columnWidths, setColumnWidths] = useState<number[]>([defaultWidth]);

  useEffect(() => {
    setTodos(JSON.parse(window.localStorage.getItem("todos") || "[]"));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    // make sure there's always enough column widths for the selected path
    const requiredColumns = selectedPath.length + 1;
    if (columnWidths.length < requiredColumns) {
      setColumnWidths((widths) => {
        const newWidths = [...widths];
        while (newWidths.length < requiredColumns) {
          newWidths.push(defaultWidth);
        }
        return newWidths;
      });
    }
  }, [selectedPath.length, columnWidths.length]);

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

  const handleResize = (colIndex: number, deltaX: number): number => {
    const oldWidth = columnWidths[colIndex] || defaultWidth;
    setColumnWidths((widths) => {
      const newWidths = [...widths];
      while (newWidths.length <= colIndex) {
        newWidths.push(defaultWidth);
      }
      newWidths[colIndex] = Math.max(minWidth, newWidths[colIndex] + deltaX);
      return newWidths;
    });
    // Return the actual delta that was applied
    const newWidth = Math.max(minWidth, oldWidth + deltaX);
    return newWidth - oldWidth;
  };

  const buildColumns = (
    parentTodo: TodoItem | null,
    subTodos: TodoItem[],
    path: string[],
    col: number
  ): React.ReactNode => {
    const currentColumn = (
      <>
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
        <Divider onResize={(deltaX) => handleResize(col, deltaX)} />
      </>
    );

    const selectedTodo = subTodos.find((todo) => todo.id === path[col]);
    if (!selectedTodo) return currentColumn;

    return (
      <>
        {currentColumn}
        {buildColumns(selectedTodo, selectedTodo.todos, path, col + 1)}
      </>
    );
  };

  return (
    <div className="flex flex-row gap-1 overflow-x-auto p-4">
      {buildColumns(null, todos, selectedPath, 0)}
    </div>
  );
}
