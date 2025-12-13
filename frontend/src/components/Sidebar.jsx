import React, { useState } from 'react'
import OtherUsers from './OtherUsers'
import {BiSearchAlt2} from "react-icons/bi"
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser, setOtherUsers } from '../redux/userSlicer'
import { BASE_URL } from '../main.jsx'

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
      const res= await axios.get(`${BASE_URL}/api/user/logout`, {
        withCredentials: true
      });
      navigate("/login");
toast.success(res.data.message);
dispatch(setAuthUser(null));
    }
    catch(error){
      console.log(error);
    }
  }
  return (
    <div className="w-full h-screen bg-gray-800 text-white p-2 sm:p-4 flex flex-col">
      <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 px-2">Users</h2>
      <form action="" onSubmit={searchSubmitHandler} className="px-2">
        <div className="input input-bordered flex items-center gap-2 mb-2 bg-gray-700 text-sm sm:text-base min-w-0">
          <input 
            type="text"
            className="grow min-w-0 flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />
          <button 
            type='submit' 
            className="flex-shrink-0 p-1 transform transition-transform duration-200 hover:scale-110 active:scale-95 flex items-center justify-center"
            aria-label="Search users"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 sm:h-5 sm:w-5 opacity-70 flex-shrink-0">
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </form>
      <div className='flex-1 overflow-auto rounded-lg border border-gray-700 mb-2 sm:mb-4'>
        <OtherUsers />
      </div>
      <div className="px-2 pb-2 sm:pb-4">
        <button 
          onClick={handleLogout} 
          className="w-full sm:w-auto bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold py-2 px-4 sm:px-3 rounded transition duration-300 ease-in-out text-sm sm:text-base"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar