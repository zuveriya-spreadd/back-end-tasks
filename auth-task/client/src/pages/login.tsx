import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoginForm  from "../components/loginForm";
const HTTP = process.env.NEXT_PUBLIC_HTTP_URL;

function Login() {
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
      <div className="bg-white shadow-lg rounded-lg max-w-sm w-full p-8 space-y-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800">Login</h1>
        <LoginForm />
       
      </div>
    </div>
  );
}

export default Login;
