import React from 'react';
import { Box, BoxProps, Typography } from '@mui/material';
import Image from 'next/image';

import NoImagePng from '../../../public/NoImage.png';
import NextLink from 'next/link';
import Flags from '../flags';

export type CardProps = {
  primary: string;
  secondary?: string;
  src?: string;
  href?: string;
  variant?: 'square' | 'rectangular';
} & BoxProps;

const Card = (props: CardProps) => {
  const { variant, primary, secondary, src, href = '/', sx = {}, ...allProps } = props;

  return (
    <NextLink href={href} passHref style={{ textDecoration: 'none', color: 'unset' }}>
      <Box
        {...allProps}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          width: '100%',
          height: variant ? '0' : '100%',
          pb: variant ? (variant === 'square' ? '100%' : '150%') : undefined,
          ...sx,
        }}
      >
        {/* <Flags code="kz" size={24} boxProps={{ sx: { position: 'absolute', right: 5, top: 5 } }} /> */}
        <Image
          src={src || NoImagePng}
          fill
          alt=""
          style={{ width: '100%', height: '100%', borderRadius: 10 }}
        />
      </Box>
      <Box sx={{ paddingLeft: 0.5, paddingRight: 0.5, position: 'relative' }}>
        <Typography variant="subtitle2" noWrap fontSize="small">
          {primary}
        </Typography>
        {secondary && (
          <Typography variant="body2" fontSize="small">
            {secondary}
          </Typography>
        )}
      </Box>
    </NextLink>
  );
};

export default Card;
