import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "./App.css";

function App(): JSX.Element {

  return ( 
  <>
  <div className="container">
    <h1 className='text-center p-5 m-5'>Todo list</h1>
    <TodoInput/>
    <TodoList/>
  </div>
  </> 
  );
}

export default App;