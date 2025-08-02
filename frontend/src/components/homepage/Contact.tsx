/** biome-ignore-all lint/correctness/noChildrenProp: <explanation> */
'use client';
import { useForm } from '@tanstack/react-form';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useContactEmail } from '@/hooks/use-contact';
import { contactFormSchema } from '@/schemas/contact.schema';
import { Label } from '../ui/label';
import { Loader } from '../ui/loader';

export default function Contact() {
  const { t } = useTranslation();
  const { mutateAsync: sendContactEmail } = useContactEmail();
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: '',
    },
    validators: {
      onSubmit: contactFormSchema,
    },
    onSubmit: async ({ value }) => {
      await sendContactEmail(value);
      form.reset();
    },
  });
  const subjets = [
    {
      value: 'home.contact.subject1.value',
      title: 'home.contact.subject1.title',
    },
    {
      value: 'home.contact.subject2.value',
      title: 'home.contact.subject2.title',
    },
    {
      value: 'home.contact.subject3.value',
      title: 'home.contact.subject3.title',
    },
    {
      value: 'home.contact.subject4.value',
      title: 'home.contact.subject4.title',
    },
  ];

  return (
    <section id="contact" className="xl:px-36 py-16 bg-background">
      <div className="align-middle grid grid-cols-1 py-19 px-4 lg:grid-cols-2 gap-8">
        <div className="mt-auto mb-auto pb-8 space-y-4">
          <h1 className="bg-gradient-to-r from-primary-color via-primary-color to-foreground bg-clip-text text-transparent font-bold text-2xl md:text-3xl xl:text-4xl tracking-tight leading-tight text-center lg:text-left">
            {t('home.contact.message')}
          </h1>
        </div>
        <Card className="dark:bg-primary shadow-md">
          <CardHeader className="text-primary text-2xl mb-4">
            <h3 className="mt-1 font-bold tracking-wider text-primary-color text-center">
              {t('home.contact.title')}
            </h3>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await form.handleSubmit();
              }}
              className=" grid w-full gap-4"
            >
              <div className=" flex flex-col md:!flex-row gap-8">
                <form.Field
                  name="firstName"
                  children={(field) => (
                    <div className="grid gap-3 w-full">
                      <Label>{t('home.contact.firstName')}</Label>
                      <Input
                        placeholder={t('home.contact.firstNamePlaceholder')}
                        id={field.name}
                        onChange={(e) => {
                          field.handleChange(e.target.value);
                        }}
                        value={field.state.value}
                        type="text"
                        required
                      />
                    </div>
                  )}
                />
                <form.Field
                  name="lastName"
                  children={(field) => (
                    <div className="grid gap-3 w-full">
                      <Label>{t('home.contact.lastName')}</Label>
                      <Input
                        placeholder={t('home.contact.lastNamePlaceholder')}
                        id={field.name}
                        onChange={(e) => {
                          field.handleChange(e.target.value);
                        }}
                        value={field.state.value}
                        type="text"
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
              </div>
              <div className="flex flex-col gap-1.5">
                <form.Field
                  name="email"
                  children={(field) => (
                    <div className="grid gap-3">
                      <Label>{t('home.contact.email')}</Label>
                      <Input
                        type="email"
                        placeholder={t('home.contact.emailPlaceholder')}
                        id={field.name}
                        value={field.state.value}
                        onChange={(e) => {
                          field.handleChange(e.target.value);
                        }}
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
              </div>
              <div className="flex flex-col gap-1.5">
                <form.Field
                  name="subject"
                  children={(field) => (
                    <div className="grid gap-3">
                      <Label>{t('home.contact.subject')}</Label>
                      <Select
                        name={field.name}
                        onValueChange={(value) => field.handleChange(value)}
                        required
                        value={field.state.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={t('home.contact.subjectPlaceholder')}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {subjets.map((subject) => (
                            <SelectItem
                              key={t(subject.value)}
                              value={t(subject.value)}
                            >
                              {t(subject.title)}
                            </SelectItem>
                          ))}
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
              <div className="flex flex-col gap-1.5">
                <form.Field
                  name="message"
                  children={(field) => (
                    <div className="grid gap-3">
                      <Label>{t('home.contact.message2')}</Label>
                      <Textarea
                        rows={5}
                        placeholder={t('home.contact.messagePlaceholder')}
                        className="resize-none"
                        id={field.name}
                        onChange={(e) => {
                          field.handleChange(e.target.value);
                        }}
                        value={field.state.value}
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
              <form.Subscribe
                selector={(state) => [state.isSubmitting]}
                children={([isSubmiting]) => (
                  <Button variant="blue" className="mt-4">
                    {isSubmiting ? <Loader /> : t('home.contact.sendButton')}
                  </Button>
                )}
              />
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
