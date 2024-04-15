import { useState } from "react";
import Todo from "./Todo";
import TodoItem from "./TodoItem";

type TodoListProps = {
  todos: Todo[];
  onDelete: (id: string) => void;
  onToggleDone: (id: string) => void;
};

function TodoList({ todos, onDelete, onToggleDone }: TodoListProps) {
  const [sortKey, setSortKey] = useState("");
  const [isAscending, setIsAscending] = useState(true);

  const sortedTodos = [...todos].sort((todoA, todoB) => {
    if (todoA.done === todoB.done) {
      let comparison = 0;
      switch (sortKey) {
        case "title":
          comparison = todoA.title.localeCompare(todoB.title);
          break;
        case "priority":
          comparison = todoA.priority.localeCompare(todoB.priority);
          break;
        default:
          return 0;
      }
      return isAscending ? comparison : -comparison;
    }
    return todoA.done ? 1 : -1;
  });

  const handleSort = (key: string) => {
    setSortKey(key);
    setIsAscending((isAscending) => !isAscending);
  };

  return (
    <div className="row justify-content-center align-items-center">
      <ul className="list-group col-lg-8 col-md-12 col-sm-12">
        {sortedTodos.length > 0 ? (
          <>
            <div className="row">
              <div className="col-md-6">
                <label
                  className="underline"
                  onClick={() => handleSort("title")}
                >
                  Název úkolu:
                </label>
              </div>
              <div className="col-md-6">
                <label
                  className="underline"
                  onClick={() => handleSort("priority")}
                >
                  Priorita:
                </label>
              </div>
            </div>

            {sortedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={onDelete}
                onToggleDone={onToggleDone}
              />
            ))}
          </>
        ) : (
          <h3 className="text-center">There are no Todos yet!</h3>
        )}
      </ul>
    </div>
  );
}

export default TodoList;
