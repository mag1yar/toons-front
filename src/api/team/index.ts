import { kya } from '..';
import { ApiResponse } from '../types';
import { CreateTeamBody, TeamDto } from './types';

export const create = async (data: CreateTeamBody) => {
  const formData = new FormData();

  formData.append('name', data.name);
  formData.append('authorId', data.authorId.toString());
  if (data.description) formData.append('description', data.description);
  if (data.avatar) formData.append('avatar', data.avatar);

  const res = await kya({ enableAutoContentType: true }).post(`Team/Create`, {
    body: formData,
  });

  const team = ((await res.json()) as ApiResponse).data as TeamDto;
  if (team) return team;
  return;
};

export const get = async (id: number) => {
  try {
    const res = await kya().get(`Team/Get?id=${id}`);

    const team = ((await res.json()) as ApiResponse).data as TeamDto;

    if (team) return team;
    return;
  } catch {
    return;
  }
};

export const list = async () => {
  try {
    const res = await kya().get(`Team/List`);

    const team = ((await res.json()) as ApiResponse).data as TeamDto[];

    if (team) return team;
    return;
  } catch {
    return;
  }
};
