import { useState } from "react";

interface TodoInputProps {
  handleAddTodo: (title: string, priority: string, date?: string, note?: string) => void;
  showAdditionalInputs: boolean; 
  setShowAdditionalInputs: (show: boolean) => void;
}

function TodoInput({handleAddTodo, showAdditionalInputs, setShowAdditionalInputs }: TodoInputProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddTodo(title, priority, date, note);
    setTitle("");
    setPriority("");
    setDate("");
    setNote("");
 };

  const handleButtonClick = () => {
    setShowAdditionalInputs(!showAdditionalInputs);
  };

  return (
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Název úkolu"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}>
              <option hidden value="">Priorita</option>
              <option value="Vysoká">Vysoká</option>
              <option value="Střední">Střední</option>
              <option value="Nízká">Nízká</option>
            </select>
          </div>
          <div className="col-md-1">
            <button type="button" className="btn btn-primary" onClick={handleButtonClick}>
              Více..
            </button>
          </div>
          <div className="col-md-1">
            <button type="submit" className="btn btn-success">
              Přidat
            </button>
          </div>
          {showAdditionalInputs && (
            <>
              <div className="pt-2 col-md-4">
                <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)}/>
              </div>
              <div className="pt-2 col-md-8">
                <textarea className="form-control" value={note} onChange={(e) => setNote(e.target.value)}></textarea>
              </div>
            </>
        )}
        </div>
      </form>
  );
}

export default TodoInput;