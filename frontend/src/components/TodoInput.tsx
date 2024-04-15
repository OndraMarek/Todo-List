import { ChangeEvent, FormEvent, useState } from "react";

export type FormValues = {
  title: string;
  priority: string;
  date: string;
  note: string;
};

type TodoInputProps = {
  handleAddTodo: (values: FormValues) => void;
};

const defaultFormValues: FormValues = {
  title: "",
  priority: "",
  date: "",
  note: "",
};

function TodoInput({ handleAddTodo }: TodoInputProps) {
  const [formState, setFormState] = useState<FormValues>(defaultFormValues);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAdditionalInputs, setShowAdditionalInputs] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setErrorMessage("");
    if (!formState.title || !formState.priority) {
      setErrorMessage("Zadejte název a prioritu úkolu");
      return;
    }

    handleAddTodo(formState);
    setFormState(defaultFormValues);
  };

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleButtonClick = () => {
    setShowAdditionalInputs(!showAdditionalInputs);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6 col-lg-7 col-12">
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Název úkolu"
            value={formState.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-3 col-lg-3  col-6">
          <select
            name="priority"
            className="form-select"
            value={formState.priority}
            onChange={handleInputChange}
          >
            <option hidden value="">
              Priorita
            </option>
            <option value="High">Vysoká</option>
            <option value="Medium">Střední</option>
            <option value="Low">Nízká</option>
          </select>
        </div>
        <div className="col-md-1 col-lg-1 col-3 mr">
          <button type="submit" className="btn btn-success mr">
            Přidat
          </button>
        </div>
        <div className="col-md-1 col-lg-1 col-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleButtonClick}
          >
            {showAdditionalInputs ? "Méně.." : "Více.."}
          </button>
        </div>
        {showAdditionalInputs && (
          <>
            <div className="pt-3 col-md-6">
              <input
                type="date"
                name="date"
                className="form-control"
                value={formState.date}
                onChange={handleInputChange}
              />
            </div>
            <div className="pt-3 col-md-6">
              <textarea
                name="note"
                className="form-control"
                placeholder="Poznámka"
                value={formState.note}
                onChange={handleInputChange}
              />
            </div>
          </>
        )}
      </div>
      {errorMessage && <p className="mt-1">{errorMessage}</p>}
    </form>
  );
}

export default TodoInput;
