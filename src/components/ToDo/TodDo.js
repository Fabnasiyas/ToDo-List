
import React, { useState, useRef, useEffect } from "react";
import "./todo.css";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { MdDoneOutline } from "react-icons/md";

const TodDo = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const addTodo = () => {
    if (todo.trim() !== "") {
      if (editId) {
        const updatedTodos = todos.map((todoItem) =>
          todoItem.id === editId ? { ...todoItem, list: todo } : todoItem
        );
        setTodos(updatedTodos);
        setEditId(0);
        localStorage.setItem("todos", JSON.stringify(updatedTodos)); // Update local storage
      } else {
        const newTodo = {
          list: todo,
          id: Date.now(),
          status: false,
        };
        setTodos([...todos, newTodo]);
        localStorage.setItem(
          "todos",
          JSON.stringify([...todos, newTodo])
        ); // Update local storage
      }
      setTodo("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
    if (localStorage.getItem("todos")) {
      setTodos(JSON.parse(localStorage.getItem("todos")));
    }
  }, []);

  const onDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos)); // Update local storage
  };

  const onComplete = (id) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) => {
        if (todo.id === id && !todo.status) {
          return { ...todo, status: true };
        }
        return todo;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos)); // Update local storage
      return updatedTodos;
    });
  };

  const onEdit = (id) => {
    const editTodo = todos.find((todo) => todo.id === id);
    if (!editTodo.status) {
      setTodo(editTodo.list);
      setEditId(editTodo.id);
    }
  };

  return (
    <div className="container">
      <h2>TODO APP</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          placeholder="Enter New Todo"
          ref={inputRef}
          className="form-control"
          onChange={(event) => setTodo(event.target.value)}
        />
        <button onClick={addTodo}>{editId ? "Edit" : "ADD"}</button>
      </form>
      <div className="list">
        <ul>
          {todos.map((todo) => (
            <li className="list-items" key={todo.id}>
              <div className="list-item-list" id={todo.status ? "list-item":" " }>{todo.list}</div>
              <span>
                {!todo.status && (
                  <MdDoneOutline
                    className="list-item-icons"
                    id="complete"
                    title="Complete"
                    onClick={() => onComplete(todo.id)}
                  />
                )}
                 <BiEdit className="list-item-icons" id="edit" title="Edit" onClick={()=>onEdit(todo.id)}/>
                <MdDeleteOutline
                  className="list-item-icons"
                  id="delete"
                  title="Delete"
                  onClick={()=>onDelete(todo.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodDo;


