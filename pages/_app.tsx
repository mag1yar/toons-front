import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SnackbarProvider } from 'notistack';

import Theme from '@/src/theme';
import { MainLayout } from '@/src/layouts/mainLayout';
import ConfirmationModal from '@/src/modals/confirmation';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Backdrop, CircularProgress } from '@mui/material';
import Progress from '@/src/components/progress';
import { useSessionStore } from '@/src/zustand';
import Api from '@/src/api';
import { useRouter } from 'next/router';

const client = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();

  const { isAuthenticated, user } = useSessionStore((state) => state.session);

  useEffect(() => {
    setIsHydrated(true);

    if (isAuthenticated) Api.auth.validateToken().then((isValid) => !isValid && router.push('/'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <QueryClientProvider client={client}>
        <Theme>
          <SnackbarProvider>
            <MainLayout>
              {isHydrated ? (
                <>
                  <Progress />
                  <Component {...pageProps} />
                </>
              ) : (
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
                  <CircularProgress color="inherit" />
                </Backdrop>
              )}
            </MainLayout>
            <ConfirmationModal />
          </SnackbarProvider>
        </Theme>
      </QueryClientProvider>
    </>
  );
}
