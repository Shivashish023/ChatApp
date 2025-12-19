import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserGroups } from '../redux/userSlicer';
import { BASE_URL } from '../main.jsx';

const useGetGroups = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchGroups = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${BASE_URL}/api/group`);
                if (res.data.success) {
                    dispatch(setUserGroups(res.data.groups));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchGroups();
    }, [dispatch]);
}

export default useGetGroups;

