import { NextMenuItem } from '@/src/components';
import { useAnchor } from '@/src/hooks';
import { ArrowDropDownRounded as ArrowDropDownRoundedIcon } from '@mui/icons-material';
import { Button, Divider, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { getDisplayCurrentPage, getPagesList } from './helpers';

const items = getPagesList();

function CatalogButton() {
  const [catalogAnchor, openCatalog, handleClickCatalog, handleCloseCatalog] = useAnchor();
  const router = useRouter();
  const { displayPage, pageKey } = getDisplayCurrentPage(router.asPath);

  return (
    <>
      <Button
        size="small"
        endIcon={<ArrowDropDownRoundedIcon />}
        onClick={handleClickCatalog}
        color="inherit"
      >
        Каталог
      </Button>
      <Menu
        open={openCatalog}
        anchorEl={catalogAnchor}
        onClose={handleCloseCatalog}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {items.map(({ key, label }) => {
          if (label === 'Divider') return <Divider key={key} sx={{ m: 1 }} />;
          return (
            <NextMenuItem key={key} href={key} selected={key === pageKey} dense>
              {label}
            </NextMenuItem>
          );
        })}
      </Menu>
    </>
  );
}

export default CatalogButton;
