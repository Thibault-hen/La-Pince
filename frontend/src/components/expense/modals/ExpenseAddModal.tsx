/** biome-ignore-all lint/correctness/noChildrenProp: TanStack Form uses children prop pattern */
import { useForm } from '@tanstack/react-form';
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
import { useBudgets } from '@/hooks/use-budget';
import { useCurrency } from '@/hooks/use-currency';
import { useCreateExpense } from '@/hooks/use-expense';
import { createExpenseSchema } from '@/schemas/expense.schemas';
import { DatePicker } from '../DatePicker';

type ExpenseAddModalProps = {
	isModalOpen: boolean;
	handleClose: () => void;
};

export default function ExpenseAddModal({
	isModalOpen,
	handleClose,
}: ExpenseAddModalProps) {
	const { data: { budgets = [] } = {} } = useBudgets();
	const hadBudgets = budgets.length > 0;
	const { mutateAsync: createExpense } = useCreateExpense();
	const { t } = useTranslation();
	const { formatAmount } = useCurrency();

	const form = useForm({
		validators: {
			onSubmit: createExpenseSchema,
		},
		defaultValues: {
			description: '',
			budgetId: hadBudgets ? budgets[0].id : '',
			amount: 0,
			date: new Date().toISOString(),
		},
		async onSubmit({ value }) {
			const expense = createExpenseSchema.parse(value);
			await createExpense(expense);
			handleClose();
		},
	});

	return (
		<Dialog
			open={isModalOpen}
			onOpenChange={(open) => {
				if (!open) handleClose();
			}}
		>
			<DialogContent className="sm:max-w-[425px]">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<DialogHeader>
						<DialogTitle className="font-medium text-xl">
							{t('expenses.add.title')}
						</DialogTitle>
						<DialogDescription>
							{t('expenses.add.description')}
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4">
						<form.Field
							name="description"
							children={(field) => (
								<div className="grid gap-3">
									<Label htmlFor={field.name}>
										{t('expenses.add.form.title')}
									</Label>
									<Input
										id={field.name}
										type="text"
										placeholder={t('expenses.add.form.titlePlaceholder')}
										value={field.state.value}
										onChange={(e) => field.handleChange(e.target.value)}
										required
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
							name="amount"
							children={(field) => (
								<div className="grid gap-3">
									<Label htmlFor={field.name}>
										{t('expenses.add.form.amount')}
									</Label>
									<Input
										id={field.name}
										step={0.01}
										placeholder={t('expenses.add.form.amountPlaceholder')}
										type="number"
										required
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
							name="budgetId"
							children={(field) => (
								<div className="grid gap-3">
									<Label htmlFor={field.name}>
										{t('expenses.add.form.budget')}
									</Label>
									<Select
										disabled={!hadBudgets}
										name={field.name}
										value={field.state.value || ''}
										onValueChange={field.handleChange}
										required
									>
										<SelectTrigger className="w-full">
											<SelectValue
												placeholder={t('expenses.add.form.budgetPlaceholder')}
											/>
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectLabel>
													{t('expenses.add.form.budgetLabel')}
												</SelectLabel>
												{budgets.map((budget) => (
													<SelectItem
														key={budget.id}
														value={budget.id}
														className="cursor-pointer"
													>
														{t(budget.category.title)} -{' '}
														{formatAmount(budget.amount)}
														<div
															style={{
																backgroundColor: budget?.category.color?.value,
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
							)}
						/>

						<form.Field
							name="date"
							children={(field) => (
								<div className="grid gap-3">
									<Label htmlFor={field.name}>
										{t('expenses.add.form.date')}
									</Label>
									<DatePicker
										name={field.name}
										required
										value={new Date(field.state.value || Date.now())}
										onChange={(date) => {
											const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T12:00:00.000Z`;
											field.handleChange(dateString);
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
					</div>

					<DialogFooter className="flex justify-between items-center mt-4">
						<DialogClose asChild>
							<Button variant="outline">{t('expenses.add.form.cancel')}</Button>
						</DialogClose>
						<form.Subscribe
							selector={(state) => [state.isSubmitting]}
							children={([isSubmiting]) => (
								<Button type="submit" variant="blue">
									{isSubmiting ? <Loader /> : t('expenses.add.form.create')}
								</Button>
							)}
						/>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
