import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Card, NextListItemButton, UserAvatar } from '@/src/components';
import {
  Box,
  Button,
  ButtonGroup,
  Collapse,
  Container,
  Divider,
  List,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Tab,
  Tooltip,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import Grid from '@mui/material/Unstable_Grid2';
import { useSessionStore } from '@/src/zustand';
import { useRouter } from 'next/router';
import {
  FavoriteBorderRounded as FavoriteBorderRoundedIcon,
  NotificationsRounded as NotificationsRoundedIcon,
  Upload,
  VisibilityOffRounded as VisibilityOffRoundedIcon,
  VisibilityRounded as VisibilityRoundedIcon,
} from '@mui/icons-material';
import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab';
import Field from '@/src/components/field';
import { useQuery } from 'react-query';
import Api from '@/src/api';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { TeamDto } from '@/src/api/team/types';
import Link from 'next/link';
import TextCollapse from '@/src/components/textCollapse';

interface TeamProfileProps {
  initialTeam: TeamDto | null;
}

const TeamProfile = (props: TeamProfileProps) => {
  const { initialTeam } = props;

  const router = useRouter();
  const { teamId = 0 } = router.query;

  const { isLoading, data: team } = useQuery(['team', teamId], () => Api.team.get(+teamId), {
    initialData: initialTeam,
    enabled: !!teamId,
  });

  const { isAuthenticated, user } = useSessionStore((state) => state.session);
  const isAuthor = team?.author.id === user?.id;
  const hasAnime = false;
  const hasManga = (team?.mangas?.length || 0) > 0;
  const hasRanobe = false;

  const [selectedTab, setSelectedTab] = useState('info');

  return (
    <>
      <Head>
        <title>Toons | Команда</title>
      </Head>
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid lg={3} md={3} sm={4} xs={12}>
            <Paper>
              <Box sx={{ position: 'relative', width: '100%', pb: '100%' }}>
                <Avatar
                  name={team?.name || ''}
                  src={team?.avatar}
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
                  Участники
                </Divider>
                <List dense component="div" disablePadding>
                  <NextListItemButton dense href={isAuthor ? '/profile' : `/u/${team?.author.id}`}>
                    <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
                      <Avatar
                        src={team?.author.avatar || ''}
                        name=""
                        sx={{ width: 24, height: 24 }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={team?.author.name} />
                    <Typography variant="caption">Автор</Typography>
                  </NextListItemButton>
                </List>
              </Stack>
            </Paper>
          </Grid>
          <Grid lg={9} md={9} sm={8} xs={12}>
            <Stack spacing={1}>
              <Typography variant="h6">{team?.name}</Typography>
              <Paper>
                <TabContext value={selectedTab}>
                  <TabList onChange={(_, tab) => setSelectedTab(tab)}>
                    <Tab label="Инфо" value="info" />
                    {hasAnime && <Tab label="Аниме" value="anime" />}
                    {hasManga || (true && <Tab label="Манга" value="manga" />)}
                    {hasRanobe && <Tab label="Ранобэ" value="ranobe" />}
                  </TabList>
                  <TabPanel value="info">
                    <TextCollapse>{team?.description}</TextCollapse>
                  </TabPanel>
                  {hasAnime && <TabPanel value="anime">No Content</TabPanel>}
                  {hasManga ||
                    (true && (
                      <TabPanel value="manga">
                        <Stack>
                          {isAuthor && (
                            <Link
                              href={{ pathname: '/m/new', query: { t: teamId } }}
                              passHref
                              style={{ color: 'unset' }}
                            >
                              <Button
                                LinkComponent="a"
                                variant="contained"
                                sx={{ float: 'right', mt: 1, mb: 1 }}
                              >
                                Добавить
                              </Button>
                            </Link>
                          )}
                          <Grid container spacing={1}>
                            {team?.mangas?.map((m, index) => (
                              <Grid key={index} xs={3}>
                                <Card
                                  primary={m.name}
                                  href={`/m/${m.id}`}
                                  src={m.avatar}
                                  variant="rectangular"
                                />
                              </Grid>
                            ))}
                          </Grid>
                        </Stack>
                      </TabPanel>
                    ))}
                  {hasRanobe && <TabPanel value="ranobe">No Content</TabPanel>}
                </TabContext>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

interface Params extends ParsedUrlQuery {
  teamId: string;
}

export const getServerSideProps: GetServerSideProps<
  { initialTeam: TeamDto | null },
  Params
> = async (context) => {
  const teamId = context.params?.teamId;
  let initialTeam = null;

  if (teamId) {
    initialTeam = (await Api.team.get(+teamId)) || null;
  }

  return {
    props: {
      initialTeam,
    },
  };
};

export default TeamProfile;
