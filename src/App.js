import "./styles/app.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { TodoList } from "./components/showTodoList";
import { DoneList } from "./components/showDoneList";
import { CreateTodo } from "./components/createTodo";
import { DeleteAllTodo } from "./components/deleteAllTodo";
import { SearchBar } from "./components/searchBar";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [doneList, setDoneList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter the todo and doneList based on searchTerm,
  // this will be run everytime setSearchTerm is called and triggering App to rerender
  const filteredTodo = todoList.filter((todo) =>
    todo.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredDoneList = doneList.filter((done) =>
    done.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchTodo = () => {
    axios
      .get("http://localhost:3001/api/todo/pending_todo")
      .then((res) => {
        console.log(res.data);
        setTodoList(res.data);
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
        setDoneList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchData = () => {
    fetchTodo();
    fetchDone();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckBox = (id) => {
    axios
      .put(`http://localhost:3001/api/todo/${id}`)
      .then((res) => {
        console.log(`Toggle successful: ${res.data}`);
        fetchData();
      })
      .catch((err) => {
        console.log(`Toggle failed. Error: ${err.message}`);
      });
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Marvelous v2.0</h1>
        <div className="delete-all-todo-container">
          <DeleteAllTodo fetchData={fetchData} />
        </div>
      </div>
      <div className="search-create-container">
        <div className="create-todo-container">
          <CreateTodo fetchData={fetchData} />
        </div>
        <div>
          <SearchBar
            className="search-container"
            setSearchTerm={setSearchTerm}
          />
        </div>
      </div>
      <div className="todo-done-container">
        <div className="todo-list-container">
          <TodoList todoList={filteredTodo} handleCheckBox={handleCheckBox} />
        </div>
        <div className="done-list-container">
          <DoneList
            doneList={filteredDoneList}
            handleCheckBox={handleCheckBox}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
