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
import { useUpdateIncome } from '@/hooks/use-income';
import { updateIncomeSchema } from '@/schemas/income.schema';
import type { Income } from '@/types/income';

interface EditIncomeProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  income?: Income;
}

export const EditIncomeModal = ({ income, open, setOpen }: EditIncomeProps) => {
  const { t } = useTranslation();
  const { mutateAsync: updateIncome } = useUpdateIncome();
  const form = useForm({
    defaultValues: {
      value: income?.value ?? 0,
    },
    validators: {
      onSubmit: updateIncomeSchema,
    },
    async onSubmit({ value }) {
      await updateIncome({ id: income?.id ?? '', value: value });
      setOpen(false);
    },
  });

  if (!income) return null;

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
              {t('dashboard.edit.title')}
            </DialogTitle>
            <DialogDescription>
              {t('dashboard.edit.description')}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <form.Field
              name="value"
              children={(field) => (
                <div className="grid gap-3">
                  <Label htmlFor={field.name}>
                    {t('dashboard.edit.form.amount')}
                  </Label>
                  <Input
                    id={field.name}
                    placeholder={t('dashboard.edit.form.amountPlaceholder')}
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
                      {t(field.state.meta.errors[0]?.message || '')}
                    </span>
                  )}
                </div>
              )}
            />
          </div>
          <DialogFooter className="flex justify-between items-center mt-4">
            <DialogClose asChild>
              <Button variant="outline">
                {t('dashboard.edit.form.cancel')}
              </Button>
            </DialogClose>
            <form.Subscribe
              selector={(state) => [state.isSubmitting]}
              children={([isSubmiting]) => (
                <Button type="submit" variant="blue">
                  {isSubmiting ? <Loader /> : t('dashboard.edit.form.update')}
                </Button>
              )}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
