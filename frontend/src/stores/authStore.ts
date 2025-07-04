import type { UserAccount } from '@/types/account';
import { atom } from 'jotai';

export const userAtom = atom<UserAccount | null>(null);
export const csrfTokenAtom = atom<string | null>(null);
export const isAuthenticatedAtom = atom((get) => get(userAtom) !== null);
export const authLoadingAtom = atom<boolean>(true);
