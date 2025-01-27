import React from "react";

const TodoForm = ({ formData, handleInputChange, handleSubmit }) => {
  return (
    <div className="col-md-5 container mt-5">
      <h2 className="text-center">Add Task</h2>
      <form className="bg-light p-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Task</label>
          <input
            className="form-control"
            type="text"
            placeholder="Enter Task"
            value={formData.newTask}
            onChange={(e) => handleInputChange(e, "newTask")}
          />
        </div>
        <div className="mb-3">
          <label>Status</label>
          <input
            className="form-control"
            type="text"
            placeholder="Enter Status"
            value={formData.newStatus}
            onChange={(e) => handleInputChange(e, "newStatus")}
          />
        </div>
        <div className="mb-3">
          <label>Deadline</label>
          <input
            className="form-control"
            type="datetime-local"
            value={formData.newDeadline}
            onChange={(e) => handleInputChange(e, "newDeadline")}
          />
        </div>
        <button type="submit" className="btn btn-success bt-sm">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TodoForm;