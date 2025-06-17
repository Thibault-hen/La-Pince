// currency-context.tsx
import type { User } from '@/services/auth';
import { useQueryClient } from '@tanstack/react-query';
import React, { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext<{
  currency: string;
  setCurrency: (c: string) => void;
}>({
  currency: 'EUR',
  setCurrency: () => {},
});

export const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData<User>(['authUser']);
  const [currency, setCurrency] = useState(userData?.user.currency ?? 'EUR');
  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrencyContext = () => useContext(CurrencyContext);
