type DisplayPagesType = {
  [key: string]: string | undefined;
  a: string;
  m: string;
  r: string;
};

type PagesListEntry = {
  key: string;
  label: string;
};

const displayPages: DisplayPagesType = {
  a: 'Аниме',
  m: 'Манга',
  r: 'Ранобэ',
  // divider1: 'Divider',
  // forum: 'Форум',
};

export const getPagesList = (): PagesListEntry[] => {
  return Object.keys(displayPages).map((key) => ({
    key,
    label: displayPages[key]!,
  }));
};

export const getDisplayCurrentPage = (path: string) => {
  const pathParts = path.split('/');
  const pageKey = pathParts[1];

  const displayPage = displayPages[pageKey];
  return { displayPage, pageKey };
};
