// Upload.tsx
import React, { useState, ReactNode, ChangeEventHandler, useEffect } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { Box, BoxProps, ButtonBase, IconButton, Typography } from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { ChopImageModal } from '@/src/modals';
import Image from 'next/image';

type UploadProps = {
  children?: ReactNode;
  name: string;
  accept: string;
  imageWidth: number;
  imageHeight: number;
} & BoxProps;

const Upload: React.FC<UploadProps> = (props) => {
  const { children, name, accept = 'image/*', imageHeight, imageWidth, ...boxProps } = props;

  const [openChop, setOpenChop] = useState<boolean>(false);
  const [imageChop, setImageChop] = useState('');

  const [hover, setHover] = useState<boolean>(false);
  const [preview, setPreview] = useState('');

  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useFormContext();

  const file = watch(name);

  useEffect(() => {
    if (preview) return;

    if (file && typeof file !== 'object') {
      setPreview(file);
      return;
    }

    const getFile = async () => {
      if (!file) return;

      const fileSrc = fileToBase64(file);
      setValue(name, file);
      setPreview(await fileSrc);
    };
    getFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString() || '');
      reader.onerror = (error) => reject(error);
    });
  };

  const OnUploadImage = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setImageChop(URL.createObjectURL(e.target.files[0]));
      setOpenChop(true);
    }
  };

  const handleReceiveImage = (val: string, file: File) => {
    setPreview(val);
    setValue(name, file);
    setOpenChop(false);
  };

  return (
    <>
      <Box
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        {...boxProps}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          display: 'block',
          ...boxProps.sx,
        }}
      >
        {preview ? <Image style={{ objectFit: 'cover' }} fill src={preview} alt="" /> : children}
        {hover && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <ButtonBase
              color="primary"
              component="label"
              sx={{
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}
            >
              <CloudUploadIcon fontSize="medium" />
              <input
                {...register(name)}
                type="file"
                accept={accept}
                hidden
                onChange={OnUploadImage}
              />
            </ButtonBase>
          </Box>
        )}
      </Box>
      <ChopImageModal
        open={openChop}
        onClose={setOpenChop}
        image={imageChop}
        onChop={handleReceiveImage}
        width={imageWidth}
        height={imageHeight}
      />
    </>
  );
};

export default Upload;
