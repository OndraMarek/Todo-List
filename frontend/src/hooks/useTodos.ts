import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import Todo from '../components/Todo';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(`${API_URL}/api`);
      const data = await response.json();
      setTodos(data.todos);
    };
    fetchTodos();
  }, [API_URL]);

  const addTodo = async (title: string, priority: string, date?: string, note?: string) => {
    if (!title.trim() || !priority) {
        alert("Please enter a title and select a priority.");
        return;
      }
      const newTodo: Todo = {
        id: uuid(),
        title,
        priority,
        done: false,
        date,
        note,
      };
      try {
        const response = await fetch(`${API_URL}/api/todos`, {
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
        const response = await fetch(`${API_URL}/api/todos/${id}`, {
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
      const response = await fetch(`${API_URL}/api/todos/${id}`, {
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