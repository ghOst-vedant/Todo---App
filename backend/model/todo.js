import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

export const todoModel = mongoose.model("todos", todoSchema);
