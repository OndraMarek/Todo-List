import { useState } from "react";
import Todo from "./Todo";

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onToggleDone: (id: string) => void;
}

function TodoItem({ todo, onDelete, onToggleDone }: TodoItemProps) {
  const [showAdditionalProperties, setShowAdditionalProperties] = useState(false);
  const priorityClassMap = {
    High: "bg-danger",
    Medium: "bg-warning",
    Low: "bg-success",
  };
  const priorityTranslationMap = {
    High: "Vysoká",
    Medium: "Střední",
    Low: "Nízká",
  };

  const handleButtonClick = () => {
    setShowAdditionalProperties(!showAdditionalProperties);
  };

  return (
    <li key={todo.id} className={` list-group-item list-group-item-action ${todo.done ? 'border-0 list-group-item-dark' : ''}`}>
        <div className="row">
            <div className="col-md-6 d-flex align-items-center">
                <p className="mb-0 ">{todo.title}</p>
            </div>
            <div className="col-md-6 text-right">
                <span className={`align-middle me-5 badge ${todo.done ? "bg-secondary" : priorityClassMap[todo.priority as keyof typeof priorityClassMap] || "bg-secondary"}`}>
                {priorityTranslationMap[todo.priority as keyof typeof priorityTranslationMap] || todo.priority}
                </span>
                <input className="align-middle me-3 checkbox" type="checkbox" checked={todo.done} onChange={() => onToggleDone(todo.id)}/>
                <button type="button" className="me-3 btn btn-primary" onClick={handleButtonClick} disabled={!todo.date || !todo.note || todo.done}>
                    Více..
                </button>
                <button className="btn btn-danger" onClick={() => onDelete(todo.id)}>Smazat</button>
            </div>
        </div>
      {showAdditionalProperties && !todo.done && (
        <div className="row">
          <hr className="mt-3" />
          <div className="col-md-6">
            <label>Datum:</label>
            <p>{todo.date}</p>
          </div>
          <div className="col-md-6">
            <label>Popis:</label>
            <p>{todo.note}</p>
          </div>
        </div>
      )}
    </li>
  );
}

export default TodoItem;