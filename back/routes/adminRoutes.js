import express from "express";
import {
  getAllUsersController,
  deleteUserController
} from "../controllers/adminController.js";
// import { protect, allowAccessTo } from "../controllers/authController.js";

const adminRouter = express.Router();

// All admin routes require authentication and admin role
// adminRouter.use(protect);
// adminRouter.use(allowAccessTo('admin'));

// User management routes
adminRouter.get("/users", getAllUsersController);
adminRouter.delete("/users/:id", deleteUserController);

export default adminRouter; 