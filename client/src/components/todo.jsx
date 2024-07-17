import axios from "axios";
import PropTypes from "prop-types";
import { memo } from "react";

const TodoComp = memo(({ todos, onUpdate }) => {
  const handleCheck = async (todoId) => {
    const { data } = await axios.put(`/completed`, { id: todoId });
    onUpdate(data);
  };
  return (
    <div className="w-[18vw] flex flex-col gap-4">
      {todos &&
        todos.map((todo) => {
          return (
            <div
              key={todo._id}
              className={`px-2  bg-white text-black border rounded-md py-2 self-stretch shadow  flex items-center gap-4 relative`}
            >
              <div
                className={`w-4 h-4 rounded-full absolute -right-1 -top-1 ${
                  todo.completed ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <input
                type="checkbox"
                id={todo._id}
                checked={todo.completed}
                onChange={() => {
                  handleCheck(todo._id);
                }}
              />
              <div>
                <h1 className="text-lg">{todo.title}</h1>
                <p className=" text-xs">{todo.description}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
});

TodoComp.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
TodoComp.displayName = "TodoComp";
export default TodoComp;
