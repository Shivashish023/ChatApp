import { useState, useEffect } from 'react'
import './App.css'
import Register from "./components/Register.jsx"
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import io from "socket.io-client"
import { BASE_URL } from './main.jsx'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import SocketContext from './context/SocketContext.jsx'
import { setOnlineUsers, addGroup, removeGroup } from './redux/userSlicer.js'

function App() {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/home" element={<Home/>}/>
      </Route>
    )
  )

  const { authUser } = useSelector(store => store.user);

  useEffect(() => {
    if (!authUser) return;

    const socketio = io(`${BASE_URL}`, {
      query: {
        userId: authUser._id
      }
    });
    setSocket(socketio);

    socketio.on("getOnlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });

    socketio.on("groupCreated", (group) => {
      dispatch(addGroup(group));
    });

    socketio.on("groupDeleted", (data) => {
      dispatch(removeGroup(data.groupId));
    });

    return () => {
      socketio.close();
      setSocket(null);
    };
  }, [authUser, dispatch]);

  return (
    <SocketContext.Provider value={socket}>
      <RouterProvider router={router}/>
    </SocketContext.Provider>
  )
}

export default App
