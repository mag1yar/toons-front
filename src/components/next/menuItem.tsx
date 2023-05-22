import { MenuItemProps, MenuItem as MuiMenuItem } from '@mui/material';
import Link, { LinkProps } from 'next/link';
import React from 'react';

type NextMenuItem = LinkProps & MenuItemProps;

const MenuItem = (props: NextMenuItem) => {
  const { href, children, ...MuiProps } = props;
  return (
    <Link href={href} passHref style={{ textDecoration: 'none', color: 'unset' }}>
      <MuiMenuItem LinkComponent="a" {...MuiProps}>
        {children}
      </MuiMenuItem>
    </Link>
  );
};

export default MenuItem;
