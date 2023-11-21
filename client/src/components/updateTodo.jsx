import { useState } from "react";
import axios from "axios";

export function UpdateTodo({ _id, handleClose, handleEdited }) {
  const [data, setData] = useState({ title: "", description: "" });

  function handleChange(e) {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log({ _id }, { data });

    axios
      .put(`http://localhost:8000/api/todo/${_id}`, data)
      .then((res) => {
        setData({ title: "", description: "" });
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log("Failed to update todo");
        console.log(err.message);
      });
  }

  return (
    <form
      className="container mx-auto p-8 bg-white rounded-md shadow-md max-w-md"
      onSubmit={(e) => {
        handleSubmit(e);
        handleEdited();
        handleClose();
      }}
    >
      <label htmlFor="title" className="block text-lg font-bold mb-2">
        Title
      </label>
      <input
        type="text"
        name="title"
        className="input px-4 py-2 border border-gray-300 rounded-md w-full mb-4"
        onChange={handleChange}
      />
      <label htmlFor="description" className="block text-lg font-bold mb-2">
        Description
      </label>
      <input
        type="text"
        name="description"
        className="input px-4 py-2 border border-gray-300 rounded-md w-full mb-4"
        onChange={handleChange}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Submit
      </button>
    </form>
  );
}
