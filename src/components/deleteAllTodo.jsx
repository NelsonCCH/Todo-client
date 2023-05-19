import axios from "axios";

export function DeleteAllTodo(){

    const handleDelete = () =>{
        axios
            .delete("http://localhost:3001/api/todo")
            .then((res)=>{
                console.log(`All todos are deleted. ${res.data.message}`)
            }).catch((err)=>{
                console.log(`Delete failed. ${err.message}`)
            })
    }

    return (
          <div>
            <a href="#" onClick={handleDelete} style={{ color: "blue", textDecoration: "underline" }}>
              Delete All Todos
            </a>
          </div>
      );
      
}


