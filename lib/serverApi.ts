import { nextServer } from './api';
import { cookies } from 'next/headers';
import { User } from '@/types/user';

export const getProfile = async (): Promise<User> => {
  const cookieStore = cookies();
  const cookieHeader = cookieStore.toString();

  const res = await nextServer.get<User>('/auth/me', {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res.data;
};
