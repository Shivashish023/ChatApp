import { useState,useEffect } from 'react'
import './App.css'
import profimg from "./assets/profimg.webp"
import axios from "axios"
import Register from "./components/Register.jsx"
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import io from "socket.io-client"
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { setSocket } from './redux/socketSlice.js'
import { setOnlineUsers } from './redux/userSlicer.js'

function App() {
const dispatch=useDispatch();
 const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route index element={<Login />} />
       <Route path="/login" element={<Login/>}/>
       <Route path="/register" element={<Register/>}/>
       <Route path="/home" element={<Home/>}/>
      </Route>
   
  )
 )

 const {authUser}=useSelector(store=>store.user);
const {socket}=useSelector(store=>store.socket)
 useEffect(() => {
  if(authUser){
    const socketio=io('https://chat-app-server-six-lac.vercel.app/',{
      query:{
        userId:authUser._id
      }
    });
    dispatch(setSocket(socketio));

    socketio?.on("getOnlineUsers",(onlineUsers)=>{
      dispatch(setOnlineUsers(onlineUsers));
    });

    return ()=>socketio.close();
  }
  else{
    if(socket){
      socket.close();
      dispatch(setSocket(null ))
    }
  } 
  
 }, [authUser]);
 
 

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
 
  )
}

export default App
