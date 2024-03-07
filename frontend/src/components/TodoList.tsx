import Todo from "./Todo";

function TodoList({todo}: {todo: Todo}) {

  const priorityClassMap = {
    Vysoká: "bg-danger",
    Střední: "bg-warning",
    Nízká: "bg-success",
  };

return (
        <ul className="list-group">
            <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
                {todo.title}
                <span className={`badge ${priorityClassMap[todo.priority as keyof typeof priorityClassMap] || "bg-secondary"}`}>{todo.priority}</span>
            </li>
        </ul>
    );
}

export default TodoList;