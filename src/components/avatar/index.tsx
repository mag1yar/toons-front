import React, { memo } from 'react';
import { Avatar as MuiAvatar, useTheme } from '@mui/material';
import { PickColorsByName } from './helpers';
import { AvatarProps } from './types';
import { useSessionStore } from '@/src/zustand';
import { PersonRounded as PersonRoundedIcon } from '@mui/icons-material';

const Avatar = (props: AvatarProps) => {
  const { name, src, sx } = props;

  if (src) {
    return <MuiAvatar {...props} sx={{ ...sx }} src={src} />;
  }

  const { avatarBackground, avatarText } = PickColorsByName(name);

  return (
    <MuiAvatar {...props} sx={{ ...sx, bgcolor: avatarBackground, color: avatarText }}>
      {name.charAt(0).toUpperCase()}
    </MuiAvatar>
  );
};

export default memo(Avatar);
