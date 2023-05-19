import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import "../styles/createTodo.css";

export function CreateTodo(props) {
  const [newTodo, setnewTodo] = useState("");

  function handleChange(e) {
    setnewTodo(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log(newTodo);

    const data = { content: newTodo };

    axios
      .post(`${API_BASE_URL}`, data)
      .then((res) => {
        setnewTodo("");
        props.fetchData();
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(`Create new Todo fail. ${err.message}`);
      });
  }

  return (
    <section>
      <section className="contents">
        <form onSubmit={handleSubmit} className="form-container" noValidate>
          <label className="label" htmlFor="newTodo"></label>

          <input
            name="newTodo"
            value={newTodo || ""}
            onChange={handleChange}
            className="new-todo-input"
            rows="1"
          />

          <button type="submit" className="button">
            Add
          </button>
        </form>
      </section>
    </section>
  );
}
