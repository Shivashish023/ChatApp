import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setOtherUsers } from '../redux/userSlicer';
import { BASE_URL } from '../main';
const useGetOtherUsers = () => {
    const dispatch=useDispatch();
   useEffect(() => {
   
        const fetchOtherUsers=async()=>{
            try{
                axios.defaults.withCredentials=true
            const res=await axios.get(`${BASE_URL}/api/user`)
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