import React,{useState} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {validateForm}  from "@/utils/validation";
const HTTP = process.env.NEXT_PUBLIC_HTTP_URL;
const RegisterForm = () => {
    const [name, setName] = useState<string>("");   
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
const router = useRouter();

    async function registerUser(e: any) {
        e.preventDefault();
        if (!validateForm(email, password)) {

        }
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
              router.push("/login");
        }
      }
     
return (<form onSubmit={registerUser} className="space-y-4">
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
)}

export default RegisterForm;