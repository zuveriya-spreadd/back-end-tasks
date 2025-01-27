import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
function Login() {
  const navigate = useNavigate()
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  async function loginUser(e) {
    e.preventDefault();
    const res =  await fetch("http://localhost:1000/v1/auth/login",{
      method:'POST',
      headers : {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        email,
        password
      }),
      
    })

    const data = await res.json()
    if(data.status === 'ok')
      {
        localStorage.setItem("token",data.user)
        alert('Logged In')
        navigate('/dashboard')
      }
    else
      alert('Check Email & Password')
    console.log(data)
    
  }
  return (
    <div className="App">
      <header className="App-header">
      <h1>Login</h1>        

      </header>
      <div>
        <form onSubmit={loginUser}>
           
           <br/><br/>
           <input type='email' name="email" value={email}
           onChange={(e)=> setEmail(e.target.value)} placeholder='Enter Email' className='form-control mt-2' />
           <br/><br/>

           <input type='password' name="password" value={password}
           onChange={(e)=> setPassword(e.target.value)} placeholder='Enter Password' className='form-control mt-2'/>
           <br/><br/>

           <button className='btn btn-primary btn-lg'>Login</button>
           <br></br>
           Don't have an Account <a href="/"> Register</a>
        </form>
      </div>
    </div>
  );
}

export default Login;
