import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Todo from "./components/Todo";

function App(): JSX.Element {
  return (
    <>
      <Header />

      <main>
        <Todo />
      </main>

      <Footer />
    </>
  );
}

export default App;
