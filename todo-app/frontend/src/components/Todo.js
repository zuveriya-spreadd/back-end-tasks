import axios from "axios";
import React  from "react";
import { useState,useEffect } from "react";
function Todo(){
    const [todoList,setTodoList] = useState([])
    const [editableId , setEditableId] = useState(null)
    const [newTask, setNewTask] = useState("")
    const [editTask, setEditTask] = useState("")
    const [newStatus, setNewStatus] = useState("")
    const [editStatus, setEditStatus] = useState("")
    const [newDeadline, setNewDeadline] = useState("") 
    const [editDeadline, setEditDeadline] = useState("")

    useEffect(()=>{
        axios.get("http://localhost:1000/getTodo")
        .then(res => {
            setTodoList(res.data)
        })
        .catch(err=> console.error(err))
    },[]) 

    const toggleEditable = (id)=>{
        // const todoData = todoList.find()
        // .then((data) => data._id === id)
        const todoData  = todoList.find((data) => data._id === id);


        if(todoData){
            setEditableId(id)
            setEditTask(todoData.task)
            setEditStatus(todoData.status)
            setEditDeadline(todoData.deadline || "")
        }
        else{
            setEditableId(null)
            setEditTask("")
            setEditStatus("")
            setEditDeadline("")
        }
    }

    //Adding Task 
    const addTask= (e) =>{
        e.preventDefault();
        if(!newTask || !newStatus || !newDeadline){
            alert("All Fields must not be empty!")
            return;
        }
        axios.post("http://localhost:1000/addTodo", {task :newTask , status:newStatus, deadline:newDeadline})
        .then(res =>{
            console.log(res);
            window.location.reload();

        })
        .catch(err => console.error(err));

    }

    //Updating Task
    const saveEditTask= (id) =>{
        const editedData = {
            task:editTask,
            status:editStatus,
            deadline:editDeadline

        }
        if(!editTask || !editStatus || !editDeadline){
            alert("All Fields must not be empty!")
            return;
        }
        axios.post("http://localhost:1000/updateTodo/" + id, editedData)
        .then(res => {
            console.log(res);
            setEditableId(null)
            setEditTask("")
            setEditStatus("")
            setEditDeadline("")
            window.location.reload()
        })
        .catch(err=> console.error(err))
    }

    //Deleting a task
    const deleteTask = (id) =>{
        axios.delete("http://localhost:1000/deleteTodo/" + id)
        .then(res=>{
            console.log(res);
            window.location.reload()
        })
        .catch(err => console.error(err))
    }
    return(
        <div className="container mt-5">
            <div className="row">
                    <h1 className="text-center">
                        Todo App
                    </h1>
                    <div className="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Task</th>
                            <th scope="col">Status</th>
                            <th scope="col">Deadline</th>
                            <th scope="col">Action</th>
                            </tr>   
                        </thead>
                        {Array.isArray(todoList)?(
                        <tbody>
                        
                            {todoList.map((data)=>(
                                <tr key={data._id}>
                                    <td id="SNo">{data.id}</td>
                                    <td>
                                        {editableId === data._id ? (
                                            <input type="text" className="form-control" value={editTask}
                                             onChange={(e)=> setEditTask(e.target.value)} 
                                             />) : (
                                                data.task
                                             )}
                                    </td>
                                    <td>
                                        {editableId === data._id ? (
                                            <input type="text" className="form-control" 
                                            onChange={(e) => setEditStatus(e.target.value)} value={editStatus} />) : 
                                            (   data.status )
                                            }
                                    </td>
                                    <td>
                                        {editableId === data._id ?(
                                            <input type="datetime-local" className="form-control"
                                            onChange={(e) => setEditDeadline(e.target.value)} value={editDeadline} />):
                                            (data.deadline ? new Date(data.deadline).toLocaleString() : ''
                                        ) }
                                    </td>
                                    <td >
                                        {
                                        editableId === data._id ? (
                                            <button className="btn btn-success btn-sm" onClick={() =>saveEditTask(data._id)}>
                                            Save </button> ): 
                                            (<button className="btn btn-primary btn-sm" onClick={() =>toggleEditable(data._id)}>
                                            Edit </button> )}

                                            <button className="btn btn-danger btn-sm ml-1" onClick={() => deleteTask(data._id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                            ))}                            
                        </tbody>
                        ) : (
                            <tbody>
                                <tr>
                                    <td colSpan="4">Loadingg...</td>
                                </tr>
                            </tbody>
                        )}
                        </table>
                    </div>
            </div>
            <div className="col-md-5 container mt-5">
            <h2 className="text-center"> Add Task</h2>
            <form className="bg-light p-4">
                <div className="mb-3">
                    <label>Task</label>
                    <input className="form-control"
                    type="text" placeholder="Enter Status" 
                    onChange={(e)=>{
                        setNewTask(e.target.value)
                    }}/>
                </div>

                <div className="mb-3">
                    <label>Status</label>
                    <input className="form-control"
                    type="text" placeholder="Enter Status"
                    onChange={(e) => setNewStatus(e.target.value)} />

                </div>
                <div className="mb-3">
                    <label>Deadline</label>
                    <input className="form-control"
                    type="datetime-local"
                    onChange={(e) => setNewDeadline(e.target.value)} /> 
                </div>
                <button onClick={addTask} className="btn btn-success bt-sm">Add Task</button>
            </form>
        </div>
        </div>
       
    )
}

export default Todo;
