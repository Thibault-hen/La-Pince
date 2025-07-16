/** biome-ignore-all lint/correctness/noChildrenProp: TanStack Form uses children prop pattern */
import { useForm } from '@tanstack/react-form';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader } from '@/components/ui/loader';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useUpdateBudget } from '@/hooks/use-budget';
import { useCategories } from '@/hooks/use-category';
import { updateBudgetSchema } from '@/schemas/budget.schemas';
import type { Budget } from '@/types/budget';

interface AddBudgetProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	budget?: Budget;
}

export const EditBudgetModal = ({ budget, open, setOpen }: AddBudgetProps) => {
	const { data: categories } = useCategories();
	const { mutateAsync: updateBudget } = useUpdateBudget();
	const { t } = useTranslation();

	const form = useForm({
		defaultValues: {
			amount: budget?.amount ?? 0,
			limitAlert: budget?.limitAlert ?? 0,
			categoryId: budget?.categoryId ?? '',
		},
		validators: {
			onSubmit: updateBudgetSchema,
		},
		async onSubmit({ value }) {
			if (!budget?.id) return;
			await updateBudget({ id: budget.id, data: value });
			setOpen(false);
		},
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		form.reset();
	}, [budget, form]);

	if (!budget) return null;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="sm:max-w-[425px]">
				<form
					onSubmit={async (e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<DialogHeader className="mb-4">
						<DialogTitle className="font-medium text-xl">
							{t('budget.edit.title', {
								title:
									t(budget?.category?.title) || t('budget.edit.defaultTitle'),
							})}
						</DialogTitle>
						<DialogDescription>
							{t('budget.edit.description')}
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4">
						<form.Field
							name="amount"
							children={(field) => (
								<div className="grid gap-3">
									<Label htmlFor={field.name}>
										{t('budget.edit.form.amount')}
									</Label>
									<Input
										id={field.name}
										placeholder={t('budget.edit.form.amountPlaceholder')}
										type="number"
										required
										step={0.01}
										value={field.state.value.toFixed(2) || ''}
										onChange={(e) => {
											field.handleChange(Number(e.target.value));
										}}
									/>
									{field.state.meta.errors.length > 0 && (
										<span className="text-red-500 text-sm">
											{field.state.meta.errors[0]?.message}
										</span>
									)}
								</div>
							)}
						/>
						<form.Field
							name="limitAlert"
							children={(field) => (
								<div className="grid gap-3">
									<div className="flex items-center justify-between">
										<Label htmlFor={field.name}>
											{t('budget.edit.form.limitAlert')}
										</Label>
										<div className="text-xs flex gap-1 items-center justify-center">
											<span className="text-muted-foreground uppercase tracking-wider">
												Max
											</span>
											<span className="font-mono">
												({budget.amount.toFixed(2)})
											</span>
										</div>
									</div>

									<Input
										id={field.name}
										placeholder={t('budget.edit.form.limitAlertPlaceholder')}
										type="number"
										required
										step={0.01}
										value={field.state.value.toFixed(2) || ''}
										onChange={(e) => {
											field.handleChange(Number(e.target.value));
										}}
									/>
									{field.state.meta.errors.length > 0 && (
										<span className="text-red-500 text-sm">
											{field.state.meta.errors[0]?.message}
										</span>
									)}
								</div>
							)}
						/>
						<form.Field
							name="categoryId"
							children={(field) => {
								const selectedCategory = categories?.find(
									(category) => category.id === budget.categoryId,
								);
								return (
									<div className="grid gap-3">
										<Label htmlFor={field.name}>
											{t('budget.edit.form.category')}
										</Label>
										<Select
											name={field.name}
											onValueChange={(value) => field.handleChange(value)}
											value={field.state.value}
											defaultValue={selectedCategory?.id}
											required
										>
											<SelectTrigger className="w-full cursor-pointer">
												<SelectValue
													placeholder={t(
														'budget.edit.form.categoryPlaceholder',
													)}
												/>
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>
														{t('budget.edit.form.categoryLabel')}
													</SelectLabel>
													{categories?.map((category) => (
														<SelectItem
															key={category.id}
															value={category.id}
															className="cursor-pointer"
														>
															<span>
																{t(category.title, {
																	defaultValue: category.title,
																	skipOnNull: false,
																})}
															</span>
															<div
																style={{
																	backgroundColor: category.color?.value,
																}}
																className="h-3 w-3 rounded-lg"
															></div>
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
										{field.state.meta.errors.length > 0 && (
											<span className="text-red-500 text-sm">
												{field.state.meta.errors[0]?.message}
											</span>
										)}
									</div>
								);
							}}
						/>
					</div>
					<DialogFooter className="flex justify-between items-center mt-4">
						<DialogClose asChild>
							<Button variant="outline">{t('budget.edit.form.cancel')}</Button>
						</DialogClose>
						<form.Subscribe
							selector={(state) => [state.isSubmitting]}
							children={([isSubmiting]) => (
								<Button type="submit" variant="blue">
									{isSubmiting ? <Loader /> : t('budget.edit.form.update')}
								</Button>
							)}
						/>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
