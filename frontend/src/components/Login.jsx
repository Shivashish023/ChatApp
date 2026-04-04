import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlicer.js";
import { BASE_URL } from "../main.jsx";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/api/user/login`,
        user,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        navigate("/home");
        dispatch(setAuthUser(response.data));
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    // setUser({
    // username:"",
    // password:"",
    // })
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-black">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="input input-bordered flex items-center gap-2 bg-gray-100 text-black text-sm sm:text-base">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70 text-black flex-shrink-0"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                id="email"
                autoComplete="off"
                className="grow"
                placeholder="Email"
              />
            </label>
          </div>

          <div className="mb-6">
            <label className="input input-bordered flex items-center gap-2 bg-gray-100 text-black text-sm sm:text-base">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70 text-black flex-shrink-0"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                id="password"
                className="grow"
                placeholder="Password"
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2.5 sm:p-2 rounded-md hover:bg-blue-600 active:bg-blue-700 transition duration-200 text-sm sm:text-base font-medium"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-500 text-sm sm:text-base">
          Don't have an account?
          <Link to="/register">
            <button className="text-blue-500 ml-1 hover:underline">Register</button>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
