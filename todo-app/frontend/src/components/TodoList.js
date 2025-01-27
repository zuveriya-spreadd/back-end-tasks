import React from "react";
import AddTodo from "./AddTodo";

const TodoList = ({ todoList, editableId, editTask, editStatus, editDeadline, toggleEditable, saveEditTask, deleteTask, handleEditChange }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Task</th>
            <th scope="col">Status</th>
            <th scope="col">Deadline</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {Array.isArray(todoList) ? (
          <tbody>
            {todoList.map((data) => (
              <tr key={data._id}>
                <td>{data.id}</td>
                <td>
                
                  {editableId === data._id ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editTask}
                      onChange={(e) => handleEditChange(e, "editTask")}
                    />
                  ) : (
                    data.task
                  )}
                </td>
                <td>
                  {editableId === data._id ? (
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => handleEditChange(e, "editStatus")}
                      value={editStatus}
                    />
                  ) : (
                    data.status
                  )}
                </td>
                <td>
                  {editableId === data._id ? (
                    <input
                      type="datetime-local"
                      className="form-control"
                      onChange={(e) => handleEditChange(e, "editDeadline")}
                      value={editDeadline}
                    />
                  ) : data.deadline ? (
                    new Date(data.deadline).toLocaleString()
                  ) : (
                    ""
                  )}
                </td>
                <td>
                
                    
                  {editableId === data._id ? (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => saveEditTask(data._id)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => toggleEditable(data._id)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="btn btn-danger btn-sm ml-1"
                    onClick={() => deleteTask(data._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan="4">Loading...</td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default TodoList;