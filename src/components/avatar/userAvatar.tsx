import React from 'react';
import { Avatar as MuiAvatar } from '@mui/material';
import { UserAvatarProps } from './types';
import { useSessionStore } from '@/src/zustand';
import { PersonRounded as PersonRoundedIcon } from '@mui/icons-material';
import Avatar from '.';

const UserAvatar = (props: UserAvatarProps) => {
  const { sx } = props;

  const { isAuthenticated, user } = useSessionStore((state) => state.session);

  if (!isAuthenticated)
    return (
      <MuiAvatar {...props}>
        <PersonRoundedIcon />
      </MuiAvatar>
    );

  return <Avatar {...props} sx={{ ...sx }} name={user?.name || ''} src={user?.avatar} />;
};

export default UserAvatar;
