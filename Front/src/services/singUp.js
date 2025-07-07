import { myAxios } from "../utils/myAxios";

export const signUp = async (data) => {
  const data = await myAxios.post("/users/signup", ...data).then(res => res.data);
  return response;
};
