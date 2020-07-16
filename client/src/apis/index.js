import axios from "axios";

export const postsApi = axios.create({
  baseURL: "/posts",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
postsApi.interceptors.request.use(
  (req) => {
    postsApi.defaults.headers.Authorization = localStorage.getItem("token");
    if (!postsApi.defaults.headers.Authorization)
      throw { msg: "token is not available" };
    return req;
  },
  (error) => {
    console.log(error);
    return new Promise.reject(error);
  }
);

export const auth = axios.create({
  baseURL: "/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

const cloudinaryApi = axios.create({
  baseURL: "https://api.cloudinary.com/v1_1/dncpsh3iw/image/upload",
  headers: {
    "Content-Type": "application/json",
  },
});
export const upload = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "insta-clone");
  formData.append("cloud_name", "dncpsh3iw");

  return new Promise((resolve, reject) => {
    cloudinaryApi
      .post("/", formData)
      .then((res) => {
        resolve(res.data.url);
      })
      .catch((e) => {
        console.log(e);
        reject(null);
      });
  });
};

export const fakeApi = axios.create({
  baseURL: "/posts",
  headers: { "Content-Type": "application/json" },
});

export const usersApi = axios.create({
  baseURL: "/users",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
