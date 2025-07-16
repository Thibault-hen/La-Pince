import { useAtomValue } from 'jotai';
import type React from 'react';
import { createContext, useContext, useState } from 'react';
import { userAtom } from '@/stores/authStore';

const CurrencyContext = createContext<{
	currency: string;
	setCurrency: (c: string) => void;
}>({
	currency: 'EUR',
	setCurrency: () => {},
});

export const CurrencyProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const user = useAtomValue(userAtom);
	const [currency, setCurrency] = useState(user?.currency ?? 'EUR');
	return (
		<CurrencyContext.Provider value={{ currency, setCurrency }}>
			{children}
		</CurrencyContext.Provider>
	);
};

export const useCurrencyContext = () => useContext(CurrencyContext);
