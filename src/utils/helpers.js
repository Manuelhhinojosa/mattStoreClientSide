import axios from "axios";
import { toast } from "react-toastify";
import { toastStyleObject } from "../tostifyStyle";

// refresh user
// refresh user
// refresh user
export const refreshUserData = async (userId, userToken, dispatch, setUser) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_USERS_URL}/${userId}`,
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );

    console.log("result to call get one user:", response);
    console.log("User info loaded successfully:", {
      config: response.config,
      data: response.data,
      status: response.status,
      headers: response.headers,
    });

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

// refresh orders
// refresh orders
// refresh orders
export const refreshOrdersData = async (userToken, dispatch, setOrders) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_ORDERS_URL}/allorders`,
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );

    console.log("result to call get all orders:", response);
    console.log("Orders info loaded successfully:", {
      config: response.config,
      data: response.data,
      status: response.status,
      headers: response.headers,
    });

    const updatedOrders = response.data;
    dispatch(setOrders(updatedOrders));
  } catch (error) {
    console.log("Error refreshing orders data:", error);
    const msg =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Something went wrong.";
    toast(msg, toastStyleObject());
  }
};

// refresh users
// refresh users
// refresh users
export const refreshUsersData = async (userToken, dispatch, setUsers) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_USERS_URL}/allusers`,
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );

    console.log("result to call get all users:", response);
    console.log("Users info loaded successfully:", {
      config: response.config,
      data: response.data,
      status: response.status,
      headers: response.headers,
    });

    const updatedUsers = response.data;
    dispatch(setUsers(updatedUsers));
  } catch (error) {
    console.log("Error refreshing users data:", error);
    const msg =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Something went wrong.";
    toast(msg, toastStyleObject());
  }
};
