import { myAxios } from "../utils/myAxios";

export const login = async (email, password) => {
    const data = await myAxios.post("/users/login", {email, password}).then(res => res.data);
    return data;
};
