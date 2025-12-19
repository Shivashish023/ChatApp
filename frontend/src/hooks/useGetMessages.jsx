import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../main';
import { setMessages } from '../redux/messageSlice';
function useGetMessages() {
 const{selectedUser, selectedGroup, chatType}=useSelector(store=>store.user);

 const dispatch=useDispatch();
    useEffect(() => {
    const fetchMessages=async()=>{
      if((chatType==="user" && !selectedUser) || (chatType==="group" && !selectedGroup)){
        dispatch(setMessages([]));
        return;
      }
     
  try{
    axios.defaults.withCredentials=true;
    let res;
    if(chatType==="group"){
      res= await axios.get(`${BASE_URL}/api/message/${selectedGroup?._id}?type=group`);
    } else {
      res= await axios.get(`${BASE_URL}/api/message/${selectedUser?._id}?type=user`);
    }
    console.log(res);
    dispatch(setMessages(res.data || []))
  }
  catch(error){
    console.log(error);
    dispatch(setMessages([]));
  }
}
 fetchMessages();
    }, [selectedUser, selectedGroup, chatType, dispatch])
    

}

export default useGetMessages