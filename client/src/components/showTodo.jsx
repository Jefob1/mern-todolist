import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UpdateTodo } from "./updateTodo";

function TodoCard({ data, handleDelete, handleEdit }) {
  const { _id, title, description } = data;

  function onDelete() {
    handleDelete(_id);
  }

  return (
    <li className="bg-gray-200 p-4 m-2 rounded-md shadow-md" key={_id}>
      <div className="title-description">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>

      <div className="button-container mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2" onClick={() => handleEdit(_id)}>
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export function ShowTodoList() {
  const [todo, setTodo] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/todo")
      .then((res) => {
        console.log(res.data);
        setTodo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [update]);

  function handleEdit(id) {
    setId(id);
    setOpen(true);
  }

  function handleUpdate() {
    console.log("update:", update, !update);
    setUpdate(!update);
  }

  function handleDelete(id) {
    axios.delete(`http://localhost:8000/api/todo/${id}`);

    setTodo((data) => {
      return data.filter((todo) => todo._id !== id);
    });
  }

  function handleClose() {
    setId("");
    setOpen(false);
  }

  return (
    <section className="container mx-auto p-8">
      <Link to="/create-todo" className="button-new">
        <button className="bg-green-500 text-white px-4 py-2 rounded-md mb-4">
          New
        </button>
      </Link>
      <section className="contents">
        <h1 className="text-3xl font-bold mb-4">TODO</h1>
        <ul className="list-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {todo.map((data) => (
            <TodoCard
              data={data}
              key={data._id}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))}
        </ul>
      </section>
      {open && (
        <section className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="update-container">
            <div className="update-contents bg-white p-4 rounded-md">
              <p onClick={handleClose} className="close text-right text-3xl cursor-pointer">
                &times;
              </p>
              <UpdateTodo _id={id} handleClose={handleClose} handleEdited={handleUpdate} />
            </div>
          </div>
        </section>
      )}
    </section>
  );
}
