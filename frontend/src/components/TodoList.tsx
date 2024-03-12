import { useState } from "react";
import Todo from "./Todo";

interface TodoInputProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onToggleDone: (id: string) => void;
}

function TodoList({todo, onDelete, onToggleDone} : TodoInputProps) {
  const [showAdditionalProperties, setShowAdditionalProperties] = useState(false);
  const priorityClassMap = {
    Vysoká: "bg-danger",
    Střední: "bg-warning",
    Nízká: "bg-success",
  };

  const handleButtonClick = () => {
    setShowAdditionalProperties(!showAdditionalProperties);
  }



return (
  <div className="row justify-content-center align-items-center">
    <ul className="list-group col-lg-8">
      <li key={todo.id} className={` list-group-item list-group-item-action ${todo.done ? 'border-0 list-group-item-dark' : ''}`}>
        <div className="d-flex justify-content-between align-items-center">
          <p className="mb-0">{todo.title}</p>
          <div className="justify-content-right">
            {!todo.done && (
              <span className={`align-middle me-5 badge ${priorityClassMap[todo.priority as keyof typeof priorityClassMap] || "bg-secondary"}`}>{todo.priority}</span>
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
                <label htmlFor="pDate">Popis:</label>
                <p>{todo.note}</p>
                </div>
            </div>
        )}
      </li>
  </ul>
</div>
    );
}

export default TodoList;