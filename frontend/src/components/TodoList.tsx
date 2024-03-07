import React, { useState } from "react";
interface Todo {
  id: string;
  title: string;
  priority: string;
  done: boolean;
}

function TodoList() {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoPriority, setTodoPriority] = useState("");

  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todoTitle.trim() || !todoPriority) {
        alert("Please enter a title and select a priority.");
        return;
      }
    const newTodo: Todo = {
      id: Math.random().toString(36).substring(7),
      title: todoTitle,
      priority: todoPriority,
      done: false,
    };
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTodo),
        });

        if (response.ok) {
            setTodoTitle("");
            setTodoPriority("");
            console.log("ANO");
        } else {
            console.error("NE", await response.text());
        }
    } catch (error) {
      console.error("Chyba", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <div className="row">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Název úkolu"
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={todoPriority}
              onChange={(e) => setTodoPriority(e.target.value)}>
              <option hidden value="">Priorita</option>
              <option value="high">Vysoká</option>
              <option value="medium">Střední</option>
              <option value="low">Nízká</option>
            </select>
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-success">
              Přidat
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TodoList;