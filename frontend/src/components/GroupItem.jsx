import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedGroup, removeGroup } from '../redux/userSlicer';
import axios from 'axios';
import { BASE_URL } from '../main.jsx';
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';

function GroupItem({group}) {
    const dispatch = useDispatch();
    const {selectedGroup, onlineUsers, authUser} = useSelector(store => store.user); 
    const [isDeleting, setIsDeleting] = useState(false);
    const [avatarBroken, setAvatarBroken] = useState(false);

    useEffect(() => {
        setAvatarBroken(false);
    }, [group?._id]);
    
    const selectedGroupHandler = (group) => { 
        dispatch(setSelectedGroup(group));
    }
    const isSelected = selectedGroup && selectedGroup._id === group._id;
    
    // Check if current user is admin
    const isAdmin = group.admin?._id === authUser?._id || group.admin?.toString() === authUser?._id;
    
    // Count online members
    const onlineCount = group.participants?.filter(p => onlineUsers.includes(p._id)).length || 0;
    
    const handleDeleteGroup = async (e) => {
        e.stopPropagation(); // Prevent selecting the group when clicking delete
        if (!window.confirm(`Are you sure you want to delete "${group.groupName}"? This action cannot be undone.`)) {
            return;
        }
        
        setIsDeleting(true);
        try {
            const res = await axios.delete(`${BASE_URL}/api/group/${group._id}`, {
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(removeGroup(group._id));
                toast.success("Group deleted successfully");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error deleting group");
            console.log(error);
        } finally {
            setIsDeleting(false);
        }
    };
    
    return (
        <div 
            onClick={() => selectedGroupHandler(group)} 
            className={`flex items-center hover:bg-gray-700 active:bg-gray-600 ${isSelected ? `bg-gray-700` : ``} p-2 sm:p-3 cursor-pointer transition-colors duration-200 relative group`}
        >
            <div className="avatar mr-2 sm:mr-3 flex-shrink-0">
                <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gray-600 flex items-center justify-center'>
                    {group.groupPhoto && !avatarBroken ? (
                        <img 
                            src={group.groupPhoto} 
                            alt={`${group.groupName} avatar`}
                            className="w-full h-full object-cover"
                            onError={() => setAvatarBroken(true)}
                        />
                    ) : (
                        <span className="text-white text-lg font-bold">
                            {group.groupName?.charAt(0)?.toUpperCase() || 'G'}
                        </span>
                    )}
                </div>
            </div>
            <div className="flex-1 min-w-0">
                <div className="text-sm sm:text-base font-medium truncate">
                    {group.groupName}
                </div>
                <div className="text-xs text-gray-400">
                    {group.participants?.length || 0} members {onlineCount > 0 && `• ${onlineCount} online`}
                </div>
            </div>
            {isAdmin && (
                <button
                    onClick={handleDeleteGroup}
                    disabled={isDeleting}
                    className="ml-2 p-2 text-red-400 hover:text-red-500 hover:bg-gray-600 rounded transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50"
                    title="Delete group"
                >
                    <FaTrash className="w-4 h-4" />
                </button>
            )}
        </div>
    )
}

export default GroupItem

