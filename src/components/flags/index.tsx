import React from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';
import { FlagProps } from './types';

// Сайт с флагами https://flagdownload.com/flag-of-russia/
const Flags = (props: FlagProps) => {
  const { code, size = 24, boxProps = {} } = props;
  const flagSrc = `/flags/${code}-256x256.png`;
  return (
    <Box {...boxProps} sx={{ position: 'relative', width: size, height: size, ...boxProps.sx }}>
      <Image src={flagSrc} alt={`Флаг ${code}`} loading="lazy" fill style={{ borderRadius: 8 }} />
    </Box>
  );
};

export default Flags;
