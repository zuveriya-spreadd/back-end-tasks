import axios from "axios";
import React, { useReducer, useEffect } from "react";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

// const API = process.env.REACT_APP_REST_API;
const API = "http://localhost:1000/v1/todos/";

const initialState = {
  todoList: [],
  editableId: null,
  newTask: "",
  editTask: "",
  newStatus: "",
  editStatus: "",
  newDeadline: "",
  editDeadline: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TODO_LIST":
      return { ...state, todoList: action.todoList };
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_EDITABLE":
      return {
        ...state,
        editableId: action.id,
        editTask: action.task,
        editStatus: action.status,
        editDeadline: action.deadline,
      };
    case "RESET_EDITABLE":
      return {
        ...state,
        editableId: null,
        editTask: "",
        editStatus: "",
        editDeadline: "",
      };
    default:
      return state;
  }
};

function Todo() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios
      .get(API)
      .then((res) => {
        dispatch({ type: "SET_TODO_LIST", todoList: res.data });
      })
      .catch((err) => console.error(err));
  }, []);

  const handleInputChange = (e, field) => {
    dispatch({ type: "SET_FIELD", field, value: e.target.value });
  };

  const toggleEditable = (id) => {
    const todoData = state.todoList.find((data) => data._id === id);
    if (todoData) {
      dispatch({
        type: "SET_EDITABLE",
        id,
        task: todoData.task,
        status: todoData.status,
        deadline: todoData.deadline || "",
      });
    } else {
      dispatch({ type: "RESET_EDITABLE" });
    }
  };

  const addTask = (e) => {
    e.preventDefault();
    const { newTask, newStatus, newDeadline } = state;
    if (!newTask || !newStatus || !newDeadline) {
      alert("All Fields must not be empty!");
      return;
    }
    axios
      .post(API, {
        task: newTask,
        status: newStatus,
        deadline: newDeadline,
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  const saveEditTask = (id) => {
    const { editTask, editStatus, editDeadline } = state;
    const editedData = {
      task: editTask,
      status: editStatus,
      deadline: editDeadline,
    };
    if (!editTask || !editStatus || !editDeadline) {
      alert("All Fields must not be empty!");
      return;
    }
    axios
      .put(API + id, editedData)
      .then((res) => {
        console.log(res);
        dispatch({ type: "RESET_EDITABLE" });
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  const deleteTask = (id) => {
    axios
      .delete(API + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <TodoList
          todoList={state.todoList}
          editableId={state.editableId}
          editTask={state.editTask}
          editStatus={state.editStatus}
          editDeadline={state.editDeadline}
          toggleEditable={toggleEditable}
          saveEditTask={saveEditTask}
          deleteTask={deleteTask}
          handleEditChange={handleInputChange}
        />
      </div>  
    </div>
  );
}

export default Todo;
