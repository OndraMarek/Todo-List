import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

interface Todos{
  id: string;
  title: string
  priority: string; 
  done: boolean;
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

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});