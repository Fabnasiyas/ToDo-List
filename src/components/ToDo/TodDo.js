import React, { useState, useRef, useEffect } from "react";
import "./todo.css";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { MdDoneOutline } from "react-icons/md";
const TodDo = () => {
  const [todo, settodo] =
    useState(""); /*this is for taking the typed todos  one by one */
  const [todos, settodos] = useState([]); /*this is for storing the entred todos into a state  */
const [editid,seteditid]=useState(0)

  const addtodo = () => {
    
  if(todo.trim() !== ''){
    settodos([...todos,{list:todo,id:Date.now(),status:false}]); /*spred the existion todos and the new todo */
    settodo(""); /*make the inpyt as empty when the thing is added */
  }    
  if(editid){
    const edittodo=todos.find((todo)=>todo.id===editid)
    const updatetodo=todos.map((to)=>to.id===edittodo.id ? (to ={id:to.id,list:todo}):(to={id:to.id,list:to.list}))
  settodos(updatetodo)
  seteditid(0)
  settodo('')
  }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const inputRef = useRef("null");
  useEffect(() => {
    inputRef.current.focus();
  }); /*used for input field focusing*/

  const onDelete=(id)=>{
   settodos( todos.filter((to)=>to.id !== id))/*to is a new array that contains or filters the all todus except the given id(todo),bcz its need to delete .functions is for updating the values*/
  }
  const onComplete=(id)=>{
      let complete=todos.map((list)=>{
        if(list.id===id){
          return ({...list,status: !list.status})
        }
        return list
      })
      settodos(complete)
  }

    const onEdit=(id)=>{
      const edittodo=todos.find((to)=>to.id===id)
      settodo(edittodo.list)
      seteditid(edittodo.id)
    }

  return (
    <div className="container">
      <h2>TODO APP</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          placeholder="Enter  New Todo"
          ref={inputRef}
          className="form-control"
          onChange={(event) => settodo(event.target.value)}
        />
        <button onClick={addtodo}>{editid ? "Edit":"ADD"}</button>
      </form>
      <div className="list">
        <ul>
          {todos.map((dos) => (
            <li className="list-items">
              <div className="list-item-list" id={dos.status ? "list-item":" " }>{dos.list}</div>
              <span>
                <MdDoneOutline
                  className="list-item-icons"
                  id="complete"
                  title="Complete"
                  onClick={()=>onComplete(dos.id)}
                />
                <BiEdit className="list-item-icons" id="edit" title="Edit" onClick={()=>onEdit(dos.id)}/>
                <MdDeleteOutline
                  className="list-item-icons"
                  id="delete"
                  title="Delete"
                  onClick={()=>onDelete(dos.id)}
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
