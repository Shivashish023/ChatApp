import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addGroup, setSelectedGroup } from '../redux/userSlicer'
import { BASE_URL } from '../main.jsx'
import toast from 'react-hot-toast'
import { FaTimes } from 'react-icons/fa'

function CreateGroup({ onClose }) {
  const dispatch = useDispatch();
  const { otherUsers } = useSelector(store => store.user);
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [brokenPhotoIds, setBrokenPhotoIds] = useState({});

  const handleToggleUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!groupName.trim()) {
      toast.error("Group name is required");
      return;
    }
    if (selectedUsers.length === 0) {
      toast.error("Please select at least one member");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/api/group/create`,
        {
          groupName: groupName.trim(),
          description: description.trim(),
          participants: selectedUsers
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(addGroup(res.data.group));
        dispatch(setSelectedGroup(res.data.group));
        toast.success("Group created successfully!");
        onClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating group");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="text-lg font-bold text-slate-900">Create new group</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 scrollbar-thin">
          <div className="mb-4">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Group name *
            </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="auth-input"
              placeholder="e.g. Project team"
              required
            />
          </div>

          <div className="mb-4">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Description <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="auth-input min-h-[80px] resize-none"
              placeholder="What's this group about?"
              rows="3"
            />
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Members *
            </label>
            <div className="max-h-48 overflow-y-auto rounded-xl border border-slate-200 scrollbar-thin">
              {otherUsers && otherUsers.length > 0 ? (
                otherUsers.map((user) => (
                  <div
                    key={user._id}
                    onClick={() => handleToggleUser(user._id)}
                    className={`flex cursor-pointer items-center gap-3 border-b border-slate-50 px-3 py-2.5 last:border-0 transition ${
                      selectedUsers.includes(user._id)
                        ? "bg-chap-50"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user._id)}
                      onChange={() => handleToggleUser(user._id)}
                      className="checkbox checkbox-sm checkbox-primary rounded"
                    />
                    {user.profilePhoto && !brokenPhotoIds[user._id] ? (
                      <img
                        src={user.profilePhoto}
                        alt=""
                        className="h-9 w-9 rounded-full object-cover"
                        onError={() =>
                          setBrokenPhotoIds((prev) => ({ ...prev, [user._id]: true }))
                        }
                      />
                    ) : (
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-chap-500 to-indigo-600 text-xs font-bold text-white">
                        {(user?.name?.charAt(0) || "U").toUpperCase()}
                      </span>
                    )}
                    <span className="text-sm font-medium text-slate-800">{user.name}</span>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-sm text-slate-500">
                  No users available
                </div>
              )}
            </div>
            {selectedUsers.length > 0 && (
              <p className="mt-2 text-xs text-chap-600 font-medium">
                {selectedUsers.length} member{selectedUsers.length !== 1 ? "s" : ""} selected
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 !w-auto py-2.5 text-sm"
            >
              {loading ? "Creating…" : "Create group"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateGroup;
