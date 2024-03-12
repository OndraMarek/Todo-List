import "./App.css";
import Todo from "./components/Todo";

function App(): JSX.Element {

  return ( 
  <>
    <h1 className="text-center my-5">Todo list</h1>
    <Todo/>
  </> 
  );
}

export default App;