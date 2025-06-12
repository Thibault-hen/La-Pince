import { EllipsisVerticalIcon, Pencil, Trash2 } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type IExpense = {
	id: string;
	title: string;
	category: string;
	amount: number;
	date: string;
};

export const columns: ColumnDef<IExpense>[] = [
	{
		accessorKey: "id",
		header: "",
		cell: () => {
			return "";
		},
	},
	{
		accessorKey: "title",
		header: "Titre",
		cell: ({ row }) => {
			const title = row.getValue("title");
			return <div className="font-medium">{title}</div>;
		},
		filterFn: "includesString",
	},
	{
		accessorKey: "category",
		header: () => <div className="text-center">Categorie</div>,
		cell: ({ row }) => {
			const category = row.getValue("category");
			return (
				<div className="flex justify-center">
					<Badge className="w-25 align-center items-center bg-primary-color capitalize ">
						<span className="text-white">{category}</span>
					</Badge>
				</div>
			);
		},
	},
	{
		accessorKey: "date",
		header: "Date",
	},
	{
		accessorKey: "amount",
		header: () => <div className=" text-right">Montant</div>,
		cell: ({ row }) => {
			const amount = Number.parseFloat(row.getValue("amount"));
			const formatted = new Intl.NumberFormat("eu-FR", {
				style: "currency",
				currency: "EUR",
			}).format(amount);

			return <div className="text-right font-medium">{formatted}</div>;
		},
	},
	{
		accessorKey: "edit",
		header: "",
		cell: ({ row }) => {
			const id = row.getValue("id");

			return (
				<div className="flex justify-end">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon">
								<EllipsisVerticalIcon className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="outline  rounded-md shadow-lg"
							align="start"
						>
							<DropdownMenuItem onSelect={() => console.log("Edit", id)}>
								<Pencil size={20} />
								Éditer
							</DropdownMenuItem>
							<DropdownMenuItem
								variant="destructive"
								className=""
								onSelect={() => console.log("Supprimer", id)}
							>
								<Trash2 />
								Supprimer
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			);
		},
	},
];
