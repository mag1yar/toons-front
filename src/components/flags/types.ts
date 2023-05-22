import { BoxProps } from '@mui/material';

export type FlagProps = {
  code: CountryCode;
  size?: number;
  boxProps?: BoxProps;
};

type CountryCode = 'ch' | 'jp' | 'kr' | 'kz' | 'ru';
