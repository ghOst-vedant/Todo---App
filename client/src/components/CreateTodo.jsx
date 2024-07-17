import { memo, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import PropTypes from "prop-types";
const CreateTodo = memo(({ onTodoCreation }) => {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = async () => {
    const { data } = await axios.post(`/todo`, todo);
    onTodoCreation(data);
  };
  return (
    <div className="flex flex-col gap-6 justify-center items-center">
      <h1 className=" text-xl font-semibold ">Todo</h1>
      <div className=" flex  gap-4 items-center">
        <div className=" flex flex-col gap-2">
          <input
            type="text"
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            className=" border border-black/35 pl-2 py-1 rounded-lg text-lg focus:outline-none"
          />
          <input
            type="text"
            onChange={(e) => setTodo({ ...todo, description: e.target.value })}
            className=" border border-black/35 pl-2 py-1 rounded-lg text-lg focus:outline-none"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className=" bg-black text-white p-2 px-3 rounded-lg flex items-center gap-1  font-light"
        >
          Add
          <FaPlus color="white" />
        </button>
      </div>
    </div>
  );
});

CreateTodo.propTypes = {
  onTodoCreation: PropTypes.func.isRequired,
};
CreateTodo.displayName = "CreateTodo";
export default CreateTodo;
