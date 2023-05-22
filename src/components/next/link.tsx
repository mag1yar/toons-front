import NextLink, { LinkProps } from 'next/link';
import { forwardRef } from 'react';

const Link = forwardRef<HTMLAnchorElement, LinkProps>(function LinkBehaviour(props, ref) {
  return <NextLink ref={ref} {...props} />;
});

export default Link;
