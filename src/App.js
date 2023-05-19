import "./styles/app.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "./config";
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

  // get latest incomplete list of todos and update the state
  const fetchTodo = () => {
    axios
      .get(`${API_BASE_URL}/pending_todo`)
      .then((res) => {
        console.log(res.data);
        setTodoList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // get latest completed list of todos and update the state
  const fetchDone = () => {
    axios
      .get(`${API_BASE_URL}/done_todo`)
      .then((res) => {
        console.log(res.data);
        setDoneList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // helper function to perform both fetch
  const fetchData = () => {
    fetchTodo();
    fetchDone();
  };

  // fetch once when app first starts
  useEffect(() => {
    fetchData();
  }, []);

  // send put request to toggle the completeness of the todo, then re-fetch both todo and done list
  const handleCheckBox = (id) => {
    axios
      .put(`${API_BASE_URL}/${id}`)
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
