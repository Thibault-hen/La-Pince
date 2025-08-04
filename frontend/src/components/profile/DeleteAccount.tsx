import { UserRoundX } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card';

interface DeleteAccountProps {
	onOpenDeleteModal: () => void;
}

export const DeleteAccount = ({ onOpenDeleteModal }: DeleteAccountProps) => {
	const { t } = useTranslation();
	return (
		<Card className="dark:bg-primary">
			<CardHeader>
				<div className="flex items-center gap-2">
					<div className="p-1.5 bg-primary-color/10 border border-primary-color/20 rounded-lg">
						<UserRoundX className="h-4 w-4 text-primary-color" />
					</div>
					<CardTitle className="text-base md:text-lg">
						{t('account.delete.header.title')}
					</CardTitle>
				</div>
				<CardDescription>
					<p>{t('account.delete.header.subtitle')}</p>
					<ul className="mt-2 space-y-1 text-sm text-muted-foreground list-inside">
						<li className="list-disc">{t('account.delete.list.item1')}</li>
						<li className="list-disc">{t('account.delete.list.item2')}</li>
						<li className="list-disc">{t('account.delete.list.item3')}</li>
					</ul>
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="pt-1">
					<Button
						type="submit"
						size="lg"
						variant="red"
						onClick={onOpenDeleteModal}
						className="w-full sm:w-auto"
					>
						{t('account.delete.button')}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};
