import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const HTTP = process.env.NEXT_PUBLIC_HTTP_URL || "http://localhost:1000/v1/auth/";

function Register() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function registerUser(e: any) {
    e.preventDefault();
    if (!validateForm()) {
      return false;} 
    const res = await fetch(`${HTTP}register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data:json = await res.json();
    if (data.status === "ok") {

      console.log("User Registered");
      router.push("/login");
    }
    console.log(data);
  }
  function validateForm() {
    if (name.length > 100) {
      console.log('Name should be less than 100 characters');
      return false;
    }
    if (email.length === 0 || password.length === 0 || name.length === 0) {
      console.log('All fields are required');
      return false;
    }
    if (!email.includes('@') || !email.includes('.')) {
      console.log('Invalid email format');
      return false;
    }
    if (password.length < 6 || password.length > 12) {
      console.log('Password should be between 6 to 12 characters');
      return false;  
    }
    return true;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white shadow-lg rounded-lg max-w-sm w-full p-8 space-y-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800">Registration</h1>

        <form onSubmit={registerUser} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border text-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border text-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border text-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <button
              type="submit" 
              className="w-full py-2 bg-purple-600 text-white font-medium rounded-lg shadow-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              Register
            </button>
          </div>

          <div className="text-center text-sm text-gray-600">
  <p>
    Already have an account?{" "}
    <Link href="/login" className="text-purple-600 hover:underline">
      Login
    </Link>
  </p>
</div>

        </form>
      </div>
    </div>
  );
}

export default Register;
