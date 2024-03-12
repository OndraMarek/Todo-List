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
    <li key={todo.id} className={`list-group-item list-group-item-action ${todo.done ? 'border-0 list-group-item-dark' : ''}`}>
      <div className="d-flex justify-content-between align-items-center">
        <p className="mb-0">{todo.title}</p>
        <div className="justify-content-right">
          {!todo.done && (
            <span className={`align-middle me-5 badge ${priorityClassMap[todo.priority as keyof typeof priorityClassMap] || "bg-secondary"}`}>
            {priorityTranslationMap[todo.priority as keyof typeof priorityTranslationMap] || todo.priority}
          </span>
          )}
          <input className="align-middle me-3 checkbox" type="checkbox" checked={todo.done} onChange={() => onToggleDone(todo.id)}/>
          <button type="button" className="me-3 btn btn-primary" onClick={handleButtonClick} disabled={!todo.date || !todo.note || todo.done}>
            Více..
          </button>
          <button className="btn btn-danger" onClick={() => onDelete(todo.id)}>Smazat</button>
        </div>
      </div>
      {showAdditionalProperties && (
        <div className="row d-flex justify-content-between align-items-center">
          <div className="col-md-6">
            <label htmlFor="pDate">Datum:</label>
            <p id="pDate">{todo.date}</p>
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