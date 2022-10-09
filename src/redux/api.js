import axios from "axios";

export const loadUsersApi = async () => await axios.get("http://localhost:3000/users");

export const createUserApi = async user => await axios.post("http://localhost:3000/users", user);

export const deleteUserApi = async userId => await axios.delete(`http://localhost:3000/users/${userId}`);

export const updateUserApi = async (userId, userInfo) =>
  await axios.put(`http://localhost:3000/users/${userId}`, userInfo);

export const searchUserApi = async query => await axios.get(`http://localhost:3000/users?q=${query}`);
