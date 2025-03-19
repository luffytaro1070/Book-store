import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: ""
  });

  const navigate =useNavigate();
  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (Values.username === "" || Values.email === "" || Values.password === "" || Values.address === "") {
        alert("All Field Required")
      }
      else{
        const response=await axios.post("http://localhost:1000/api/v1/sign-up",Values)
        console.log(response.data)
        navigate('/login')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900">
      <div className="bg-zinc-800 p-6 rounded-lg shadow-md w-96">
        <h2 className="text-white text-2xl font-semibold text-center mb-4">Sign Up</h2>

        <label className="text-zinc-300 block mb-1">Username</label>
        <input type="text" name="username" value={Values.username} onChange={change}
          className="w-full p-2 mb-3 rounded bg-zinc-700 text-white border border-zinc-600"
          placeholder="username" required />

        <label className="text-zinc-300 block mb-1">Email</label>
        <input type="email" name="email" value={Values.email} onChange={change}
          className="w-full p-2 mb-3 rounded bg-zinc-700 text-white border border-zinc-600"
          placeholder="xyz@example.com" required />

        <label className="text-zinc-300 block mb-1">Password</label>
        <input type="password" name="password" value={Values.password} onChange={change}
          className="w-full p-2 mb-3 rounded bg-zinc-700 text-white border border-zinc-600"
          placeholder="password" required />

        <label className="text-zinc-300 block mb-1">Address</label>
        <textarea name="address" value={Values.address} onChange={change}
          className="w-full p-2 mb-3 rounded bg-zinc-700 text-white border border-zinc-600"
          placeholder="address" required ></textarea>

        <button onClick={submit} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded mb-4">SignUp</button>

        <p className="text-zinc-400 text-center">Or</p>

        <p className="text-zinc-400 text-center mt-2">
          Already have an account? <Link className="text-blue-500" to="/login">Login</Link>
        </p>
      </div>

    </div>
  );
};

export default SignUp;
