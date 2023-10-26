import React from 'react'


export const Todo = ({ id, title, status, des, deadline, deleteTodo, editTodo, toggleComplete }) => {
  return (
    <div className="Todo">
      <div>
        <p className={`${status == "done" ? "completed" : "incompleted"}`} onClick={() => toggleComplete(id)}>title: {title}</p>
        <p className={`${status == "done" ? "completed" : "incompleted"}`} onClick={() => toggleComplete(id)}>Description: {des}</p>
        <p className={`${status == "done" ? "completed" : "incompleted"}`} onClick={() => toggleComplete(id)}>Dead Line: {deadline}</p>
        <p className={`${status == "done" ? "completed" : "incompleted"}`} onClick={() => toggleComplete(id)}>Status: {status}</p>
        <div>
          {/* <i className="fa fa-pen-to-square edit-icon" onClick={() => editTodo(id)} ></i> */}
          <i className="fa fa-trash delete-icon" onClick={() => deleteTodo(id)} ></i>
        </div>
      </div>

    </div>
  )
}