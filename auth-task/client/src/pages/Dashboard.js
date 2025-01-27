import React,{useEffect,useState} from "react";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";
const Dashboard = ()=>{
    const navigate = useNavigate()
    const [quote, setQuote] = useState("")
    const [tempQuote, setTempQuote] = useState("")

    async function populateQuote(){
        const res = await fetch("http://localhost:1000/v1/auth/quote",{
            headers:{
                'x-access-token':localStorage.getItem("token")
            }        
    })
    const data = await res.json()
    if(data.status === 'ok'){
        setQuote(data.quote)
    }
    else{
        alert(data.error)
        
    }
    console.log(data)
}
    useEffect(()=>{
        const token = localStorage.getItem("token")
        if(token){
            const user = jwtDecode(token)
            if(!user){
                localStorage.removeItem("token")
                navigate("/login")
            }
            else{
                populateQuote()
            }
        }
        else{
            navigate("/dashboard")
        }
    },[navigate])

     async function updateQuote(e){
        e.preventDefault()
        const res = await fetch("http://localhost:1000/v1/auth/quote",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                
                'x-access-token':localStorage.getItem("token")
            },
            body: JSON.stringify({
                quote: tempQuote
            })
    })
    const data = await res.json()
    if(data.status === 'ok'){
        setQuote(data.user)

        setTempQuote("")
    }
    else{
        alert(data.error)
        
    }
    console.log(data)

    }
    return(
        <div>
            <h1>Welcome to the site </h1>
            <p> Your quote : {quote || "Not Found"}</p>
            <form onSubmit={updateQuote}>
                <input type="text" placeholder="Enter your quote" value={tempQuote} 
                onChange={(e) => setTempQuote(e.target.value)}/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}
export default Dashboard;