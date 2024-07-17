import { useEffect, useState } from "react";
import TodoComp from "./components/todo";
import CreateTodo from "./components/CreateTodo";
import axios from "axios";

const App = () => {
  const [todos, setTodo] = useState([]);
  const getTodos = async () => {
    const { data } = await axios.get(`/todos`);
    setTodo(data);
  };

  axios.defaults.baseURL = `http://localhost:3000`;

  const handleUpdate = (updateTodos) => {
    setTodo((oldTodo) =>
      oldTodo.map((old) => (old._id === updateTodos._id ? updateTodos : old))
    );
  };
  const handleTodoCreation = (newTodo) => setTodo([...todos, newTodo]);
  useEffect(() => {
    getTodos();
  }, []);
  return (
    <div className=" flex  flex-col items-start mt-20 ml-20 gap-8 ">
      <CreateTodo onTodoCreation={handleTodoCreation} />
      <TodoComp todos={todos} onUpdate={handleUpdate} />
    </div>
  );
};

export default App;
