import { useState, useEffect } from "react";

interface Todo {
  id: string;
  title: string;
  priority: string;
  done: boolean;
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api`); 
      const data = await response.json();
      setTodos(data.todos);
    };

    fetchTodos();
  }, []);

  const priorityClassMap = {
    Vysoká: "bg-danger",
    Střední: "bg-warning",
    Nízká: "bg-success",
  };

return (
    <div className="p-5 m-5">
        <ul className="list-group">
            {todos.map((todo) => (
                <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
                    {todo.title}
                    <span className={`badge ${priorityClassMap[todo.priority as keyof typeof priorityClassMap] || "bg-secondary"}`}>{todo.priority}</span>
                </li>
            ))}
        </ul>
    </div>
);
}

export default TodoList;