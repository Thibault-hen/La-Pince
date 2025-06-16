import type { Color } from './color';

export type Category = {
  id: string;
  colorId: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  color: Color;
  userId: string;
};
