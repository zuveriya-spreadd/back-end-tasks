import React,{ useState } from 'react';

import './App.css';

function App() {
  const [loginData, setLoginData] = useState({
    username:'',
    password:''
  });
  const handleChange = (e)=>{
    const {name,value} = e.target;
    setLoginData({
      ...loginData,
      [name]:value
    })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      const res = await
      fetch("http://localhost:1000/login",{
        method:'POST',
        headers :{
          'Content-Type' : 'application/json'
        },
        body:JSON.stringify(loginData)
      })
      if(res.ok){
        console.log("Login Successful")
        setLoginData({
          username:"",
          password:""
        })
      }
      else{
        console.log("Failed to login")
      }
    }
    catch(err){
      console.error("Login Failed")
    }
  }
  return (
    <div className="App">
        <h1>Login Form</h1>
        
        <input type='text' onChange={(e)=> 
        handleChange(e) } className='user' 
        name='username' placeholder='Enter the username' value={loginData.username} />

        <input type='password' onChange={(e) => handleChange(e)} 
        className='password' name='password' placeholder='Enter the password' value={loginData.password} />

        <button onClick={handleSubmit} className='btn'> Login</button>
    </div>
    
  );
}

export default App;
