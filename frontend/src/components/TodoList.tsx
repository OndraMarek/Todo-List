import { useState } from 'react';
import Todo from './Todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: string) => void;
  onToggleDone: (id: string) => void;
}

function TodoList({ todos, onDelete, onToggleDone }: TodoListProps) {
  const [sortKey, setSortKey] = useState('');
  const [isAscending, setIsAscending] = useState(true);

  const sortedTodos = [...todos].sort((todoA, todoB) => {
    let comparison = 0;
    switch (sortKey) {
      case 'title':
        comparison = todoA.title.localeCompare(todoB.title);
        break;
      case 'priority':
        comparison = todoA.priority.localeCompare(todoB.priority);
        break;
      default:
        comparison = todoA.done === todoB.done ? 0 : todoA.done ? 1 : -1;
    }
    return isAscending ? comparison : -comparison; 
  });

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setIsAscending(!isAscending); 
    } else {
      setSortKey(key);
      setIsAscending(true);
    }
  };

  return (
    <div className="row justify-content-center align-items-center">
      <ul className="list-group col-lg-8 col-md-12 col-sm-12">  
        {todos.length > 0 && (
          <div className='row'>
            <div className='col-md-6'>
              <label className='underline' onClick={() => handleSort('title')}>Název:</label>
            </div>
            <div className='col-md-6'>
              <label className='underline' onClick={() => handleSort('priority')}>Priorita:</label>
            </div>
          </div>
        )}
        {sortedTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onToggleDone={onToggleDone} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;