import "../styles/showTodoList.css";

// List all received data in props
export function DoneList(props) {
  function DoneTodoTask({ data }) {
    const { _id, content, complete } = data;
    return (
      <div key={_id}>
        <div className="task-container">
          <div className="checkbox-container">
            <input
              type="checkbox"
              id={`todo_${_id}`}
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
      <h1>Done</h1>
      <hr className="thick-line" />
      <div>
        {props.doneList.map((doneTodo) => (
          <DoneTodoTask key={doneTodo._id} data={doneTodo} />
        ))}
      </div>
    </section>
  );
}
