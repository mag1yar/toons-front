import React, { useEffect, useState } from 'react';
import { UserAvatar } from '@/src/components';
import { Box, Button, Container, Paper, Stack, Tab, Typography } from '@mui/material';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Grid from '@mui/material/Unstable_Grid2';
import { useSessionStore } from '@/src/zustand';
import { useRouter } from 'next/router';
import Upload from '@/src/components/upload';
import { FormProvider, useForm } from 'react-hook-form';
import Field from '@/src/components/field';
import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab';
import { useMutation } from 'react-query';
import Api from '@/src/api';
import { User } from '@/src/types/user';

const Profile = () => {
  const router = useRouter();
  const signIn = useSessionStore((state) => state.signIn);
  const { isAuthenticated, user } = useSessionStore((state) => state.session);
  const [selectedTab, setSelectedTab] = useState('general');

  const formMethods = useForm({ defaultValues: user });
  const { handleSubmit } = formMethods;

  const saveUpdatedUserMutation = useMutation(Api.auth.updateUser, {
    onSuccess: (data) => {
      signIn(data);
    },
  });

  const onSubmit = (data: User) => saveUpdatedUserMutation.mutate(data);

  return (
    <>
      <Head>
        <title>Toons | Баптаулар</title>
      </Head>
      <Container maxWidth="lg">
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TabContext value={selectedTab}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList
                  onChange={(_, tab) => setSelectedTab(tab)}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Общие" value="general" />
                  <Tab label="Уведомления" value="notifications" />
                </TabList>
              </Box>
              <TabPanel value="general">
                <Grid container spacing={1}>
                  <Grid lg={3} md={3} sm={4} xs={12}>
                    <Upload
                      name="avatar"
                      accept="image/png"
                      imageWidth={500}
                      imageHeight={500}
                      sx={{ borderRadius: 2, width: '100%', pb: '100%' }}
                    >
                      <UserAvatar
                        variant="square"
                        sx={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          fontSize: 'xxx-large',
                        }}
                      />
                    </Upload>
                  </Grid>
                  <Grid lg={9} md={9} sm={8} xs={12}>
                    <Stack spacing={1}>
                      <Field disabled name="name" label="Қолданушы аты" fullWidth />
                      <Field name="email" type="email" label="Эл. пошта" fullWidth />
                    </Stack>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value="notifications">Notifications</TabPanel>
            </TabContext>

            <LoadingButton
              type="submit"
              variant="contained"
              sx={{ mt: 1, float: 'right' }}
              loading={saveUpdatedUserMutation.isLoading}
            >
              Сохранить
            </LoadingButton>
          </form>
        </FormProvider>
      </Container>
    </>
  );
};

export default Profile;
