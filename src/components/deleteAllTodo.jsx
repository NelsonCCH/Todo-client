import axios from "axios";
import { API_BASE_URL } from "../config";

// first confirm user with prompt, then send delete request and re-fetch both todo and done list
export function DeleteAllTodo(props) {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete all todos?")) {
      axios
        .delete(`${API_BASE_URL}`)
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
