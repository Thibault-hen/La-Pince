/** biome-ignore-all lint/correctness/noChildrenProp: <tanstack form pattern> */
import { useForm } from '@tanstack/react-form';
import { useTranslation } from 'react-i18next';
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDeleteAccount } from '@/hooks/use-account';
import { checkPasswordSchema } from '@/schemas/account.schema';

interface DeleteAccountProps {
	open: boolean;
	setOpen: (open: boolean) => void;
}

export const DeleteAccountModal = ({ open, setOpen }: DeleteAccountProps) => {
	const { mutateAsync: deleteAccount, error } = useDeleteAccount();
	const { t } = useTranslation();

	const form = useForm({
		defaultValues: {
			password: '',
		},
		validators: {
			onSubmit: checkPasswordSchema,
		},
		async onSubmit({ value }) {
			await deleteAccount(value);
		},
	});

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogContent>
				<form
					onSubmit={async (e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<AlertDialogHeader>
						<AlertDialogTitle className="font-medium text-xl">
							{' '}
							{t('account.delete.modal.title')}
						</AlertDialogTitle>
						<AlertDialogDescription>
							{' '}
							{t('account.delete.modal.description')}
						</AlertDialogDescription>
					</AlertDialogHeader>

					<div className="my-2">
						<form.Field
							name="password"
							children={(field) => (
								<div className="grid gap-3">
									<Label htmlFor={field.name}>
										{t('account.delete.modal.confirmPassword')}
									</Label>
									<Input
										id={field.name}
										onChange={(e) => {
											field.handleChange(e.target.value);
										}}
										placeholder="********"
										type="password"
										required
									/>
									{field.state.meta.errors.length > 0 && (
										<span className="text-red-500 text-sm">
											{t(field.state.meta.errors[0]?.message || '')}
										</span>
									)}
								</div>
							)}
						/>
					</div>

					<AlertDialogFooter className="mt-4">
						<AlertDialogCancel className="cursor-pointer">
							{t('account.delete.modal.cancel')}
						</AlertDialogCancel>
						<form.Subscribe
							children={() => (
								<Button type="submit" variant="red">
									{t('account.delete.modal.confirm')}
								</Button>
							)}
						/>
					</AlertDialogFooter>
				</form>
			</AlertDialogContent>
		</AlertDialog>
	);
};
