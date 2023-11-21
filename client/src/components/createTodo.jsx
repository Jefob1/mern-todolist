import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export function CreateTodo() {
  const [data, setData] = useState({ title: "", description: "" });

  function handleChange(e) {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const todo = {
      title: data.title,
      description: data.description,
    };

    console.log({ todo });
    axios
      .post("http://localhost:8000/api/todo", data)
      .then((res) => {
        setData({ title: "", description: "" });
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log("Error couldn't create TODO");
        console.log(err.message);
      });
  }

  return (
    <section className="container mx-auto p-8">
      <Link to="/" className="button-back">
        <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Back
        </button>
      </Link>
      <section className="contents">
        <form onSubmit={handleSubmit} className="form-container mt-4" noValidate>
          <label className="text-lg font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            className="input px-4 py-2 border border-gray-300 rounded-md w-full mb-4"
          />
          <label className="text-lg font-bold mb-2" htmlFor="description">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={data.description}
            onChange={handleChange}
            className="input px-4 py-2 border border-gray-300 rounded-md w-full mb-4"
          />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
            Create Todo
          </button>
        </form>
      </section>
    </section>
  );
}
