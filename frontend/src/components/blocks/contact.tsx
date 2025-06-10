"use client";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
	firstName: z.string().min(2, { message: "Nom requis" }).max(255),
	lastName: z.string().min(2, { message: "Prénom requis" }).max(255),
	email: z.string().email(),
	subject: z.string().min(2, { message: "Sujet requis" }).max(255),
	message: z.string().min(2, { message: "Message requis" }).max(255),
});

export default function Contact() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			subject: "",
			message: "",
		},
	});
	const subjets = [
		{
			value: "bugs",
			title: "Problème technique",
		},
		{
			value: "advices",
			title: "Suggestion de fonctionnalité",
		},
		{
			value: "budgets",
			title: "Question sur les budgets",
		},
		{
			value: "alerts",
			title: "Alerte ou notification",
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
			className=" pb-20 pt-20 md:pb-32 md:pt-32 container mx-auto"
		>
			<div className="align-middle grid grid-cols-1 p-10 md:grid-cols-2 gap-8">
				<div className="mt-auto mb-auto pb-8 space-y-4 text-center">
					<h2 className="text-3xl font-bold sm:text-5xl tracking-tight">
						Une question sur notre solution ou notre entreprise ?
					</h2>
				</div>
				<Card className="dark:bg-primary border-none shadow-md">
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
												<FormLabel>Nom</FormLabel>
												<FormControl>
													<Input placeholder="Votre nom" {...field} />
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
												<FormLabel>Prénom</FormLabel>
												<FormControl>
													<Input placeholder="Votre prénom" {...field} />
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
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														type="email"
														placeholder="votre@mail.com"
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
												<FormLabel>Sujet</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Selectionner un sujet" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{subjets.map((subject, id) => (
															<SelectItem key={id} value={subject.value}>
																{subject.title}
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
												<FormLabel>Message</FormLabel>
												<FormControl>
													<Textarea
														rows={5}
														placeholder="Votre message"
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
									Envoyer message
								</Button>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
