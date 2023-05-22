import dynamic from 'next/dynamic';

export { default as NextLink } from './next/link';
export { default as NextMenuItem } from './next/menuItem';
export { default as NextListItemButton } from './next/listItemButton';
export { default as Slider } from './slider';
export { default as Card } from './card';
export { default as Avatar } from './avatar';
export const UserAvatar = dynamic(() => import('./avatar/userAvatar'), {
  ssr: false,
});
