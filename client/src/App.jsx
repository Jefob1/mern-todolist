import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShowTodoList } from "./components/showTodo";
import { CreateTodo } from "./components/createTodo";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShowTodoList />} />
          <Route path="/create-todo" element={<CreateTodo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
