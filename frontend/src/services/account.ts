import type { PasswordChange, UpdateCurrency, UserAccountProfile } from '@/schemas/account.schema';
import type { UserAccount } from '@/types/account';
import { api } from '@/utils/api';

export const accountService = {
  async updateUserProfile(data: UserAccountProfile): Promise<UserAccount> {
    const response = await api.patch<UserAccount>('/account', data);
    return response.data;
  },

  async updateUserPassword(data: PasswordChange): Promise<UserAccount> {
    const response = await api.patch('/account/reset-password', data);
    return response.data;
  },

  async updateCurrency(currency: UpdateCurrency): Promise<UserAccount> {
    const response = await api.patch<UserAccount>('/account/currency', currency);
    return response.data;
  },

  async deleteAccount(): Promise<void> {
    await api.delete('/account');
  },
};
