import express from "express";
import jwt from "jsonwebtoken";
import { creation, update } from "./types.js";
import dotenv from "dotenv";
import { todoModel } from "./model/todo.js";
import mongoose from "mongoose";
const app = express();
dotenv.config();
app.use(express.json());

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
  await todoModel.create({
    title: payload.title,
    description: payload.description,
    completed: false,
  });
  const response = todoModel.save;
  res.status(200).json({ todo: response });
  //mongoDB
});

app.get("/todos", async (req, res) => {
  const todos = await todoModel.findOne();
  res.status(200).json(todos);
});
app.put("/completed", async (req, res) => {
  const id = req.body;
  const parsedId = update.safeParse(id);
  if (!parsedId.success) {
    res.status(411).json({
      msg: "Format error",
    });
    return;
  }
  await todoModel.updateOne(
    { _id: req.body.id },
    {
      completed: true,
    }
  );
  res.status(200).json("Todo Completed");
});

app.listen(3000, () => {
  console.log(" ✅ Listening to 3000");
});
