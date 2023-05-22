import Api from '@/src/api';
import { LoadingButton } from '@mui/lab';
import { Container, Stack, Typography } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';

type RouterQuery = {
  t: string;
  m: string;
};

const Confirm = () => {
  const [isVerified, setIsVerified] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();
  const { t: token, m: mode } = router.query as RouterQuery;

  const verifyMutation = useMutation(Api.auth.verify, {
    onSuccess: (isVerified) => {
      setIsVerified(isVerified);
    //   enqueueSnackbar('Вы успешно подтвердили аккаунт', { variant: 'success' });
    },
    onError: (error) => {
    //   enqueueSnackbar('Не удалось подтвердить аккаунт', { variant: 'error' });
    },
  });

  const resetPasswordMutation = useMutation(Api.auth.resetPassword, {
    onSuccess: (isVerified) => {
      setIsVerified(isVerified);
    //   enqueueSnackbar('Вы успешно подтвердили аккаунт', { variant: 'success' });
    },
    onError: (error) => {
    //   enqueueSnackbar('Не удалось подтвердить аккаунт', { variant: 'error' });
    },
  });

  useEffect(() => {
    if (!router.isReady) return;
    if (+mode === 1) verifyMutation.mutate(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>Toons | Подтверждение</title>
      </Head>
      <Container maxWidth="xs">
        <Stack spacing={1}>
          <Typography>
            {isVerified ? 'Вы успешно подтвердили аккаунт' : 'Идет процесс подтверждения аккаунта'}
          </Typography>
          <LoadingButton LinkComponent={Link} href="/" loading={verifyMutation.isLoading}>
            На главную страницу
          </LoadingButton>
        </Stack>
      </Container>
    </>
  );
};

export default Confirm;
