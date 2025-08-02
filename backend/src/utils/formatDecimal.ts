import type { Decimal } from '@prisma/client/runtime/library';

export const formatDecimal = (value: Decimal | null | undefined): number => {
  return Number(value?.toFixed(2) || 0);
};
