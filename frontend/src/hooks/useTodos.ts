import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Todo from "../components/Todo";
import { FormValues } from "../components/TodoInput";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(`${API_URL}/api/todos`);
      const data = await response.json();
      setTodos(data.todos);
    };
    fetchTodos();
  }, [API_URL]);

  const addTodo = async (formValues: FormValues) => {
    const newTodo: Todo = {
      ...formValues,
      id: uuid(),
      done: false,
    };
    try {
      const response = await fetch(`${API_URL}/api/todos/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });
      if (response.ok) {
        setTodos((prevTodos) => [...prevTodos, newTodo]);
      } else {
        throw new Error("Error adding todo");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/api/todos/delete/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTodos(todos.filter((todo) => todo.id !== id));
      } else {
        throw new Error("Error deleting todo");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleDone = async (id: string) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;
    const updatedTodo = { ...todoToUpdate, done: !todoToUpdate.done };
    try {
      const response = await fetch(`${API_URL}/api/todos/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodo),
      });
      if (response.ok) {
        setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
      } else {
        throw new Error("Error updating todo");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { todos, addTodo, deleteTodo, toggleDone };
}
