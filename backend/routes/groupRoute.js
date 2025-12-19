import express from "express";
import {
    createGroup,
    getUserGroups,
    deleteGroup
} from "../controllers/groupController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createGroup);

router.route("/").get(isAuthenticated, getUserGroups);

router.route("/:groupId").delete(isAuthenticated, deleteGroup);

export default router;

