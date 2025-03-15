import React, { useState } from 'react'
import OtherUsers from './OtherUsers'
import {BiSearchAlt2} from "react-icons/bi"
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser, setOtherUsers } from '../redux/userSlicer'
function Sidebar() {
  const dispatch=useDispatch();
const navigate=useNavigate();
const{otherUsers}=useSelector(store=>store.user);
const [search,setSearch]=useState("");
const searchSubmitHandler=(e)=>{
  e.preventDefault();
  const  searchedUser=otherUsers?.find((user)=>user.name.toLowerCase().includes(search.toLowerCase()));
  
  if(searchedUser){
    dispatch(setOtherUsers([searchedUser]))
  }
  else{
    toast.error("User not found!");
  }
}
  const handleLogout= async()=>{
    try{
      const res= await axios.get("http://localhost:3000/api/user/logout");
      navigate("/login");
toast.success(res.data.message);
dispatch(setAuthUser(null));
    }
    catch(error){
      console.log(error);
    }
  }
  return (
    <div className="w-full max-w-md mx-auto h-screen bg-gray-800 text-white p-4">
    <h2 className="text-xl font-bold mb-4">Users</h2>
    <form action="" onSubmit={searchSubmitHandler}>
        <label className="input input-bordered flex items-center gap-2 mb-1 bg-gray-700">
            <input type="text"
                className="grow"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
            />
            <button type='submit' className="transform transition-transform duration-200 hover:scale-110">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd" />
                </svg>
            </button>
        </label>
    </form>
    <div className='overflow-auto h-[calc(100vh-200px)] rounded-lg border border-gray-700'>
        <OtherUsers />
    </div>
    <div className="mt-4">
        <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded transition duration-300 ease-in-out">
            Logout
        </button>
    </div>
</div>
  )
}

export default Sidebar