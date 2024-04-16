import { useState } from "react";
import Todo from "./Todo";
import TodoItem from "./TodoItem";

type TodoListProps = {
  todos: Todo[];
  onDelete: (id: string) => void;
  onToggleDone: (id: string) => void;
};

const priorityMap = {
  Low: 0,
  Medium: 1,
  High: 2,
};

function TodoList({ todos, onDelete, onToggleDone }: TodoListProps) {
  const [sortKey, setSortKey] = useState("");
  const [isAscending, setIsAscending] = useState(true);

  const sortedTodos = [...todos].sort((todoA, todoB) => {
    if (todoA.done === todoB.done) {
      let comparison = 0;
      const priorityA = priorityMap[todoA.priority] || 0;
      const priorityB = priorityMap[todoB.priority] || 0;
      switch (sortKey) {
        case "title":
          comparison = isAscending
            ? todoA.title.localeCompare(todoB.title)
            : todoB.title.localeCompare(todoA.title);
          break;
        case "priority":
          comparison = isAscending
            ? priorityA - priorityB
            : priorityB - priorityA;
          break;
        default:
          return 0;
      }
      return comparison;
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
          <h3 className="text-center">Žádný úkol ještě nebyl vytvořen!</h3>
        )}
      </ul>
    </div>
  );
}

export default TodoList;
