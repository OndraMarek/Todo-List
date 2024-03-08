import Todo from "./Todo";

interface TodoInputProps {
  todo: Todo;
  onDelete: (id: string) => void;
}

function TodoList({todo, onDelete} : TodoInputProps) {

  const priorityClassMap = {
    Vysoká: "bg-danger",
    Střední: "bg-warning",
    Nízká: "bg-success",
  };

return (
      <div className="row d-flex justify-content-center align-items-center">
        <ul className="list-group col-lg-8">
            <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
                {todo.title}
                <div className="justify-content-right">
                  <span className={`me-5 badge ${priorityClassMap[todo.priority as keyof typeof priorityClassMap] || "bg-secondary"}`}>{todo.priority}</span>
                  <input className="me-2" type="checkbox" checked={todo.done}/>
                  <button className="btn btn-danger" onClick={() => onDelete(todo.id)}>Smazat</button>
                </div>
            </li>
        </ul>
      </div>
    );
}

export default TodoList;