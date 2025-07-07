import {
  getAllUsers,
  blockUser,
  unblockUser,
  deleteUser,
  getUserById,
} from "../models/userModel.js";
import AppError from "../utils/appError.js";

// Get all users (admin only)
export const getAllUsersController = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    
    // Remove passwords from response
    const safeUsers = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    res.status(200).json({
      status: "success",
      results: safeUsers.length,
      data:safeUsers,
    });
  } catch (error) {
    console.error("Error in getAllUsersController:", error.message);
    next(new AppError("Failed to fetch users", 500));
  }
};

// Delete a user (admin only)
export const deleteUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if trying to delete self
    if (parseInt(id) === req.user.id) {
      return next(new AppError("You cannot delete yourself", 400));
    }
    
    // Check if user exists and is not admin
    const targetUser = await getUserById(id);
    if (!targetUser) {
      return next(new AppError("User not found", 404));
    }
    
    if (targetUser.role === 'admin') {
      return next(new AppError("Cannot delete another admin", 403));
    }

    const deletedUser = await deleteUser(id);

    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
      data: {
        user: deletedUser,
      },
    });
  } catch (error) {
    console.error("Error in deleteUserController:", error.message);
    next(new AppError("Failed to delete user", 500));
  }
};
