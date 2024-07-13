const App = () => {
  return (
    <div className=" flex justify-center items-center h-screen">
      <div className="flex flex-col gap-6 justify-center items-center">
        <h1 className=" text-xl font-semibold">Todo</h1>
        <input
          type="text"
          className=" border border-blue-300 pl-2 py-1 rounded-lg text-lg focus:outline-none"
        />
      </div>
    </div>
  );
};

export default App;
