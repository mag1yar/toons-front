import { useState, useEffect, MouseEvent, Dispatch, SetStateAction } from 'react';

type AnchorElementType = HTMLElement | null;

type AnchorHookReturn = [
  AnchorElementType,
  boolean,
  (event: MouseEvent<HTMLElement>) => void,
  () => void,
  Dispatch<SetStateAction<AnchorElementType>>
];

function useAnchor(): AnchorHookReturn {
  const [anchorEl, setAnchorEl] = useState<AnchorElementType>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return [anchorEl, open, handleClick, handleClose, setAnchorEl];
}

export default useAnchor;
