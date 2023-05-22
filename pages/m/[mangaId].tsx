import React, { useEffect, useState } from 'react';
import { Avatar, NextListItemButton, UserAvatar } from '@/src/components';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import Grid from '@mui/material/Unstable_Grid2';
import { useSessionStore } from '@/src/zustand';
import { useRouter } from 'next/router';
import {
  FavoriteBorderRounded as FavoriteBorderRoundedIcon,
  LaunchRounded as LaunchRoundedIcon,
  NotificationsRounded as NotificationsRoundedIcon,
  Upload,
  VisibilityRounded as VisibilityRoundedIcon,
} from '@mui/icons-material';
import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab';
import Field from '@/src/components/field';
import { useQuery } from 'react-query';
import Api from '@/src/api';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { MangaDto } from '@/src/api/manga/types';
import Link from 'next/link';
import TextCollapse from '@/src/components/textCollapse';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { AddMangaChapter } from '@/src/modals';

interface MangaProfileProps {
  initialManga: MangaDto | null;
}

const TeamProfile = (props: MangaProfileProps) => {
  const { initialManga } = props;

  const router = useRouter();
  const { mangaId = 0 } = router.query;

  const { isAuthenticated, user } = useSessionStore((state) => state.session);

  const [selectedTab, setSelectedTab] = useState('info');
  const handleButtonClick = (option: number) => setSelectedTeam(option);

  const [openAddChapterModal, setOpenAddChapterModal] = useState<boolean>(false);

  const manga = useQuery(['manga', mangaId], () => Api.manga.get(+mangaId), {
    initialData: initialManga,
    enabled: !!mangaId,
  });

  const isAuthor = manga.data?.author.id === user?.id;
  const [selectedTeam, setSelectedTeam] = useState<number>(manga.data?.teams.at(0)?.id || 0);

  const chapters = useQuery(
    ['chapters', mangaId, selectedTeam],
    () => Api.manga.chapterList(+mangaId, selectedTeam),
    {
      initialData: [],
      enabled: Boolean(mangaId && selectedTeam),
    },
  );

  useEffect(() => {
    if (!selectedTeam) setSelectedTeam(manga.data?.teams.at(0)?.id || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manga.data?.teams]);

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Читать',
      renderCell: (params: GridRenderCellParams) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => router.push(`/m/${mangaId}/${params.value}`)}
        >
          Читать
        </Button>
      ),
    },
    {
      field: 'volume',
      headerName: 'Том',
    },
    {
      field: 'chapter',
      headerName: 'Глава',
    },
  ];

  return (
    <>
      <Head>
        <title>Toons | Манга</title>
      </Head>
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid lg={3} md={3} sm={4} xs={12}>
            <Paper>
              <Box sx={{ position: 'relative', width: '100%', pb: '150%' }}>
                <Avatar
                  name={manga.data?.name || ''}
                  src={manga.data?.avatar}
                  variant="rounded"
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    fontSize: 'xxx-large',
                  }}
                />
              </Box>
              <Stack spacing={1} sx={{ p: 1 }}>
                {!isAuthor && (
                  <ButtonGroup variant="contained">
                    <LoadingButton fullWidth variant="contained">
                      Подписаться
                    </LoadingButton>
                    <Button>
                      <NotificationsRoundedIcon fontSize="small" />
                    </Button>
                  </ButtonGroup>
                )}
                <Divider sx={{ fontSize: 'small' }} textAlign="left">
                  Команды
                </Divider>
                <List dense component="div" disablePadding>
                  {manga.data?.teams.map((t) => (
                    <ListItemButton
                      key={t.id}
                      dense
                      onClick={() => handleButtonClick(t.id)}
                      selected={t.id === selectedTeam}
                    >
                      <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
                        <Avatar
                          src={t.avatar || ''}
                          name={t.name || ''}
                          sx={{ width: 24, height: 24 }}
                        />
                      </ListItemIcon>
                      <ListItemText primary={t.name || ''} />
                      <Tooltip title="Перейти к команде" arrow>
                        <IconButton
                          LinkComponent={Link}
                          href={`/t/${t.id}`}
                          onClick={(e) => e.stopPropagation()}
                          size="small"
                          sx={{ p: 0, borderRadius: 1 }}
                        >
                          <LaunchRoundedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </ListItemButton>
                  ))}
                </List>
              </Stack>
            </Paper>
          </Grid>
          <Grid lg={9} md={9} sm={8} xs={12}>
            <Stack spacing={1}>
              <Typography variant="h6">{manga.data?.name}</Typography>
              <Paper>
                <TabContext value={selectedTab}>
                  <TabList onChange={(_, tab) => setSelectedTab(tab)}>
                    <Tab label="Инфо" value="info" />
                    <Tab label="Главы" value="chapters" />
                  </TabList>
                  <TabPanel value="info">
                    <TextCollapse>{manga.data?.description}</TextCollapse>
                  </TabPanel>
                  <TabPanel value="chapters">
                    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => setOpenAddChapterModal(true)}
                      >
                        Добавить главу
                      </Button>
                    </Stack>
                    <DataGrid
                      rows={chapters.data as any}
                      columns={columns}
                      disableRowSelectionOnClick
                    />
                  </TabPanel>
                </TabContext>
              </Paper>
              <Paper></Paper>
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <AddMangaChapter
        open={openAddChapterModal}
        onClose={() => setOpenAddChapterModal(false)}
        mangaId={+mangaId}
        teamId={selectedTeam}
        onSuccess={() => chapters.refetch()}
      />
    </>
  );
};

interface Params extends ParsedUrlQuery {
  mangaId: string;
}

export const getServerSideProps: GetServerSideProps<
  { initialManga: MangaDto | null },
  Params
> = async (context) => {
  const mangaId = context.params?.mangaId;
  let initialManga = null;

  if (mangaId) {
    initialManga = (await Api.manga.get(+mangaId)) || null;
  }

  return {
    props: {
      initialManga,
    },
  };
};

export default TeamProfile;
