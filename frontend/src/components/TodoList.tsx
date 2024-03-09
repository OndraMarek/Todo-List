import Todo from "./Todo";

interface TodoInputProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onToggleDone: (id: string) => void;
}

function TodoList({todo, onDelete, onToggleDone} : TodoInputProps) {

  const priorityClassMap = {
    Vysoká: "bg-danger",
    Střední: "bg-warning",
    Nízká: "bg-success",
  };

return (
  <div className="row d-flex justify-content-center align-items-center">
  <ul className="list-group col-lg-8">
      <li key={todo.id} className={`list-group-item d-flex justify-content-between align-items-center ${todo.done ? 'border-0 list-group-item-dark' : ''}`}>
          {todo.title}
          <div className="justify-content-right ">
            {!todo.done && (
              <span className={`align-middle me-5 badge ${priorityClassMap[todo.priority as keyof typeof priorityClassMap] || "bg-secondary"}`}>{todo.priority}</span>
            )}
            <input className="align-middle me-3 checkbox" type="checkbox" checked={todo.done} onChange={() => onToggleDone(todo.id)}/>
            <button className="btn btn-danger" onClick={() => onDelete(todo.id)}>Smazat</button>
          </div>
      </li>
  </ul>
</div>
    );
}

export default TodoList;