import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast,Toaster} from 'react-hot-toast';
import { BASE_URL } from '../main';
function Register() {
    const navigate=useNavigate();
const [user, setUser] = useState({
    name:"",
    username:"",
    password:"",
    gender:""
})
const handleCheckbox=(gender)=>{
    setUser({...user,gender})
}
const handleSubmit= async(e)=>{
    e.preventDefault();
    try{
        const response=await axios.post(`${BASE_URL}/api/user/register`,user,{
            withCredentials:true
        });
      if(response.data.success){
        navigate("/login");
            toast.success(response.data.message);
      }  
    
    }catch(error){
        toast.error(error.response.data.message);
        console.log(error);
      
    }
    setUser({
        name:"",
    username:"",
    password:"",
    gender:""
    })
 }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Register</h2>
        <form onSubmit={handleSubmit} action="">
          <div className="mb-6">
              <input type="text"
              value={user.name}
              autoComplete='off'
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              placeholder="Name"
              id="name" className="input input-bordered w-full max-w-xs bg-gray-100 text-black " />
          </div>

          <div className="mb-4 ">
          <label className="input input-bordered flex items-center gap-2 bg-gray-100 text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70 text-black"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                value={user.username}
                autoComplete='off'
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                id="username"
                className="grow"
                placeholder="Username"
              />
            </label>
          </div>

          <div className="mb-6">
          <label className="input input-bordered flex items-center gap-2 bg-gray-100 text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70 text-black"
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

          <div className="mb-6 flex gap-3">
            <div className="flex items-center">
              <p className='text-black'>Male:</p>
              <input 
               checked={user.gender==="male"}
               onChange={()=>handleCheckbox("male")}
               type="checkbox" defaultChecked className="size-4 mx-1 bg-gray-100" />
            </div>
            <div className="flex items-center">
              <p className='text-black'>Female:</p>
              <input 
              checked={user.gender==="female"}
              onChange={()=>handleCheckbox("female")}
              type="checkbox" defaultChecked className="size-4 mx-1" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            {" "}
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-gray-500">
          Already have an account?
          <Link to="/login">
            <button className="text-blue-500 ml-1">Login</button>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;