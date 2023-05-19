import "./styles/app.css"
import { TodoList } from "./components/showTodoList"
import { DoneList } from "./components/showDoneList";
import { CreateTodo } from "./components/createTodo";
import { DeleteAllTodo } from "./components/deleteAllTodo";

function App() {
  return (
    <div className="App">
      <h1>Marvelous v2.0</h1>
      <div className="delete-all-todo-container">
        <DeleteAllTodo />
      </div>
      <div className="create-todo-container">
        <CreateTodo />
      </div>
      <div className="todo-done-container">
        <div className="todo-list-container">
          <TodoList />
        </div>
        <div className="done-list-container">
          <DoneList />
        </div>
      </div>
    </div>
  );
}


export default App;