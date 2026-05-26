import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '../main';
import { MdAttachFile } from "react-icons/md";

function SendInput() {
  const [message, setMessage] = useState("")
  const dispatch = useDispatch();
  const { selectedUser, selectedGroup, chatType } = useSelector(store => store.user)
  const { messages } = useSelector(store => store.message);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!selectedUser && !selectedGroup) return;
    if (!message.trim()) return;

    try {
      let res;
      if (chatType === "group") {
        res = await axios.post(
          `${BASE_URL}/api/message/send/${selectedGroup?._id}`,
          { message, conversationId: selectedGroup?._id },
          { withCredentials: true }
        );
      } else {
        res = await axios.post(
          `${BASE_URL}/api/message/send/${selectedUser?._id}`,
          { message },
          { withCredentials: true }
        );
      }
      if (res?.data?.success && res?.data?.newMessage) {
        dispatch(setMessages([...messages, res.data.newMessage]))
      }
    } catch (error) {
      console.log(error);
    }
    setMessage("");
  }

  return (
    <div className="border-t border-slate-200/80 bg-white/90 px-3 py-3 backdrop-blur-md sm:px-4">
      <form
        className="mx-auto flex max-w-4xl items-center gap-2 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-soft focus-within:border-chap-400 focus-within:ring-2 focus-within:ring-chap-500/20"
        onSubmit={submitHandler}
      >
        <label className="flex cursor-pointer items-center justify-center rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-chap-600">
          <MdAttachFile className="h-5 w-5" />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) console.log(file);
            }}
          />
        </label>

        <input
          type="text"
          placeholder="Type a message…"
          className="min-w-0 flex-1 bg-transparent py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none sm:text-base"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          type="submit"
          disabled={!message.trim()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-chap-600 to-indigo-600 text-white shadow-md transition hover:from-chap-500 hover:to-indigo-500 disabled:opacity-40 disabled:shadow-none sm:h-11 sm:w-11"
          aria-label="Send message"
        >
          <IoSend className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}

export default SendInput;
