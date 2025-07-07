import { myAxios } from "../utils/myAxios";

// Get all users
export const getAllUsers = async () => {
  const data = await myAxios.get("/admin/users").then(res => res.data);
  return data;
};

// Delete a user
export const deleteUser = async (userId) => {
  const data = await myAxios.delete(`/admin/users/${userId}`).then(res => res.dat);
  return data;
}; 