import { Buffer } from 'buffer';

export const getImageSizeFromBase64 = (base64Data: string) => {
  const base64Image = base64Data.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
  const buffer = Buffer.from(base64Image, 'base64');
  const size = {
    width: 0,
    height: 0,
  };

  if (typeof window !== 'undefined') {
    const image = new Image();
    image.src = URL.createObjectURL(new Blob([buffer]));
    size.width = image.width;
    size.height = image.height;
  }

  return size;
};

export function getImageDimensions(base64: string) {
  return new Promise(function (resolved, rejected) {
    var i = new Image();
    i.onload = function () {
      resolved({ w: i.width, h: i.height });
    };
    i.src = base64;
  });
}
