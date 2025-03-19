import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authActions } from "../components/store/auth";
import { useDispatch } from "react-redux";
const LoginPage = () => {
  const [Values, setValues] = useState({
    username: "",
    password: ""
  });

  const navigate =useNavigate();
  const dispatch=useDispatch();
  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (Values.username === "" || Values.password === "" ) {
        alert("All Field Required")
      }
      else{
        const response=await axios.post("http://localhost:1000/api/v1/sign-in",Values)
        dispatch(authActions.login())
        dispatch(authActions.changeRole(response.data.role))
        localStorage.setItem("id",response.data.id)
        localStorage.setItem("token",response.data.token)
        localStorage.setItem("role",response.data.role)
        navigate("/profile")
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900">
      <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          Login
        </h2>
        <form onSubmit={submit}>
          <label className="block text-zinc-300">Username</label>
          <input
            type="text"
            className="w-full p-2 mb-4 bg-zinc-700 text-white rounded border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
            name="username"
            required
            value={Values.username}
            onChange={change}
          />

          <label className="block text-zinc-300">Password</label>
          <input
            type="password"
            className="w-full p-2 mb-4 bg-zinc-700 text-white rounded border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            name="password"
            required
            value={Values.password}
            onChange={change}
          />

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <div className="text-center text-zinc-400 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;