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
import { useCreateBudget } from '@/hooks/use-budget';
import { useCategories } from '@/hooks/use-category';
import { createBudgetSchema } from '@/schemas/budget.schemas';

interface AddBudgetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const AddBudgetModal = ({ open, setOpen }: AddBudgetProps) => {
  const { data: categories } = useCategories();
  const { mutateAsync: createBudget } = useCreateBudget();
  const { t } = useTranslation();

  const form = useForm({
    defaultValues: {
      amount: 0,
      limitAlert: 0,
      categoryId: '',
    },
    validators: {
      onSubmit: createBudgetSchema,
    },
    async onSubmit({ value }) {
      await createBudget(value);
      setOpen(false);
    },
  });

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
              {t('budget.add.title')}
            </DialogTitle>
            <DialogDescription>{t('budget.add.description')}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <form.Field
              name="amount"
              children={(field) => (
                <div className="grid gap-3">
                  <Label htmlFor={field.name}>
                    {t('budget.add.form.amount')}
                  </Label>
                  <Input
                    id={field.name}
                    placeholder={t('budget.add.form.amountPlaceholder')}
                    type="number"
                    required
                    step={0.01}
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
                  <Label htmlFor={field.name}>
                    {t('budget.add.form.limitAlert')}
                  </Label>
                  <Input
                    id={field.name}
                    placeholder={t('budget.add.form.limitAlertPlaceholder')}
                    type="number"
                    required
                    step={0.01}
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
              children={(field) => (
                <div className="grid gap-3">
                  <Label htmlFor={field.name}>
                    {t('budget.add.form.category')}
                  </Label>
                  <Select
                    name={field.name}
                    onValueChange={(value) => field.handleChange(value)}
                    required
                  >
                    <SelectTrigger className="w-full cursor-pointer">
                      <SelectValue
                        placeholder={t('budget.add.form.categoryPlaceholder')}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>
                          {t('budget.add.form.categoryLabel')}
                        </SelectLabel>
                        {categories
                          ?.slice()
                          .sort((a, b) => {
                            const aActive = (a.budgets?.length ?? 0) > 0;
                            const bActive = (b.budgets?.length ?? 0) > 0;
                            return Number(bActive) - Number(aActive);
                          })
                          .map((category) => (
                            <SelectItem
                              disabled={category.budgets?.length !== 0}
                              key={category.id}
                              value={category.id}
                              className="cursor-pointer"
                            >
                              <span>{t(category.title)}</span>
                              <div
                                style={{
                                  backgroundColor: category?.color?.value,
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
          </div>
          <DialogFooter className="flex justify-between items-center mt-4">
            <DialogClose asChild>
              <Button variant="outline">{t('budget.add.form.cancel')}</Button>
            </DialogClose>
            <form.Subscribe
              selector={(state) => [state.isSubmitting]}
              children={([isSubmiting]) => (
                <Button type="submit" variant="blue">
                  {isSubmiting ? <Loader /> : t('budget.add.form.create')}
                </Button>
              )}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
