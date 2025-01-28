import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
const HTTP = process.env.NEXT_PUBLIC_HTTP_URL || "http://localhost:1000/v1/auth/";

function Login() {
  const router = useRouter();
  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function loginUser(e:any) {
    e.preventDefault();
    // if (!validateForm()) {
    //   return false;
    // };

    try {
      const res = await fetch(`${HTTP}login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      console.log("Response:", data);  
      if (data.status === "ok") {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  }
  function validateForm() {
    
    if (email.length === 0 || password.length === 0 ) {
      return false;
    }
    if (email.includes('@') && email.includes('.')) {
      return true;
    }
    if (password.length < 6 || password.length > 12) {
      console.log('Password should be between 6 to 12 characters');
      return false;  
    } else {
      return false;
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
      <div className="bg-white shadow-lg rounded-lg max-w-sm w-full p-8 space-y-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800">Login</h1>

        <form onSubmit={loginUser} className="space-y-4">
          

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
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              onClick={loginUser}
              className="w-full py-2 bg-purple-600 text-white font-medium rounded-lg shadow-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              Login
            </button>
          </div>

          <div className="text-center text-sm text-gray-600">
  <p>
    Don't have an account?{" "}
    <Link href="/" className="text-purple-600 hover:underline">
      Register
    </Link>
  </p>
</div>

        </form>
      </div>
    </div>
  );
}

export default Login;
