import { useAtomValue } from 'jotai';
import { Settings } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { userAtom } from '@/stores/authStore';
import { DeleteAccount } from '../profile/DeleteAccount';
import { DeleteAccountModal } from '../profile/modals/DeleteAccountModal';
import { Profile } from '../profile/Profile';
import { Security } from '../profile/Security';

export const SettingsForm = () => {
	const user = useAtomValue(userAtom);
	const { t } = useTranslation();
	const [openDeleteAccount, setOpenDeleteAccount] = useState(false);

	return (
		<>
			<DeleteAccountModal
				open={openDeleteAccount}
				setOpen={setOpenDeleteAccount}
			/>
			<div className="flex items-center gap-3">
				<div className="p-2 bg-primary-color/10 border border-primary-color/20 rounded-lg">
					<Settings className="h-5 w-5 text-primary-color" />
				</div>
				<div>
					<h1 className="text-2xl font-bold text-foreground">
						{t('account.header.title')}
					</h1>
					<p className="text-sm text-muted-foreground">
						{t('account.header.subtitle')}
					</p>
				</div>
			</div>

			<div className="grid gap-6">
				<Profile user={user} />
				<Security />
				<DeleteAccount
					onOpenDeleteModal={() => {
						setOpenDeleteAccount(true);
					}}
				/>
			</div>
		</>
	);
};
