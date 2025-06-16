import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DatePicker } from '../DatePicker';
import { useBudgets } from '@/hooks/use-budget';
import { createExpenseSchema } from '@/schemas/expense.schemas';
import { useForm } from '@tanstack/react-form';
import { useCreateExpense } from '@/hooks/expenses';
import { Loader } from '@/components/ui/loader';
import type z from 'zod';

type ExpenseAddModalProps = {
  isModalOpen: boolean;
  handleClose: () => void;
};

export default function ExpenseAddModal({ isModalOpen, handleClose }: ExpenseAddModalProps) {
  const { data: { budgets = [] } = {} } = useBudgets();
  const hadBudgets = budgets.length > 0;
  const { mutateAsync: createExpense } = useCreateExpense();

  const form = useForm({
    validators: {
      onSubmit: createExpenseSchema,
    },
    defaultValues: {
      date: new Date().toISOString(), // Default to today
    } as Partial<z.infer<typeof createExpenseSchema>>,
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
            console.log('Form submitted:');
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <DialogHeader>
            <DialogTitle className="font-medium text-xl">Créer une nouvelle dépense</DialogTitle>
            <DialogDescription>Entre les informations de ta nouvelle dépense</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <form.Field
              name="description"
              children={(field) => (
                <div className="grid gap-3">
                  <Label htmlFor={field.name}>Titre</Label>
                  <Input
                    id={field.name}
                    type="text"
                    placeholder="Titre de votre dépense"
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
                  <Label htmlFor={field.name}>Montant</Label>
                  <Input
                    id={field.name}
                    placeholder="0"
                    type="number"
                    value={field.state.value || ''}
                    required
                    onChange={(e) => {
                      field.handleChange(parseInt(e.target.value, 10));
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
                  <Label htmlFor={field.name}>Budget</Label>
                  <Select
                    disabled={!hadBudgets}
                    name={field.name}
                    value={field.state.value || ''}
                    onValueChange={field.handleChange}
                    required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionne un budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Budgets</SelectLabel>
                        {budgets.map((budget) => (
                          <SelectItem key={budget.id} value={budget.id}>
                            {budget.category.title} - {budget.amount}€
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
                  <Label htmlFor={field.name}>Date</Label>
                  <DatePicker
                    name={field.name}
                    required
                    value={new Date(field.state.value || Date.now())}
                    onChange={(date) => {
                      field.handleChange(date.toISOString());
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
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <form.Subscribe
              selector={(state) => [state.isSubmitting]}
              children={([isSubmiting]) => (
                <Button type="submit" variant="blue">
                  {isSubmiting ? <Loader /> : 'Créer'}
                </Button>
              )}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog >
  );
}
