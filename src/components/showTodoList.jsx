import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/showTodoList.css"

export function TodoList(){
    const [todo, setTodo] = useState([])

    const toggleCheckBox = (id) =>{
        axios
            .put(`http://localhost:3001/api/todo/${id}`)
            .then((res)=>{
                console.log(`toggled successful, ${res.data}`)
            }).catch((res)=>{
                console.log(`toggle failed. Error: ${res.err.message}`)
            })
    }

    function TodoTask({ data }) {
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
                            onChange={() => toggleCheckBox(_id)} 
                        />
                        <label>
                            {content}
                        </label>
                    </div>
    
                    <div className="complete">
                        <p>{complete ? 'Completed' : 'Incomplete'}</p>
                    </div>
                </div>
            </div>
        )
    }

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/todo/pending_todo")
            .then((res)=>{
                console.log(res.data)
                setTodo(res.data)
            })
            .catch((err) =>{
                console.log(err)
            })
    }, [])

    return (
          <section >
            <h1>Todo</h1>
            <hr className="thick-line" />
            <div>
              {todo.map((data) => (
                <TodoTask key={data._id} data={data} />
              ))}
            </div>
          </section>
      )
      
}

