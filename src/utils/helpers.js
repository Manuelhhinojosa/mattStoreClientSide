import axios from "axios";
import { toast } from "react-toastify";
import { toastStyleObject } from "../tostifyStyle";

export const refreshUserData = async (userId, userToken, dispatch, setUser) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_USERS_URL}/${userId}`,
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    const updatedUser = response.data;
    dispatch(setUser(updatedUser));
  } catch (error) {
    console.log("Error refreshing user data:", error);
    const msg =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Something went wrong.";
    toast(msg, toastStyleObject());
  }
};
