import TodoList from "./TodoList";
import TodoInput from "./TodoInput";
import { useTodos } from "../hooks/useTodos";

type Todo = {
  id: string;
  title: string;
  priority: string;
  done: boolean;
  date?: string;
  note?: string;
};

function Todo() {
  const { todos, addTodo, deleteTodo, toggleDone } = useTodos();

  return (
    <div className="container">
      <TodoInput handleAddTodo={addTodo} />
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
