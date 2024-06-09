import axiosInstance from './axiosInstance';

const API_URL = 'https://dummyjson.com';

export const fetchPosts = async () => {
  const response = await axiosInstance.get(`${API_URL}/posts`);
  return response.data.posts;
};

export const fetchPostById = async (id: number) => {
  const response = await axiosInstance.get(`${API_URL}/posts/${id}`);
  return response.data;
};

export const loginUser = async (username: string, password: string) => {
  const response = await axiosInstance.post(`${API_URL}/auth/login`, {
    username,
    password,
    expiresInMins: 30,
  });
  return response.data;
};

export const addPost = async (post) => {
  const response = await axiosInstance.post(`${API_URL}/posts/add`, post);
  return response.data;
};

export const updatePost = async (id, post) => {
  const response = await axiosInstance.put(`${API_URL}/posts/${id}`, post);
  return response.data;
};

export const deletePost = async (id) => {
  const response = await axiosInstance.delete(`${API_URL}/posts/${id}`);
  return response.data;
};
