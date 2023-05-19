import "../styles/showTodoList.css";

export function TodoList(props) {
  function TodoTask({ data }) {
    const { _id, content, complete } = data;
    return (
      <div key={_id}>
        <div className="task-container">
          <div className="checkbox-container">
            <input
              type="checkbox"
              id={_id}
              className="checkbox"
              checked={complete}
              onChange={() => props.handleCheckBox(_id)}
            />
            <label>{content}</label>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section>
      <h1>Todo</h1>
      <hr className="thick-line" />
      <div>
        {props.todoList.map((todo) => (
          <TodoTask key={todo._id} data={todo} />
        ))}
      </div>
    </section>
  );
}
