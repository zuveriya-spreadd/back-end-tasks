"use client";

import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";


const HTTP = process.env.NEXT_PUBLIC_HTTP_URL || "http://localhost:1000/v1/auth/";

interface User{
  name: string;
  email: string;
  password: string;
}
const Dashboard = () => {
  const navigate = useRouter();
  const [quote, setQuote] = useState<string>("");
  const [tempQuote, setTempQuote] = useState<string>("");

  async function populateQuote() {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    if (!token) {
        console.log("Token is missing");
        return;
    }

    const res = await fetch(`${HTTP}quote`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      
      
    });

    try {
      const data = await res.json();
      if (data.status === "ok") {
        setQuote(data.quote);
      } else {
        console.log(data.error);
      }
    } catch (e) {
      console.log("JSON Error", e);
    }
}


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user:User = jwtDecode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate.push("/login");
        
      } else {
        populateQuote();
      }
    } else {
      navigate.push("/dashboard");
    }
  }, [navigate]);

  async function updateQuote(e) {
    e.preventDefault();
  
    const res = await fetch(`${HTTP}quote`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        quote: tempQuote, 
      }),
    });
  
    try {
      const data = await res.json();
        if (data.status === "ok" && data.quote) {
          setQuote(data.quote);  
          setTempQuote("");       
        }
        else {
          console.log(data.error || "Failed to update the quote.");
        }
      
    } 
    catch (e) {
      console.log("JSON Error", e);  
      console.log("Response Text:", data);  
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
      
      <h1 className="text-3xl font-bold text-black mb-6 text-center">
        Welcome to the Site
      </h1>

      <div className="flex flex-wrap md:flex-nowrap gap-8 w-full max-w-4xl">
        
        <div className="bg-white p-6 shadow-md rounded-lg w-full md:w-1/2">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Quote:</h2>
          <p className="text-gray-700">{quote || "Not Found"}</p>
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg w-full md:w-1/2">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Update Your Quote</h2>
          <form onSubmit={updateQuote} className="space-y-4">
            
            <div>
              <label className="text-gray-700 font-medium">New Quote</label>
              <input
                type="text"
                placeholder="Enter your quote"
                value={tempQuote}
                onChange={(e) => setTempQuote(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full font-medium rounded-lg py-2 bg-purple-600 text-white hover:bg-purple-500 shadow-md"
              >
                Submit
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
