import { myAxios } from "../utils/myAxios";

export const UserLogout = async () => {
  try {

    const response = await myAxios.post("/users/logout");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};



