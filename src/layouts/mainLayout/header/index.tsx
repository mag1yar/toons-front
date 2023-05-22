import {
  AppBar,
  Slide,
  Box,
  Container,
  Toolbar,
  useScrollTrigger,
  Button,
  Stack,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import React from 'react';
import Link from 'next/link';
import LogoSvg from '../../../../public/logo.svg';
import NextImage from 'next/image';
import CatalogButton from './catalogButton';
import SearchButton from './searchButton';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { getDisplayCurrentPage } from './helpers';

const DynamicDrawerButton = dynamic(() => import('./drawerButton'), {
  ssr: false,
});
interface HeaderProps {}

interface HideOnScrollProps {
  children: React.ReactElement;
}

function HideOnScroll(props: HideOnScrollProps) {
  const { children } = props;

  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function Header(props: HeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up(theme.breakpoints.values.sm));
  const router = useRouter();
  const { displayPage, pageKey } = getDisplayCurrentPage(router.asPath);

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar elevation={theme.palette.mode === 'dark' ? 1 : 0}>
          <Container>
            <Toolbar sx={{ padding: '0 !important' }}>
              <IconButton component={Link} href="/" size="small">
                <NextImage src={LogoSvg} alt="" width={30} height={30} />
              </IconButton>
              {displayPage && (
                <Button
                  component={Link}
                  href={pageKey}
                  color={theme.palette.mode === 'dark' ? 'primary' : 'inherit'}
                  size="small"
                >
                  {displayPage}
                </Button>
              )}
              {isMobile && (
                <>
                  <Box sx={{ flexGrow: 1 }} />
                  <Stack direction="row" spacing={1}>
                    <CatalogButton />
                  </Stack>
                </>
              )}
              <Box sx={{ flexGrow: 1 }} />
              <Box>
                <SearchButton />
                <DynamicDrawerButton />
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </>
  );
}

export default Header;
