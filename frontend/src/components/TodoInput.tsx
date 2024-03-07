interface TodoInputProps {
  todoTitle: string;
  setTodoTitle: (title: string) => void;
  todoPriority: string;
  setTodoPriority: (priority: string) => void;
  handleAddTodo: () => void;
}

function TodoInput({ todoTitle, setTodoTitle, todoPriority, setTodoPriority, handleAddTodo }: TodoInputProps) {

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
          <div className="col-md-2">
            <button type="submit" className="btn btn-success">
              Přidat
            </button>
          </div>
        </div>
      </form>
  );
}

export default TodoInput;