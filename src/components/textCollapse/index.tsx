import {
  VisibilityOffRounded as VisibilityOffRoundedIcon,
  VisibilityRounded as VisibilityRoundedIcon,
} from '@mui/icons-material';
import { Button, Collapse, Typography } from '@mui/material';
import React, { ReactNode, useEffect, useRef, useState } from 'react';

type TextCollapseProps = {
  children: ReactNode;
};

const TextCollapse = (props: TextCollapseProps) => {
  const { children = '' } = props;

  const [showDescription, setShowDescription] = useState(false);

  const [descriptionHeight, setDescriptionHeight] = useState(0);
  const descriptionRef = useRef<any>(null);

  useEffect(() => {
    setDescriptionHeight(descriptionRef?.current?.clientHeight || 0);
  }, [children]);

  return (
    <>
      <Collapse
        in={showDescription}
        collapsedSize={descriptionHeight < 60 ? descriptionHeight + 5 : 60}
      >
        <Typography ref={descriptionRef} align="justify" variant="body2" whiteSpace="pre-line">
          {children}
        </Typography>
      </Collapse>
      {descriptionHeight > 60 && (
        <Button
          variant="outlined"
          color="inherit"
          size="small"
          onClick={() => setShowDescription(!showDescription)}
          startIcon={showDescription ? <VisibilityRoundedIcon /> : <VisibilityOffRoundedIcon />}
        >
          {showDescription ? 'Скрыть' : 'Больше...'}
        </Button>
      )}
    </>
  );
};

export default TextCollapse;
