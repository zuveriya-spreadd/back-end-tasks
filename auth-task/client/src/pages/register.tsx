import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RegisterForm from "../components/registerForm";
const HTTP = process.env.NEXT_PUBLIC_HTTP_URL ;

function Register() {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white shadow-lg rounded-lg max-w-sm w-full p-8 space-y-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800">Registration</h1>

       <RegisterForm />
      </div>
    </div>
  );
}

export default Register;
