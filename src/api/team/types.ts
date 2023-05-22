import { UserDto } from "../auth/types";
import { MangaDto } from "../manga/types";

export type TeamDto = {
  id: number;
  name: string;
  description?: string;
  avatar?: string;
  author: UserDto;
  mangas?: MangaDto[];
};

export type CreateTeamBody = {
  authorId: number;
  name: string;
  description?: string;
  avatar?: string;
};
