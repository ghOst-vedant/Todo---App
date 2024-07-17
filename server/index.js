import express from "express";
import jwt from "jsonwebtoken";
import { creation, update } from "./types.js";
import dotenv from "dotenv";
import { todoModel } from "./model/todo.js";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: `http://localhost:5173`,
  })
);
mongoose.connect(process.env.MONGO).then(() => console.log("connected to db"));

app.post("/todo", async (req, res) => {
  const payload = req.body;
  const payloadParsed = creation.safeParse(payload);
  if (!payloadParsed.success) {
    res.status(411).json({
      msg: "You sent the wrong inputs",
    });
    return;
  }
  const todo = new todoModel({
    title: payload.title,
    description: payload.description,
    completed: false,
  });
  // const response = await todoModel.save;
  // res.status(200).json({ todo: response });
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  //mongoDB
});

app.get("/todos", async (req, res) => {
  const todos = await todoModel.find();
  res.status(200).json(todos);
});

app.put("/completed", async (req, res) => {
  const { id } = req.body;
  const parsedId = update.safeParse(id);
  if (!parsedId.success) {
    res.status(411).json({
      msg: "Format error",
    });
    return;
  }
  console.log("id hai bhai", id);
  const todo = await todoModel.findById(id);
  let status = todo.completed;
  if (status === true) {
    status = false;
  } else {
    status = true;
  }
  const response = await todoModel.findByIdAndUpdate(
    id,
    {
      completed: status,
    },
    { new: true }
  );

  res.status(200).json(response);
});

app.listen(3000, () => {
  console.log(" ✅ Listening to 3000");
});
