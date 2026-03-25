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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold text-black">Create New Group</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <FaTimes className="text-xl" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Group Name *
                        </label>
                        <input
                            type="text"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            placeholder="Enter group name"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description (Optional)
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            placeholder="Enter group description"
                            rows="3"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Members *
                        </label>
                        <div className="border border-gray-300 rounded-md max-h-48 overflow-y-auto">
                            {otherUsers && otherUsers.length > 0 ? (
                                otherUsers.map((user) => (
                                    <div
                                        key={user._id}
                                        onClick={() => handleToggleUser(user._id)}
                                        className={`flex items-center p-2 cursor-pointer hover:bg-gray-100 ${
                                            selectedUsers.includes(user._id) ? 'bg-blue-100' : ''
                                        }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedUsers.includes(user._id)}
                                            onChange={() => handleToggleUser(user._id)}
                                            className="mr-2"
                                        />
                                        {user.profilePhoto && !brokenPhotoIds[user._id] ? (
                                            <img
                                                src={user.profilePhoto}
                                                alt={user.name}
                                                className="w-8 h-8 rounded-full mr-2"
                                                onError={() =>
                                                    setBrokenPhotoIds((prev) => ({ ...prev, [user._id]: true }))
                                                }
                                            />
                                        ) : (
                                            <span className="w-8 h-8 rounded-full mr-2 bg-gray-600 text-white flex items-center justify-center text-xs font-bold">
                                                {(user?.name?.charAt(0) || "U").toUpperCase()}
                                            </span>
                                        )}
                                        <span className="text-black">{user.name}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="p-4 text-center text-gray-500">
                                    No users available
                                </div>
                            )}
                        </div>
                        {selectedUsers.length > 0 && (
                            <p className="mt-2 text-sm text-gray-600">
                                {selectedUsers.length} member(s) selected
                            </p>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition disabled:opacity-50"
                        >
                            {loading ? "Creating..." : "Create Group"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateGroup;

