import { Conversation } from "../modals/roomModel.js";
import { User } from "../modals/userModel.js";
import { io } from "../socket/socket.js";
import { getReceiverSocketId } from "../socket/socket.js";

// Create a new group
export const createGroup = async (req, res) => {
    try {
        const { groupName, description, participants } = req.body;
        const creatorId = req.id;

        if (!groupName || !participants || participants.length < 1) {
            return res.status(400).json({
                success: false,
                message: "Group name and at least one participant are required"
            });
        }

        // Add creator to participants if not already included
        const allParticipants = [...new Set([creatorId, ...participants])];

        if (allParticipants.length < 2) {
            return res.status(400).json({
                success: false,
                message: "Group must have at least 2 members"
            });
        }

        // Verify all participants exist
        const users = await User.find({ _id: { $in: allParticipants } });
        if (users.length !== allParticipants.length) {
            return res.status(400).json({
                success: false,
                message: "Some participants are invalid"
            });
        }

        // Create group conversation
        const group = await Conversation.create({
            participants: allParticipants,
            isGroup: true,
            groupName,
            groupDescription: description || "",
            groupPhoto: "",
            admin: creatorId,
            createdBy: creatorId,
            messages: []
        });

        // Populate participants for response
        await group.populate("participants", "name username profilePhoto");

        // Emit socket event to all participants
        allParticipants.forEach(participantId => {
            const socketId = getReceiverSocketId(participantId.toString());
            if (socketId) {
                io.to(socketId).emit("groupCreated", group);
            }
        });

        return res.status(201).json({
            success: true,
            group
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error creating group"
        });
    }
};

// Get all groups for the logged-in user
export const getUserGroups = async (req, res) => {
    try {
        const userId = req.id;

        const groups = await Conversation.find({
            isGroup: true,
            participants: userId
        })
            .populate("participants", "name username profilePhoto")
            .populate("admin", "name username profilePhoto")
            .populate("createdBy", "name username profilePhoto")
            .sort({ updatedAt: -1 });

        return res.status(200).json({
            success: true,
            groups
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error fetching groups"
        });
    }
};

// Delete group
export const deleteGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const requesterId = req.id;

        const group = await Conversation.findById(groupId);

        if (!group || !group.isGroup) {
            return res.status(404).json({
                success: false,
                message: "Group not found"
            });
        }

        // Check if requester is admin
        if (group.admin.toString() !== requesterId) {
            return res.status(403).json({
                success: false,
                message: "Only admin can delete group"
            });
        }

        // Get participant IDs before deletion
        const participantIds = group.participants.map(p => p.toString());

        // Delete the group
        await Conversation.findByIdAndDelete(groupId);

        // Emit socket event to all participants
        participantIds.forEach(participantId => {
            const socketId = getReceiverSocketId(participantId);
            if (socketId) {
                io.to(socketId).emit("groupDeleted", { groupId });
            }
        });

        return res.status(200).json({
            success: true,
            message: "Group deleted successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error deleting group"
        });
    }
};

