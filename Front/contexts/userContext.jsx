import { createContext, useState, useEffect } from "react";
import { myAxios } from "../src/utils/myAxios";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const data = await myAxios.get("/users/me").then(res => res.data);
        console.log(data)
        setUser(data);
      } catch (error) {
        console.log(error)
        setUser(null);
        console.error(
          error.data?.data?.message || "Failed to fetch user",
          error
        );
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Funkcija refreshinti vartotojo duomenis
  const refreshUser = async () => {
    try {
      const data = await myAxios.get("/users/me").then(res=> res.data);
      setUser(data);
    } catch (error) {
      setUser(null);
      console.error(
        error.res?.data?.message || "Failed to refresh user",
        error
      );
    }
  };

  const logoutUser = async () => {
    try {
      await myAxios.post("/users/logout");
      setUser(null);
    } catch (error) {
      console.error(
        error.response?.data?.message || "Failed to logout user",
        error
      );
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logoutUser, refreshUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
