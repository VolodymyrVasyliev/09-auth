import { RegisterRequest, User } from '@/types/user';
import { nextServer } from './api';

export const registerUser = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

