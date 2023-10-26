import React, { useEffect, useState } from "react";
import { Todo } from "./Todo";
import TodoForm from "./TodoForm";
// import { v4 as uuidv4 } from "uuid";
// import { EditTodoForm } from "./EditTodoForm";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../redux/apiSlice";
import jwtDecode from "jwt-decode";
import axios from "axios";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const userToken = localStorage.getItem("userToken")
  const decoded = jwtDecode(userToken)
  let { userData } = useSelector((state) => state.apiCall)
  const dispatch = useDispatch()

  // const addTodo = (todo) => {
  //   setTodos([
  //     ...todos,
  //     { id: uuidv4(), task: todo, completed: false, isEditing: false },
  //   ]);
  // }

  async function deleteTodo(id) {
    console.log(id)
    await axios.delete(`https://trelloapp.onrender.com/deleteTask/${id}`,
      {
        headers: { authorization: `Bearer ${userToken}` },
      }
    ).then(
      (res) => {
        if (res?.data?.message === "task deleted") {
          dispatch(getUserData(decoded.id));
          setTodos(userData?.taskId || []);
        }
      }
    ).catch((err) => {
      console.log()
    })
  }
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo._id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }
  // const editTodo = (id) => {
  //   setTodos(
  //     todos.map((todo) =>
  //       todo._id === id ? { ...todo, isEditing: !todo.isEditing } : todo
  //     )
  //   );
  // }

  // const editTask = (task, id) => {
  //   setTodos(
  //     todos.map((todo) =>
  //       todo._id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
  //     )
  //   );
  // };
  useEffect(() => {
    dispatch(getUserData(decoded.id));
  }, [decoded.id, dispatch]);

  useEffect(() => {
    if (Array.isArray(userData?.taskId)) {
      setTodos(userData?.taskId || []);
      console.log(todos)
    }
  }, [userData]);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 mt-4">
          <div className="w-100 d-flex justify-content-around">
            <h1>Get Things Done !</h1>
            <TodoForm />
          </div>
        </div>
        <div className="row">
          {/* display todos */}
          {todos.map((todo) =>
          // todo.isEditing ? (
          //   // <EditTodoForm editTodo={editTask} task={todo} />
          // ) 
          (
            <div className="col-md-4">
              <Todo
                key={todo._id}
                title={todo.title}
                des={todo.des}
                status={todo.status}
                deadline={todo.deadline}
                deleteTodo={() => deleteTodo(todo._id)}
                // editTodo={() => { editTodo(todo._id) }}
                toggleComplete={toggleComplete}
              />
            </div>
          )
          )}
        </div>
      </div>
    </div>
  );
};
export default TodoWrapper;
