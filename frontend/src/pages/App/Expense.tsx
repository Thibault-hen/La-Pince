import { useEffect, useState } from "react";
import { columns, type IExpense } from "./table/columns";
import { DataTable } from "./table/data-table";
import { Button } from "@/components/ui/button";
import ExpenseAddModal from "@/components/expense/modals/expenseAddModal";
import { ChartBarInteractive } from "@/components/expense/barChart";

export async function getData(): Promise<IExpense[]> {
	return [
		{
			id: "1",
			title: "Achat de fournitures",
			category: "Fournitures",
			amount: 150.0,
			date: "2023-10-01",
		},
		{
			id: "2",
			title: "Dépenses de voyage",
			category: "Voyage",
			amount: 300.0,
			date: "2023-10-02",
		},
		{
			id: "3",
			title: "Repas d'affaires",
			category: "Restauration",
			amount: 75.0,
			date: "2023-10-03",
		},
		{
			id: "1",
			title: "Achat de fournitures",
			category: "Fournitures",
			amount: 150.0,
			date: "2023-10-01",
		},
		{
			id: "2",
			title: "Dépenses de voyage",
			category: "Voyage",
			amount: 300.0,
			date: "2023-10-02",
		},
		{
			id: "3",
			title: "Repas d'affaires",
			category: "Restauration",
			amount: 75.0,
			date: "2023-10-03",
		},
		{
			id: "1",
			title: "Achat de fournitures",
			category: "Fournitures",
			amount: 150.0,
			date: "2023-10-01",
		},
		{
			id: "2",
			title: "Dépenses de voyage",
			category: "Voyage",
			amount: 300.0,
			date: "2023-10-02",
		},
		{
			id: "3",
			title: "Repas d'affaires",
			category: "Restauration",
			amount: 75.0,
			date: "2023-10-03",
		},
		{
			id: "1",
			title: "Achat de fournitures",
			category: "Fournitures",
			amount: 150.0,
			date: "2023-10-01",
		},
		{
			id: "2",
			title: "Dépenses de voyage",
			category: "Voyage",
			amount: 300.0,
			date: "2023-10-02",
		},
		{
			id: "3",
			title: "Repas d'affaires",
			category: "Restauration",
			amount: 75.0,
			date: "2023-10-03",
		},
	];
}

export function Expense() {
	const [data, setData] = useState<IExpense[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const result = await getData();
			setData(result);
		};

		fetchData();
	}, []);

	return (
		<>
			{isModalOpen && (
				<ExpenseAddModal
					isModalOpen={isModalOpen}
					handleClose={() => setIsModalOpen(false)}
				/>
			)}
			<ChartBarInteractive />
			<div className="container mx-auto py-10">
				<DataTable
					children={
						<Button variant="blue" onClick={() => setIsModalOpen(true)}>
							<span className="max-w-sm block text-sm m-2">
								Ajouter une dépense
							</span>
						</Button>
					}
					columns={columns}
					data={data}
				/>
			</div>
		</>
	);
}
