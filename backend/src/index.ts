import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

interface Todos{
  id: string;
  title: string
  priority: string; 
  done: boolean;
  date?: string;
  note?: string;
}

const app: Express = express();
const port = process.env.PORT || 3001;

const todos: Array<Todos> = [];


app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/api", (req, res) => {
  res.json({ todos });
});

app.post("/api/todos", (req, res) => {
  const newTodo: Todos = req.body;
  todos.push(newTodo);
  res.json({ message: "Úkol přidán úspěšně!" });
});

app.put("/api/todos/:id", (req, res) => {
  const id = req.params.id;
  const updatedTodo: Todos = req.body;
  const index = todos.findIndex(todo => todo.id === id);

  if (index !== -1) {
     todos[index] = updatedTodo;
     res.json({ message: "Úkol byl úspěšně aktualizován!" });
  } else {
     res.status(404).json({ message: "Úkol nebyl nalezen." });
  }
 });

app.delete("/api/todos/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex(todo => todo.id === id);
 
  if (index !== -1) {
     todos.splice(index, 1);
     res.json({ message: "Úkol byl úspěšně smazán!" });
  } else {
     res.status(404).json({ message: "Úkol nebyl nalezen." });
  }
 });

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});