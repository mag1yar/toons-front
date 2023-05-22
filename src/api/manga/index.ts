import { kya } from '..';
import { ApiResponse } from '../types';
import {
  CreateMangaBody,
  CreateMangaChapterBody,
  MangaChapterDto,
  MangaChapterListItem,
  MangaDto,
} from './types';

export const create = async (data: CreateMangaBody) => {
  const formData = new FormData();

  formData.append('name', data.name);
  formData.append('authorId', data.authorId.toString());
  formData.append('teamId', data.teamId.toString());
  if (data.description) formData.append('description', data.description);
  if (data.avatar) formData.append('avatar', data.avatar);

  const res = await kya({ enableAutoContentType: true }).post(`Manga/Create`, {
    body: formData,
  });

  const team = ((await res.json()) as ApiResponse).data as MangaDto;
  if (team) return team;
  return;
};

export const get = async (id: number) => {
  try {
    const res = await kya().get(`Manga/Get?id=${id}`);

    const team = ((await res.json()) as ApiResponse).data as MangaDto;

    if (team) return team;
    return;
  } catch {
    return;
  }
};

export const list = async () => {
  try {
    const res = await kya().get(`Manga/List`);

    const team = ((await res.json()) as ApiResponse).data as MangaDto[];

    if (team) return team;
    return;
  } catch {
    return;
  }
};

export const createChapter = async (data: CreateMangaChapterBody) => {
  const formData = new FormData();

  formData.append('authorId', data.authorId.toString());
  formData.append('teamId', data.teamId.toString());
  formData.append('mangaId', data.mangaId.toString());
  formData.append('volume', data.volume.toString());
  formData.append('chapter', data.chapter);
  data.images.map((image) => formData.append('images', image));

  const res = await kya({ enableAutoContentType: true }).post(`Manga/CreateChapter`, {
    body: formData,
  });

  const team = ((await res.json()) as ApiResponse).data as MangaChapterDto;
  if (team) return team;
  return;
};

export const chapterList = async (mangaId: number, teamId: number) => {
  try {
    const res = await kya().get(`Manga/ChapterList?mangaId=${mangaId}&teamId=${teamId}`);

    const team = ((await res.json()) as ApiResponse).data as MangaChapterListItem[];

    if (team) return team;
    return;
  } catch {
    return;
  }
};

export const getChapter = async (id: number) => {
  try {
    const res = await kya().get(`Manga/GetChapter?id=${id}`);

    const chapter = ((await res.json()) as ApiResponse).data as MangaChapterDto;

    const images = await Promise.all(
      chapter.images.map(async (src) => {
        let img = new Image();
        img.src = src;
        await img.decode();
        return img;
      }),
    );

    if (chapter)
      return {
        ...chapter,
        images,
      };
    return;
  } catch {
    return;
  }
};
