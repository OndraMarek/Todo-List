import { useState } from "react";

function TodoList() {
    const todos = {
        1: {
          id: 1,
          title: 'Nakoupit na večeři',
          priority: 'low',  
          done: false
        },
        2: {
          id: 2,
          title: 'Zaplatit účty',
          priority: 'high',
          done: true
        },
        3: {
          id: 3,
          title: 'Sehnat dárek',
          priority: 'medium',
          done: false
        }
    };
    const [todoPriority, setTodoPriority] = useState('');

    const handleAddTodo = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Přidat úkol');
    }

    return (
      <div>
        <form>
            <div className="row">
                <div className="col-md-7">
                    <input type="text" className="form-control" placeholder="Název úkolu"/>
                </div>
                <div className="col-md-3">
                    <select className="form-select" value={todoPriority} onChange={(e) => setTodoPriority(e.target.value)}>
                        <option>Priorita</option>
                        <option value="high">Vysoká</option>
                        <option value="medium">Střední</option>
                        <option value="low">Nízká</option>
                    </select>
                </div>
                <div className="col-md-2">
                    <button type="submit" className="btn btn-success" onClick={handleAddTodo} >Přidat</button>
                </div>
            </div>
        </form>
      </div>
    );
  }
  
  export default TodoList;