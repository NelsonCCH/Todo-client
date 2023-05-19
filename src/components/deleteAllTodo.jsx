import axios from "axios";

export function DeleteAllTodo(props) {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete all todos?")) {
      axios
        .delete("http://localhost:3001/api/todo")
        .then((res) => {
          props.fetchData();
          console.log(`All todos are deleted. ${res.data.message}`);
        })
        .catch((err) => {
          console.log(`Delete failed. ${err.message}`);
        });
    }
  };

  return (
    <div>
      <span
        onClick={handleDelete}
        style={{
          color: "blue",
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        Delete All Todos
      </span>
    </div>
  );
}
