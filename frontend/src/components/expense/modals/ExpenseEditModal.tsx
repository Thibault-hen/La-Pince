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
import { useUpdateExpense, type Expense } from '@/hooks/expenses';
import { useForm } from '@tanstack/react-form';
import { updateExpenseSchema } from '@/schemas/expense.schemas';
import { Loader } from '@/components/ui/loader';
import { useBudgets } from '@/hooks/use-budget';
import { DatePicker } from '../DatePicker';

interface ExpenseEditModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  expense?: Expense;
}

export const ExpenseEditModal = ({ expense, open, setOpen }: ExpenseEditModalProps) => {
  const { data: { budgets = [] } = {}, isLoading: isLoadingBudget } = useBudgets();
  const { mutateAsync: updateExpense } = useUpdateExpense();

  const form = useForm({
    defaultValues: {
      description: expense?.title ?? '',
      amount: expense?.amount ?? 0,
      budgetId: expense?.budgetId ?? '',
      date: expense?.date ?? '',
    },
    validators: {
      onSubmit: updateExpenseSchema,
    },
    async onSubmit({ value }) {
      console.log('Form submitted with values:', value);
      if (!expense?.id) return;
      await updateExpense({ id: expense?.id, data: { ...value } });
      setOpen(false);
    },
  });

  if (!expense) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={async (e) => {
            console.log('Form submitted:');
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <DialogHeader>
            <DialogTitle className="font-medium text-xl">
              Modifie ta dépense: {expense?.title}
            </DialogTitle>
            <DialogDescription>Entre les nouvelles informations de ta dépense</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <form.Field
              name="description"
              children={(field) => (
                <div className="grid gap-3">
                  <Label htmlFor={field.name}>Titre</Label>
                  <Input
                    id={field.name}
                    placeholder="Titre de votre dépense"
                    type="text"
                    required
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
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
              name="amount"
              children={(field) => (
                <div className="grid gap-3">
                  <Label htmlFor={field.name}>Montant</Label>
                  <Input
                    id={field.name}
                    placeholder="200"
                    type="number"
                    required
                    value={field.state.value}
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
              children={(field) => {
                return (
                  <div className="grid gap-3">
                    <Label htmlFor={field.name}>Budget</Label>
                    <Select
                      name={field.name}
                      onValueChange={(value) => field.handleChange(value)}
                      value={budgets.length ? field.state.value : ''}
                      required
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionne un budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Budgets</SelectLabel>
                          {budgets?.map((budget) => (
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
                );
              }}
            />
            <form.Field
              name="date"
              children={(field) => (
                <div className="grid gap-3">
                  <Label htmlFor={field.name}>Date</Label>
                  <DatePicker
                    name={field.name}
                    required
                    value={new Date(field.state.value)}
                    onChange={(date) => { field.handleChange(date.toISOString()); }}
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
                  {isSubmiting ? <Loader /> : 'Modifier'}
                </Button>
              )}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
