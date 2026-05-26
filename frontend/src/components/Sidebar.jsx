import React, { useEffect, useState } from 'react'
import OtherUsers from './OtherUsers'
import GroupList from './GroupList'
import CreateGroup from './CreateGroup'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser, setOtherUsers } from '../redux/userSlicer'
import { BASE_URL } from '../main.jsx'
import { HiOutlineSearch, HiOutlineLogout } from 'react-icons/hi'
import { IoPeople, IoChatbubbles } from 'react-icons/io5'

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { otherUsers, authUser } = useSelector(store => store.user);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("users");
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [avatarBroken, setAvatarBroken] = useState(false);

  useEffect(() => {
    setAvatarBroken(false);
  }, [authUser?._id]);

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (activeTab === "users") {
      const searchedUser = otherUsers?.find((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );
      if (searchedUser) {
        dispatch(setOtherUsers([searchedUser]))
      } else {
        toast.error("User not found!");
      }
    } else {
      toast.error("Group search coming soon!");
    }
  }

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/user/logout`, {
        withCredentials: true
      });
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
    } catch (error) {
      console.log(error);
    }
  }

  const userInitial = (authUser?.name?.charAt(0) || "U").toUpperCase();

  return (
    <div className="sidebar-panel p-4">
      {/* Brand + user */}
      <div className="mb-5 flex items-center gap-3">
        <div className="avatar-ring flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-chap-500 to-indigo-600">
          {authUser?.profilePhoto && !avatarBroken ? (
            <img
              src={authUser.profilePhoto}
              alt=""
              className="h-full w-full object-cover"
              onError={() => setAvatarBroken(true)}
            />
          ) : (
            <span className="text-lg font-bold text-white">{userInitial}</span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">{authUser?.name || "User"}</p>
          <p className="truncate text-xs text-slate-400">{authUser?.email}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-4 flex gap-1 rounded-xl bg-white/5 p-1">
        <button
          type="button"
          onClick={() => setActiveTab("users")}
          className={`sidebar-tab flex items-center justify-center gap-1.5 ${
            activeTab === "users" ? "sidebar-tab-active" : "sidebar-tab-inactive"
          }`}
        >
          <IoPeople className="h-4 w-4" />
          Users
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("groups")}
          className={`sidebar-tab flex items-center justify-center gap-1.5 ${
            activeTab === "groups" ? "sidebar-tab-active" : "sidebar-tab-inactive"
          }`}
        >
          <IoChatbubbles className="h-4 w-4" />
          Groups
        </button>
      </div>

      {/* Search */}
      <form onSubmit={searchSubmitHandler} className="mb-3">
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 focus-within:border-chap-500/50 focus-within:ring-1 focus-within:ring-chap-500/30">
          <HiOutlineSearch className="h-5 w-5 shrink-0 text-slate-400" />
          <input
            type="text"
            className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={activeTab === "users" ? "Search users…" : "Search groups…"}
          />
        </div>
      </form>

      {activeTab === "groups" && (
        <button
          type="button"
          onClick={() => setShowCreateGroup(true)}
          className="mb-3 w-full rounded-xl bg-gradient-to-r from-chap-600 to-indigo-600 py-2.5 text-sm font-semibold text-white shadow-md transition hover:from-chap-500 hover:to-indigo-500"
        >
          + New group
        </button>
      )}

      <div className="scrollbar-thin flex-1 overflow-y-auto rounded-xl border border-white/5 bg-black/20">
        {activeTab === "users" ? <OtherUsers /> : <GroupList />}
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 py-2.5 text-sm font-medium text-red-300 transition hover:bg-red-500/20"
      >
        <HiOutlineLogout className="h-5 w-5" />
        Log out
      </button>

      {showCreateGroup && (
        <CreateGroup onClose={() => setShowCreateGroup(false)} />
      )}
    </div>
  )
}

export default Sidebar
