import React, { ReactNode } from 'react';
import { CssBaseline, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import { useGlobalThemeStore } from '../zustand';

interface MainLayoutProps {
  children: ReactNode;
}

function Theme(props: MainLayoutProps) {
  const { children } = props;

  const preferredTheme = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light';
  const globalTheme = useGlobalThemeStore((state) => state.globalTheme);

  const mode = globalTheme == 'system' ? preferredTheme : globalTheme;

  const isDark = mode === 'dark';

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: { default: isDark ? '#121212' : '#f6f7f9' },
          primary: {
            main: '#fa7268',
            contrastText: isDark ? undefined : 'white',
          },
        },
        components: {
          MuiToolbar: {
            styleOverrides: {
              root: {
                minHeight: 45,
                '@media (min-width: 600px)': {
                  minHeight: 50,
                },
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
              },
              sizeSmall: {
                // '&:has(svg)': {
                //   paddingLeft: 15,
                //   paddingRight: 15,
                // },
                '&:not(:has(svg))': {
                  minWidth: 25,
                },
                // Уменьшил расстояние между иконкой и текстом
                '& .MuiButton-endIcon': {
                  marginLeft: 2,
                },
                '& .MuiButton-startIcon': {
                  marginRight: 2,
                },
              },
              // sizeMedium: {
              //   borderRadius: 18,
              // },
              // sizeLarge: {
              //   borderRadius: 21,
              // },
            },
          },
          MuiMenuItem: {
            styleOverrides: {
              root: {
                marginLeft: 8,
                marginRight: 8,
                borderRadius: 5,
              },
              divider: {
                marginLeft: 'unset',
                marginRight: 'unset',
                borderRadius: 'unset',
              },
              dense: {
                fontSize: 'small',
              },
            },
          },
          MuiListItemButton: {
            styleOverrides: {
              root: {
                borderRadius: 5,
              },
              dense: {
                fontSize: 'small',
                '& .MuiListItemIcon-root': {
                  fontSize: 'small',
                  '& .MuiSvgIcon-root': {
                    fontSize: 'large',
                  },
                },
              },
            },
          },
          MuiListItemText: {
            styleOverrides: {
              dense: {
                fontSize: 'small',
                '& .MuiTypography-root': {
                  fontSize: 'small',
                },
              },
            },
          },
          MuiTabs: {
            styleOverrides: {
              root: {
                minHeight: 'unset',
              },
            },
          },
          MuiTab: {
            styleOverrides: {
              root: {
                fontSize: 'small',
                textTransform: 'unset',
                minHeight: 'unset',
              },
            },
          },
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default Theme;
