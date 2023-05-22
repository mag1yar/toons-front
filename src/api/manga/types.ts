import { UserDto } from '../auth/types';
import { TeamDto } from '../team/types';

export type MangaDto = {
  id: number;
  name: string;
  description?: string;
  avatar?: string;
  author: UserDto;
  teams: TeamDto[];
};

export type CreateMangaBody = {
  authorId: number;
  teamId: number;
  name: string;
  description?: string;
  avatar?: string;
};

export type MangaChapterDto = {
  id: number;
  authorId: number;
  teamId: number;
  mangaId: number;
  volume: number;
  chapter: string;
  images: string[];
};

export type CreateMangaChapterBody = {
  authorId: number;
  teamId: number;
  mangaId: number;
  volume: number;
  chapter: string;
  images: string[];
};

export type MangaChapterListItem = {
  id: number;
  authorId: number;
  teamId: number;
  mangaId: number;
  volume: number;
  chapter: string;
};