import React, { ReactNode } from 'react';
import Header from './header';
import { Box } from '@mui/material';

type MainLayoutProps = {
  children: ReactNode;
};

export const MainLayout = (props: MainLayoutProps) => {
  const { children } = props;

  return (
    <>
      <Header />
      <Box mb={1} />
      {children}
    </>
  );
};
