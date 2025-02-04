import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { setMessages } from '../redux/messageSlice';
function useGetMessages() {
 const{selectedUser}=useSelector(store=>store.user);

 const dispatch=useDispatch();
    useEffect(() => {
    const fetchMessages=async()=>{
     
  try{
    axios.defaults.withCredentials=true;
    const res= await axios.get(`https://chat-app-y4o3.vercel.app/api/message/${selectedUser?._id}`);
    console.log(res);
    dispatch(setMessages(res.data))
  }
  catch(error){
    console.log(error);
  }
}
 fetchMessages();
    }, [selectedUser,dispatch])
    

}

export default useGetMessages