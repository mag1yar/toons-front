import { ListItemButtonProps, ListItemButton as MuiListItemButton } from '@mui/material';
import Link, { LinkProps } from 'next/link';
import React from 'react';

type NextMenuItem = LinkProps & ListItemButtonProps;

const ListItemButton = (props: NextMenuItem) => {
  const { href, children, ...MuiProps } = props;
  return (
    <Link href={href} passHref style={{ textDecoration: 'none', color: 'unset' }}>
      <MuiListItemButton LinkComponent="a" {...MuiProps}>
        {children}
      </MuiListItemButton>
    </Link>
  );
};

export default ListItemButton;
