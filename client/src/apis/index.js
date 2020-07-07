import axios from "axios";
export const postsApi = axios.create({
  baseURL: "/posts",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const auth = axios.create({
  baseURL: "/auth",
  headers: {
    "Content-Type": "application/json",
  },
});
