import axios from "axios";

export const loadUsersApi = async () => await axios.get("http://localhost:3000/users");

export const createUserApi = async user => await axios.post("http://localhost:3000/users", user);
