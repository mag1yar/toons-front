import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import {
  AddCircleOutlineRounded as AddCircleOutlineRoundedIcon,
  ExpandLessRounded as ExpandLessRoundedIcon,
  ExpandMoreRounded as ExpandMoreRoundedIcon,
  GroupsRounded as GroupsRoundedIcon,
  LogoutRounded as LogoutRoundedIcon,
  MailRounded as MailRoundedIcon,
  MenuBookRounded as MenuBookRoundedIcon,
  MenuRounded as MenuRoundedIcon,
  SettingsRounded as SettingsRoundedIcon,
} from '@mui/icons-material';
import {
  Badge,
  Box,
  Button,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ThemeToggler from './themeToggler';
import { AuthModal } from '@/src/modals';
import { useSessionStore } from '@/src/zustand';
import { UserAvatar } from '@/src/components';
import { NextListItemButton } from '@/src/components';
import { getDisplayCurrentPage, getPagesList } from './helpers';

const items = getPagesList();

function DrawerButton() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const { user, isAuthenticated } = useSessionStore((state) => state.session);
  const signOut = useSessionStore((state) => state.signOut);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));

  const [openDrawer, setOpenDrawer] = useState(false);
  const handleOpenDrawer = () => setOpenDrawer(true);
  const handleCloseDrawer = () => setOpenDrawer(false);

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const handleOpenAuthModal = () => setOpenAuthModal(true);
  const handleCloseAuthModal = () => setOpenAuthModal(false);

  const [openCatalog, setOpenCatalog] = useState(true);
  const toggleCatalog = () => setOpenCatalog((state) => !state);

  const { pageKey } = getDisplayCurrentPage(router.asPath);

  const handleSignOut = () => {
    handleCloseDrawer();
    signOut();
    enqueueSnackbar('Сәтті шықтыңыз', { variant: 'success' });
  };

  return (
    <>
      <Tooltip title="Меню" arrow>
        <IconButton size="small" onClick={handleOpenDrawer} color="inherit">
          {isAuthenticated ? (
            <Badge badgeContent={15} color="info">
              <UserAvatar sx={{ width: 28, height: 28, fontSize: 'smaller' }} />
            </Badge>
          ) : (
            <MenuRoundedIcon />
          )}
        </IconButton>
      </Tooltip>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={handleCloseDrawer}
        sx={{
          '& .MuiDrawer-paper': { width: 250 },
        }}
      >
        <Stack
          direction="column"
          justifyContent="space-between"
          spacing={1}
          sx={{ height: '100%' }}
        >
          <Box sx={{ padding: 1 }}>
            {isAuthenticated ? (
              <List dense component="nav" disablePadding>
                <ListItemButton dense selected onClick={() => router.push('/profile')}>
                  <ListItemAvatar sx={{ marginLeft: '-3px', paddingRight: '19px' }}>
                    <UserAvatar />
                  </ListItemAvatar>
                  <ListItemText primary={user?.name} secondary="Профиль" />
                  <Tooltip title="Баптаулар" arrow>
                    <IconButton
                      LinkComponent={Link}
                      href="/settings"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <SettingsRoundedIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemButton>
                <List dense component="div" disablePadding>
                  <NextListItemButton dense href="/messages">
                    <ListItemIcon sx={{ paddingLeft: 1 }}>
                      <MailRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Хабарлар" />
                    <Typography variant="caption" sx={{ mr: 0.5 }}>
                      15
                    </Typography>
                  </NextListItemButton>
                  <ListItemButton dense onClick={() => router.push('/t')}>
                    <ListItemIcon sx={{ paddingLeft: 1 }}>
                      <GroupsRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Командалар" />
                    <Tooltip title="Добавить команду" arrow>
                      <IconButton
                        LinkComponent={Link}
                        href="/t/new"
                        onClick={(e) => e.stopPropagation()}
                        size="small"
                        sx={{ p: 0 }}
                      >
                        <AddCircleOutlineRoundedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </ListItemButton>
                  <ListItemButton dense onClick={handleSignOut}>
                    <ListItemIcon sx={{ paddingLeft: 1 }}>
                      <LogoutRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Шығу" />
                  </ListItemButton>
                </List>
              </List>
            ) : (
              <Button size="large" variant="contained" fullWidth onClick={handleOpenAuthModal}>
                Кіру
              </Button>
            )}
            {isMobile && (
              <>
                <Divider sx={{ mt: 1 }} />
                <List dense component="nav" sx={{ width: '100%' }}>
                  <ListItemButton dense onClick={toggleCatalog}>
                    <ListItemIcon sx={{ paddingLeft: 1 }}>
                      <MenuBookRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Каталог" />
                    {openCatalog ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
                  </ListItemButton>
                  <Collapse in={openCatalog} timeout="auto" unmountOnExit>
                    {items.map(({ key, label }) => {
                      if (label === 'Divider') return <Divider key={key} sx={{ mt: 1, mb: 1 }} />;
                      return (
                        <NextListItemButton
                          key={key}
                          href={key}
                          selected={key === pageKey}
                          dense
                          sx={{ pl: 3 }}
                          onClick={handleCloseDrawer}
                        >
                          <ListItemText primary={label} />
                        </NextListItemButton>
                      );
                    })}
                  </Collapse>
                </List>
              </>
            )}
          </Box>

          <ThemeToggler />
        </Stack>
      </Drawer>
      <AuthModal open={openAuthModal} handleClose={handleCloseAuthModal} />
    </>
  );
}

export default DrawerButton;
