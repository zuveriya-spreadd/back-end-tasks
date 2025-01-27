import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'

import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
function Register() {
  const navigate = useNavigate()
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  async function registerUser(e) {
    e.preventDefault()
    const res =  await fetch("http://localhost:1000/v1/auth/register",{
      method:'POST',
      headers : {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password
      }),
      
    })

    const data = await res.json()
    if(data.status === 'ok')
      {
        alert('User Registered')
        navigate('/login')
      }
    else
      alert('Email Already Exists')
    console.log(data)
    
  }
  return (
    <div className="App">
      <header className="App-header">
      <h1>Registration</h1>        

      </header>
      <div>
        <form onSubmit={registerUser}>
           <input type='text' name="name"  value={name}
           onChange={(e)=> setName(e.target.value)} placeholder='Enter Name' className='form-control mt-5' />
           <br/><br/>
           <input type='email' name="email" value={email}
           onChange={(e)=> setEmail(e.target.value)} placeholder='Enter Email' className='form-control mt-2' />
           <br/><br/>

           <input type='password' name="password" value={password}
           onChange={(e)=> setPassword(e.target.value)} placeholder='Enter Password' className='form-control mt-2'/>
           <br/><br/>

           <button className='btn btn-primary btn-lg'>Register</button>
           <br></br>
           Already have an Account <a href="./login"> Login</a>
        </form>
      </div>
    </div>
  );
}

export default Register;
