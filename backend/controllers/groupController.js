import { Conversation } from "../modals/roomModel.js";
import { User } from "../modals/userModel.js";
import { io } from "../socket/socket.js";
import { getReceiverSocketId } from "../socket/socket.js";

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

        const allParticipants = [...new Set([creatorId, ...participants])];

        if (allParticipants.length < 2) {
            return res.status(400).json({
                success: false,
                message: "Group must have at least 2 members"
            });
        }

        const users = await User.find({ _id: { $in: allParticipants } });
        if (users.length !== allParticipants.length) {
            return res.status(400).json({
                success: false,
                message: "Some participants are invalid"
            });
        }

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

        await group.populate("participants", "name username profilePhoto");

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

        if (group.admin.toString() !== requesterId) {
            return res.status(403).json({
                success: false,
                message: "Only admin can delete group"
            });
        }

        const participantIds = group.participants.map(p => p.toString());

        await Conversation.findByIdAndDelete(groupId);

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

