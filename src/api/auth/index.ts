import { SignInBody, SignUpBody, UpdateUserBody, UserDto } from './types';
import { kya } from '..';
import { ApiResponse } from '../types';
import { useSessionStore } from '@/src/zustand';

export const signIn = async (data: SignInBody) => {
  const res = await kya({ hasAccessToken: false }).post(`User/SignIn`, {
    body: JSON.stringify(data),
  });

  if (!res.ok) return;

  const user = ((await res.json()) as ApiResponse).data as UserDto;
  if (user) return user;
  return;
};

export const signUp = async (data: SignUpBody) => {
  const res = await kya({ hasAccessToken: false }).post(`User/SignUp`, {
    body: JSON.stringify(data),
  });

  return res.ok;
};

export const verify = async (token: string) => {
  const res = await kya({ hasAccessToken: false }).post(`User/Verify?token=${token}`);

  return res.ok;
};

export const resetPassword = async (data: any) => {
  const res = await kya({ hasAccessToken: false }).post(`User/ResetPassword`, {
    body: JSON.stringify(data),
  });

  return res.ok;
};

export const updateUser = async (data: UserDto) => {
  const formData = new FormData();

  formData.append('name', data.name);
  formData.append('email', data.email);
  if (data.avatar) formData.append('avatar', data.avatar);

  const res = await kya({ enableAutoContentType: true }).put(`User/UpdateUser`, {
    body: formData,
  });

  if (!res.ok) return;

  const user = ((await res.json()) as ApiResponse).data as UserDto;
  if (user) return user;
  return;
};

export const validateToken = async () => {
  try {
    const res = await kya({ snackbar: { disabled: true } }).get('User/validateToken');
    return true;
  } catch (error) {
    useSessionStore.getState().signOut();
    return false;
  }
};
