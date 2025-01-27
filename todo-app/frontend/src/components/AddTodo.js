import React, { useReducer } from "react";
import axios from "axios";

const API = "http://localhost:1000/v1/todos/";

const initialState = {
  newTask: "",
  newStatus: "",
  newDeadline: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const AddTodo = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInputChange = (e, field) => {
    dispatch({ type: "SET_FIELD", field, value: e.target.value });
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
        dispatch({ type: "RESET" });
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="col-md-5 container mt-5">
      <h2 className="text-center">Add Task</h2>
      <form className="bg-light p-4">
        <div className="mb-3">
          <label>Task</label>
          <input
            className="form-control"
            type="text"
            placeholder="Enter Task"
            value={state.newTask}
            onChange={(e) => handleInputChange(e, "newTask")}
          />
        </div>
        <div className="mb-3">
          <label>Status</label>
          <input
            className="form-control"
            type="text"
            placeholder="Enter Status"
            value={state.newStatus}
            onChange={(e) => handleInputChange(e, "newStatus")}
          />
        </div>
        <div className="mb-3">
          <label>Deadline</label>
          <input
            className="form-control"
            type="datetime-local"
            value={state.newDeadline}
            onChange={(e) => handleInputChange(e, "newDeadline")}
          />
        </div>
        <button onClick={addTask} className="btn btn-success bt-sm">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTodo;