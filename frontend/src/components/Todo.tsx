import { useEffect, useState } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { v4 as uuid } from "uuid";

interface Todo {
    id: string;
    title: string;
    priority: string;
    done: boolean;
  }

function Todo(){
    const [todos, setTodos] = useState<Todo[]>([]);
    const [todoTitle, setTodoTitle] = useState("");
    const [todoPriority, setTodoPriority] = useState("");

    useEffect(() => {
        const fetchTodos = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api`); 
        const data = await response.json();
        setTodos(data.todos);
    };
        fetchTodos();
    }, []);

    const handleAddTodo = async () => {
        if (!todoTitle.trim() || !todoPriority) {
            alert("Please enter a title and select a priority.");
            return;
        }
        const newTodo: Todo = {
            id: uuid(),
            title: todoTitle,
            priority: todoPriority,
            done: false,
        };
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/todos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTodo),
            });

            if (response.ok) {
                setTodoTitle("");
                setTodoPriority("");
                setTodos([...todos, newTodo]);
            } else {
                console.error("Error", await response.text());
            }
        } catch (error) {
            console.error("Error", error);
        }
    };

    const handleDeleteTodo = async (todoId: string) => {
        try {
           const response = await fetch(`${import.meta.env.VITE_API_URL}/api/todos/${todoId}`, {
             method: "DELETE",
           });
       
           if (response.ok) {
             setTodos(todos.filter((todo) => todo.id !== todoId));
           } else {
             console.error("Error deleting todo", await response.text());
           }
        } catch (error) {
           console.error("Error deleting todo", error);
        }
    };

    const handleToggleDone = async (todoId: string) => {
        const todoIndex = todos.findIndex(todo => todo.id === todoId);
        if (todoIndex === -1) return;
    
        const updatedTodo = { ...todos[todoIndex], done: !todos[todoIndex].done };
        const newTodos = todos.filter(todo => todo.id !== todoId);
        const updatedTodos = updatedTodo.done ? [...newTodos, updatedTodo] : [updatedTodo, ...newTodos];
        setTodos(updatedTodos);
    
        try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/todos/${todoId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTodo),
        });
    
        if (!response.ok) {
            console.error("Error updating todo", await response.text());
        }
        } catch (error) {
        console.error("Error updating todo", error);
        }
    };
    
  
    return (
        <div className="container">
            <h1 className='text-center p-5 m-5'>Todo list</h1>
            <TodoInput
                todoTitle={todoTitle}
                setTodoTitle={setTodoTitle}
                todoPriority={todoPriority}
                setTodoPriority={setTodoPriority}
                handleAddTodo={handleAddTodo}
            />
            <div className="p-5 m-5">
                {todos.map((todo) => (
                    <TodoList key={todo.id} todo={todo} onDelete={handleDeleteTodo} onToggleDone={handleToggleDone}/>
                ))}
            </div>
        </div>
    );
}

export default Todo;