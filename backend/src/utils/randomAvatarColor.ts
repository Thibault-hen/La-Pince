const avatarColors = [
  '#4D96FF',
  '#38B38A',
  '#845EC2',
  '#FF6B6B',
  '#FFB200',
] as string[];

export const generateRandomAvatarColor = (): string => {
  const randomIndex = Math.floor(Math.random() * avatarColors.length);
  return avatarColors[randomIndex];
};
