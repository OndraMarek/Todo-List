interface TodoInputProps {
  todoTitle: string;
  setTodoTitle: (title: string) => void;
  todoPriority: string;
  setTodoPriority: (priority: string) => void;
  handleAddTodo: () => void;
  showAdditionalInputs: boolean; 
  setShowAdditionalInputs: (show: boolean) => void;
}

function TodoInput({ todoTitle, setTodoTitle, todoPriority, setTodoPriority, handleAddTodo, showAdditionalInputs, setShowAdditionalInputs }: TodoInputProps) {
  
  const handleButtonClick = () => {
    setShowAdditionalInputs(!showAdditionalInputs);
 };

  return (
      <form onSubmit={handleAddTodo}>
        <div className="row">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Název úkolu"
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={todoPriority}
              onChange={(e) => setTodoPriority(e.target.value)}>
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
                <input type="date" className="form-control" />
              </div>
              <div className="pt-2 col-md-8">
                <textarea className="form-control"></textarea>
              </div>
            </>
        )}
        </div>
      </form>
  );
}

export default TodoInput;