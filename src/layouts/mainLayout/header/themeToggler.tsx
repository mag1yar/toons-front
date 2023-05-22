import React from 'react';
import { useGlobalThemeStore } from '@/src/zustand';
import {
  SettingsBrightnessRounded as SettingsBrightnessRoundedIcon,
  DarkModeRounded as DarkModeRoundedIcon,
  LightModeRounded as LightModeRoundedIcon,
} from '@mui/icons-material';
import { ToggleButton, ToggleButtonGroup, Tooltip, styled } from '@mui/material';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const list = [
  { value: 'light', title: 'Жарық', icon: <LightModeRoundedIcon /> },
  { value: 'system', title: 'Жүйелік', icon: <SettingsBrightnessRoundedIcon /> },
  { value: 'dark', title: 'Қара', icon: <DarkModeRoundedIcon /> },
];

function ThemeToggler() {
  const globalTheme = useGlobalThemeStore((state) => state.globalTheme);
  const setGlobalTheme = useGlobalThemeStore((state) => state.setGlobalTheme);

  return (
    <StyledToggleButtonGroup
      value={globalTheme}
      onChange={(_, theme) => setGlobalTheme(theme)}
      exclusive
      aria-label="global theme"
      size="small"
      fullWidth
    >
      {list.map(({ icon, title, value }) => (
        <Tooltip key={value} title={title} arrow>
          <ToggleButton selected={value === globalTheme} value={value}>
            {icon}
          </ToggleButton>
        </Tooltip>
      ))}
    </StyledToggleButtonGroup>
  );
}

export default ThemeToggler;
