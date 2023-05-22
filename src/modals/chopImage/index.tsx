import { Button, Dialog } from '@mui/material';
import React, { WheelEvent, useRef, useState } from 'react';
import ImageEditor from 'react-avatar-editor';

interface ChopImageProps {
  open: boolean;
  onClose: (val: boolean) => void;
  image: any;
  onChop: any;
  width: number;
  height: number;
}

const ChopImageModal: React.FC<ChopImageProps> = (props) => {
  const { onClose, open, image, onChop, width, height } = props;

  const ref = useRef<any>();
  const [scale, setScale] = useState(1);

  const handleSubmit = async () => {
    const url = ref?.current?.getImageScaledToCanvas().toDataURL();
    if (!url) return;
    const mimeType = (url?.match(/^data:([^;]+);/) || '')[1];
    const image = await fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], 'image.png', { type: mimeType });
      });
    onChop(url, image);
  };

  const handleWheel = (event: React.WheelEvent) => {
    const newScale = scale - event.deltaY * 0.001;
    setScale(newScale < 1 ? 1 : newScale > 10 ? 10 : newScale);
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose(false);
        setScale(1);
        // setSearchType("novels")
      }}
      onWheel={handleWheel}
    >
      <ImageEditor
        ref={ref}
        image={image}
        scale={scale}
        width={width}
        height={height}
      />
      <Button
        variant="contained"
        onClick={() => {
          handleSubmit();
          setScale(1);
        }}
      >
        Сохранить
      </Button>
    </Dialog>
  );
};

export default ChopImageModal;
