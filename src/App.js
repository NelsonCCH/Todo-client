import "./styles/app.css"
import { useState, useEffect } from "react";
import axios from "axios";
import { TodoList } from "./components/showTodoList"
import { DoneList } from "./components/showDoneList";
import { CreateTodo } from "./components/createTodo";
import { DeleteAllTodo } from "./components/deleteAllTodo";

function App() {
  const [todo, setTodo] = useState([]);
  const [doneList, setdoneList] = useState([])

  const fetchTodo = () => {
    axios
      .get("http://localhost:3001/api/todo/pending_todo")
      .then((res) => {
        console.log(res.data);
        setTodo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchDone = () => {
    axios
      .get("http://localhost:3001/api/todo/done_todo")
      .then((res) => {
        console.log(res.data);
        setdoneList(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };



  useEffect(() => {
    fetchTodo(); // Fetch the initial todo data
    fetchDone()
  }, []);

  const handleCheckBox = (id) => {
    axios
      .put(`http://localhost:3001/api/todo/${id}`)
      .then((res) => {
        console.log(`Toggle successful: ${res.data}`);
        // Fetch the updated todo data
        fetchTodo();
        fetchDone()
      })
      .catch((err) => {
        console.log(`Toggle failed. Error: ${err.message}`);
      });
  };

  return (
    <div className="App">
      <h1>Marvelous v2.0</h1>
      <div className="delete-all-todo-container">
        <DeleteAllTodo />
      </div>
      <div className="create-todo-container">
        <CreateTodo fetchTodo={fetchTodo}/>
      </div>
      <div className="todo-done-container">
        <div className="todo-list-container">
          <TodoList todo={todo} handleCheckBox={handleCheckBox} />
        </div>
        <div className="done-list-container">
          <DoneList doneList={doneList} handleCheckBox={handleCheckBox}/>
        </div>
      </div>
    </div>
  );
}


export default App;