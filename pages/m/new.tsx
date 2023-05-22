import React from 'react';
import { Container, Stack } from '@mui/material';
import Head from 'next/head';
import Grid from '@mui/material/Unstable_Grid2';
import { useRouter } from 'next/router';
import Upload from '@/src/components/upload';
import { FormProvider, useForm } from 'react-hook-form';
import Field from '@/src/components/field';
import { LoadingButton } from '@mui/lab';
import { useMutation } from 'react-query';
import Api from '@/src/api';
import Avatar from '@/src/components/avatar';
import { useSessionStore } from '@/src/zustand';
import { CreateMangaBody } from '@/src/api/manga/types';

const NewTeam = () => {
  const router = useRouter();
  const { t: teamId = 0 } = router.query;

  const { user, isAuthenticated } = useSessionStore((state) => state.session);

  const formMethods = useForm<CreateMangaBody>();
  const { handleSubmit, watch } = formMethods;

  const mangaName = watch('name', '');

  const saveNewMangaMutation = useMutation(Api.manga.create, {
    onSuccess: (data) => {
      router.push(`/m/${data?.id}`);
    },
  });

  const onSubmit = (data: CreateMangaBody) =>
    saveNewMangaMutation.mutate({ ...data, authorId: user?.id || 0, teamId: +teamId});

  return (
    <>
      <Head>
        <title>Toons | Новая манга</title>
      </Head>
      <Container maxWidth="lg">
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1}>
              <Grid lg={3} md={3} sm={4} xs={12}>
                <Upload
                  name="avatar"
                  accept="image/png"
                  imageWidth={225 * 2}
                  imageHeight={337 * 2}
                  sx={{ position: 'relative', borderRadius: 2, width: '100%', pb: '150%' }}
                >
                  <Avatar
                    name={mangaName}
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
                  <Field name="name" label="Название" fullWidth />
                  <Field name="description" label="Описание" fullWidth multiline />
                </Stack>
              </Grid>
            </Grid>

            <LoadingButton
              type="submit"
              variant="contained"
              sx={{ mt: 1, float: 'right' }}
              loading={saveNewMangaMutation.isLoading}
            >
              Создать
            </LoadingButton>
          </form>
        </FormProvider>
      </Container>
    </>
  );
};

export default NewTeam;
