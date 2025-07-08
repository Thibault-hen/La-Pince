'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  firstName: z.string().min(2, { message: 'Nom requis' }).max(255),
  lastName: z.string().min(2, { message: 'Prénom requis' }).max(255),
  email: z.string().email(),
  subject: z.string().min(2, { message: 'Sujet requis' }).max(255),
  message: z.string().min(2, { message: 'Message requis' }).max(255),
});

export default function Contact() {
  const { t } = useTranslation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: '',
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { firstName, lastName, email, subject, message } = values;

    const mailToLink = `mailto:leomirandadev@gmail.com?subject=${subject}&body=Hello I am ${firstName} ${lastName}, my Email is ${email}. %0D%0A${message}`;

    window.location.href = mailToLink;
  }
  return (
    <section
      id="contact"
      className=" scroll-mt-8 pb-20 pt-20 md:pb-32 md:pt-32 md:m-10 container mx-auto"
    >
      <div className="align-middle grid grid-cols-1 p-10 lg:grid-cols-2 gap-8">
        <div className="mt-auto mb-auto pb-8 space-y-4 text-center">
          <h2 className="text-3xl font-bold sm:text-5xl tracking-tight">
            {t('home.contact.message')}
          </h2>
        </div>
        <Card className="dark:bg-primary  shadow-md">
          <h2 className=" mt-1 font-bold tracking-wider text-primary-color text-lg text-center">
            {t('home.contact.title')}
          </h2>
          <CardHeader className="text-primary text-2xl"> </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" grid w-full gap-4"
              >
                <div className=" flex flex-col md:!flex-row gap-8">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>{t('home.contact.firstName')}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t('home.contact.firstNamePlaceholder')}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>{t('home.contact.lastName')}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t('home.contact.lastNamePlaceholder')}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('home.contact.email')}</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder={t('home.contact.emailPlaceholder')}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('home.contact.subject')}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue
                                placeholder={t(
                                  'home.contact.subjectPlaceholder',
                                )}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {subjets.map((subject) => (
                              <SelectItem
                                key={subject.value}
                                value={subject.value}
                              >
                                {t(subject.title)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('home.contact.message2')}</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={5}
                            placeholder={t('home.contact.messagePlaceholder')}
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button variant="blue" className="mt-4">
                  {t('home.contact.sendButton')}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
