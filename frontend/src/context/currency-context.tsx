import { userAtom } from '@/stores/authStore';
import { useAtomValue } from 'jotai';
import React, { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext<{
  currency: string;
  setCurrency: (c: string) => void;
}>({
  currency: 'EUR',
  setCurrency: () => {},
});

export const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useAtomValue(userAtom);
  const [currency, setCurrency] = useState(user?.currency ?? 'EUR');
  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrencyContext = () => useContext(CurrencyContext);
