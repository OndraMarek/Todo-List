import Todo from './Todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: string) => void;
  onToggleDone: (id: string) => void;
}

function TodoList({ todos, onDelete, onToggleDone }: TodoListProps) {
  return (
    <div className="row justify-content-center align-items-center">
      <ul className="list-group col-lg-8">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onToggleDone={onToggleDone} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;