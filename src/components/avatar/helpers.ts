const generateColor = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = (hash & 0x00ffffff).toString(16).toUpperCase();
  return '00000'.substring(0, 6 - color.length) + color;
};

const getColorBrightness = (color: string) => {
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000;
};

export const PickColorsByName = (name: string) => {
  const avatarBackground = generateColor(name);
  const brightness = getColorBrightness(avatarBackground);
  const avatarText = brightness < 128 ? '#ffffff' : '#000000';

  return {
    avatarBackground: '#' + avatarBackground,
    avatarText,
  };
};
