import { sql } from "../dbConnection.js";

export const createUser = async (newUser) => {
  const { email, password, username, role = "user" } = newUser;
  
  const [user] = await sql`
    INSERT INTO Users
    (username, email, password, role)
    VALUES 
    (${username}, ${email}, ${password}, ${role})
    RETURNING id, username, email
  `;
  return user;
};

export const getUserByEmail = async (email) => {
    const [user] = await sql`
      SELECT * FROM Users
      WHERE email = ${email}
    `;
    return user;
};

export const getUserById = async (id) => {
  try {
    const [user] = await sql`
      SELECT id, email, role, username, status FROM Users
      WHERE id = ${id}
    `;
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Failed to fetch user by ID.");
  }
};

// Admin functions for user management
export const getAllUsers = async () => {
  try {
    const users = await sql`
      SELECT id, username, email, role
      FROM Users
      ORDER BY id DESC
    `;
    return users;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw new Error("Failed to fetch users.");
  }
};

export const updateUserStatus = async (userId, status) => {
  try {
    if (!['active', 'blocked'].includes(status)) {
      throw new Error("Invalid status. Must be 'active' or 'blocked'.");
    }
    
    const [updatedUser] = await sql`
      UPDATE Users 
      SET status = ${status}
      WHERE id = ${userId}
      RETURNING id, username, email, role, status
    `;
    
    if (!updatedUser) {
      throw new Error("User not found.");
    }
    
    return updatedUser;
  } catch (error) {
    console.error("Error updating user status:", error);
    throw new Error("Failed to update user status.");
  }
};

export const blockUser = async (userId) => {
  return await updateUserStatus(userId, 'blocked');
};

export const unblockUser = async (userId) => {
  return await updateUserStatus(userId, 'active');
};

export const deleteUser = async (userId) => {
  try {
    const [deletedUser] = await sql`
      DELETE FROM Users 
      WHERE id = ${userId}
      RETURNING id, username, email
    `;
    
    if (!deletedUser) {
      throw new Error("User not found.");
    }
    
    return deletedUser;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user.");
  }
};