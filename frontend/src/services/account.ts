import type { UserAccount } from '@/types/account';
import { api } from '@/utils/api';

export const accountService = {
  async updateUserProfile(data: UserAccount): Promise<UserAccount> {
    const response = await api.patch<UserAccount>('/account', data);
    return response.data;
  }
}