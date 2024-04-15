import { useState } from "react";
import TodoList from "./TodoList";
import TodoInput from "./TodoInput";
import { useTodos } from "../hooks/useTodos";
interface Todo {
  id: string;
  title: string;
  priority: string;
  done: boolean;
  date?: string;
  note?: string;
}

function Todo() {
  const [showAdditionalInputs, setShowAdditionalInputs] = useState(false);
  const { todos, addTodo, deleteTodo, toggleDone } = useTodos();

  return (
    <div className="container">
      <TodoInput
        handleAddTodo={addTodo}
        showAdditionalInputs={showAdditionalInputs}
        setShowAdditionalInputs={setShowAdditionalInputs}
      />
      <div className="mt-5">
        <TodoList
          todos={todos}
          onDelete={deleteTodo}
          onToggleDone={toggleDone}
        />
      </div>
    </div>
  );
}

export default Todo;
