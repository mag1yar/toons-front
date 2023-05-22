export type AddMangaChapterModalProps = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  teamId: number;
  mangaId: number;
};
