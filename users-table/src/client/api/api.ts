/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from 'axios';
import { User } from '../types/User';

axios.defaults.baseURL = 'http://localhost:3000';

interface UsersResp {
  success: boolean,
  total_pages: number,
  total_users: number,
  count: number,
  page: number,
  links: {
    next_url: string | null
    prev_url: string | null
  }
  users: User[]
}

export const getUsers = (page = 1, count = 6): Promise<UsersResp> => {
  return axios.get(`/users?page=${page}&count=${count}`).then(res => res.data);
};

export const addUser = async (user: FormData) => {
  try {
    const responce = await axios.post('/users', user);

    return responce.data.user_id;
  } catch (error) {
    if (error instanceof AxiosError) {
      return Promise.reject(error.response?.data);
    }

    return Promise.reject(error);
  }
};
