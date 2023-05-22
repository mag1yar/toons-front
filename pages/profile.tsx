import React from 'react';
import { UserAvatar } from '@/src/components';
import { Container, Divider, Paper, Stack, Tooltip, Typography } from '@mui/material';
import Head from 'next/head';
import Grid from '@mui/material/Unstable_Grid2';
import { useSessionStore } from '@/src/zustand';
import { useRouter } from 'next/router';
import {
  FavoriteBorderRounded as FavoriteBorderRoundedIcon,
  VisibilityRounded as VisibilityRoundedIcon,
} from '@mui/icons-material';

const Profile = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useSessionStore((state) => state.session);

  return (
    <>
      <Head>
        <title>Toons | Профиль</title>
      </Head>
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid lg={3} md={3} sm={4} xs={12}>
            <Paper>
              <UserAvatar
                variant="rounded"
                sx={{
                  width: '100%',
                  height: '100%',
                  fontSize: 'xxx-large',
                }}
              />
              <Stack spacing={1} sx={{ p: 1 }}>
                <Divider textAlign="left" sx={{ fontSize: 'small' }}>
                  Инфо
                </Divider>
                <Tooltip arrow title="Общее количество просмотренных аниме">
                  <Typography variant="caption" display="flex" alignItems="center">
                    <VisibilityRoundedIcon sx={{ mr: 1 }} /> Аниме
                  </Typography>
                </Tooltip>
                <Tooltip arrow title="Общее количество прочитанных манг">
                  <Typography variant="caption" display="flex" alignItems="center">
                    <VisibilityRoundedIcon sx={{ mr: 1 }} /> Манга
                  </Typography>
                </Tooltip>
                <Tooltip arrow title="Общее количество прочитанных ранобэ">
                  <Typography variant="caption" display="flex" alignItems="center">
                    <VisibilityRoundedIcon sx={{ mr: 1 }} /> Ранобэ
                  </Typography>
                </Tooltip>
                <Tooltip arrow title="Кол. лайков">
                  <Typography variant="caption" display="flex" alignItems="center">
                    <FavoriteBorderRoundedIcon sx={{ mr: 1 }} /> Лайк
                  </Typography>
                </Tooltip>
              </Stack>
            </Paper>
          </Grid>
          <Grid lg={9} md={9} sm={8} xs={12} spacing={1}>
            <Typography variant="h5" textAlign="left">
              {user?.name}
            </Typography>
            <Paper sx={{ p: 1 }}>Контент</Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Profile;
