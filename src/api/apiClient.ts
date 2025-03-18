import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const fetchUsers = async (start = 0, limit = 6) => {
  const response = await apiClient.get(
    `/users?_start=${start}&_limit=${limit}`
  );
  return response.data;
};

export const updateUser = async (id: number, data: { name: string }) => {
  const response = await apiClient.patch(`/users/${id}`, data);
  return response.data;
};
