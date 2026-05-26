import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedGroup, removeGroup } from '../redux/userSlicer';
import axios from 'axios';
import { BASE_URL } from '../main.jsx';
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';

function GroupItem({ group }) {
  const dispatch = useDispatch();
  const { selectedGroup, onlineUsers, authUser } = useSelector(store => store.user);
  const [isDeleting, setIsDeleting] = useState(false);
  const [avatarBroken, setAvatarBroken] = useState(false);

  useEffect(() => {
    setAvatarBroken(false);
  }, [group?._id]);

  const selectedGroupHandler = (group) => {
    dispatch(setSelectedGroup(group));
  }
  const isSelected = selectedGroup && selectedGroup._id === group._id;
  const isAdmin = group.admin?._id === authUser?._id || group.admin?.toString() === authUser?._id;
  const onlineCount = group.participants?.filter(p => onlineUsers.includes(p._id)).length || 0;

  const handleDeleteGroup = async (e) => {
    e.stopPropagation();
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
      className={`list-item group relative m-1 ${isSelected ? "list-item-selected" : ""}`}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-700">
        {group.groupPhoto && !avatarBroken ? (
          <img
            src={group.groupPhoto}
            alt=""
            className="h-full w-full object-cover"
            onError={() => setAvatarBroken(true)}
          />
        ) : (
          <span className="text-sm font-bold text-white">
            {group.groupName?.charAt(0)?.toUpperCase() || 'G'}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-white">{group.groupName}</p>
        <p className="text-xs text-slate-400">
          {group.participants?.length || 0} members
          {onlineCount > 0 && ` · ${onlineCount} online`}
        </p>
      </div>
      {isAdmin && (
        <button
          type="button"
          onClick={handleDeleteGroup}
          disabled={isDeleting}
          className="rounded-lg p-2 text-red-400 opacity-0 transition hover:bg-red-500/20 group-hover:opacity-100 disabled:opacity-50"
          title="Delete group"
        >
          <FaTrash className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export default GroupItem
