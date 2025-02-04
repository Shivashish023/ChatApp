import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setOtherUsers } from '../redux/userSlicer';
const useGetOtherUsers = () => {
    const dispatch=useDispatch();
   useEffect(() => {
   
        const fetchOtherUsers=async()=>{
            try{
                axios.defaults.withCredentials=true
            const res=await axios.get("https://chat-app-y4o3.vercel.app/api/user/")
            console.log(res);
            dispatch(setOtherUsers( res.data));
        }
    
    catch(error){
        console.log(error);
    }
}
fetchOtherUsers();
   }, [])
   
}

export default useGetOtherUsers