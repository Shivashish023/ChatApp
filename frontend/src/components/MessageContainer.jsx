import React, { useEffect, useState } from 'react';
import SendInput from './sendInput';
import Messages from './Messages';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser, setSelectedGroup } from '../redux/userSlicer';
import { IoArrowBackSharp } from "react-icons/io5";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

function MessageContainer() {
  const { selectedUser, selectedGroup, authUser, onlineUsers, chatType } = useSelector(store => store.user)
  const dispatch = useDispatch();
  const [userAvatarBroken, setUserAvatarBroken] = useState(false);
  const [groupAvatarBroken, setGroupAvatarBroken] = useState(false);

  useEffect(() => {
    setUserAvatarBroken(false);
    setGroupAvatarBroken(false);
  }, [selectedUser?._id, selectedGroup?._id]);

  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null));
      dispatch(setSelectedGroup(null));
    };
  }, [dispatch]);

  const isOnline = chatType === "user" && onlineUsers?.includes(selectedUser?._id);

  const handleBack = () => {
    if (chatType === "user") {
      dispatch(setSelectedUser(null));
    } else {
      dispatch(setSelectedGroup(null));
    }
  };

  const hasSelection = selectedUser !== null || selectedGroup !== null;

  const renderAvatar = (photo, broken, setBroken, initial, alt) => (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-chap-500 to-indigo-600 ring-2 ring-white shadow-md">
      {photo && !broken ? (
        <img
          src={photo}
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setBroken(true)}
        />
      ) : (
        <span className="text-lg font-bold text-white">{initial}</span>
      )}
    </div>
  );

  return (
    <>
      {hasSelection ? (
        <div className="flex h-full flex-col bg-gradient-to-b from-slate-100 to-slate-200/80">
          <div className="chat-header">
            <button
              type="button"
              onClick={handleBack}
              className="mr-1 rounded-full p-2 text-slate-600 transition hover:bg-slate-100 md:hidden"
              aria-label="Back"
            >
              <IoArrowBackSharp className="h-6 w-6" />
            </button>

            {chatType === "user" ? (
              <>
                <div className="relative">
                  {renderAvatar(
                    selectedUser?.profilePhoto,
                    userAvatarBroken,
                    setUserAvatarBroken,
                    (selectedUser?.name?.charAt(0) || "U").toUpperCase(),
                    "User"
                  )}
                  {isOnline && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-lg font-semibold text-slate-900">
                    {selectedUser?.name}
                  </h2>
                  <p className={`text-xs ${isOnline ? "text-emerald-600 font-medium" : "text-slate-500"}`}>
                    {isOnline ? "Online now" : "Offline"}
                  </p>
                </div>
              </>
            ) : (
              <>
                {renderAvatar(
                  selectedGroup?.groupPhoto,
                  groupAvatarBroken,
                  setGroupAvatarBroken,
                  (selectedGroup?.groupName?.charAt(0)?.toUpperCase() || "G").toString(),
                  "Group"
                )}
                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-lg font-semibold text-slate-900">
                    {selectedGroup?.groupName}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {selectedGroup?.participants?.length || 0} members
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="flex min-h-0 flex-1 flex-col px-3 py-3 sm:px-4">
            <Messages />
          </div>

          <SendInput />
        </div>
      ) : (
        <div className="chat-empty h-full">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 text-chap-300 backdrop-blur-sm">
            <HiOutlineChatBubbleLeftRight className="h-10 w-10" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Hey, {authUser?.name?.split(" ")[0] || "there"} 👋
            </h1>
            <p className="mt-2 max-w-sm text-slate-400">
              Pick a conversation from the sidebar to start messaging, or create a group to chat with multiple people.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default MessageContainer;
