import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from 'mongodb';

dotenv.config();

interface Todos {
  _id?: ObjectId;
  id: string;
  title: string
  priority: string; 
  done: boolean;
  date?: string;
  note?: string;
}

const app: Express = express();
const port = process.env.PORT || 3001;
const client = new MongoClient('mongodb://localhost:27017');

app.use(cors());
app.use(express.json());

client.connect().then(() => {
  console.log("Connected to database");

  app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
  });

  app.get("/api", async (req, res) => {
    const todos = await getTodos();
    res.json({ todos });
  });

  app.post("/api/todos", async (req, res) => {
    const newTodo: Todos = req.body;
    await addTodo(newTodo);
    res.json({ message: "Úkol přidán úspěšně!" });
  });

  app.put("/api/todos/:id", async (req, res) => {
    const id = req.params.id;
    const updatedTodo: Todos = req.body;
    const result = await updateTodo(id, updatedTodo);
    if (result.matchedCount > 0) {
      res.json({ message: "Úkol byl úspěšně aktualizován!" });
    } else {
      res.status(404).json({ message: "Úkol nebyl nalezen." });
    }
  });

  app.delete("/api/todos/:id", async (req, res) => {
    const id = req.params.id;
    const result = await deleteTodo(id);
    if (result.deletedCount > 0) {
      res.json({ message: "Úkol byl úspěšně smazán!" });
    } else {
      res.status(404).json({ message: "Úkol nebyl nalezen." });
    }
  });

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}).catch((err) => {
  console.error("Failed to connect to database", err);
});

async function getTodos() {
  return await client.db("TodoList").collection("todos").find().toArray();
}

async function addTodo(newTodo: Todos) {
  return await client.db("TodoList").collection("todos").insertOne(newTodo);
}

async function updateTodo(id: string, updatedTodo: Todos) {
  delete updatedTodo._id;
  return await client.db("TodoList").collection("todos").updateOne({id: id}, {$set: updatedTodo});
}

async function deleteTodo(id: string) {
  return await client.db("TodoList").collection("todos").deleteOne({id: id});
}