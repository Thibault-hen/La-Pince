import { Input } from "@/components/ui/input";
import { DatePicker } from "../datePicker";
import { Button } from "@/components/ui/button";

export default function ExpenseAddForm() {
	return (
		<div className="container mx-auto py-10">
			<form className="space-y-6">
				<div>
					<label
						htmlFor="title"
						className="text-left block py-2 font-bold text-white"
					>
						Titre
					</label>
					<Input
						type="text"
						id="title"
						name="title"
						required
						className=" mt-1 block w-full  border-gray-300 px-3 rounded-2 py-1 shadow-sm focus:border-blue-500 focus:ring-blue-500"
					/>
				</div>
				<div>
					<label
						htmlFor="category"
						className=" text-left block py-2 text-white "
					>
						Catégorie
					</label>
					<Input
						type="text"
						id="category"
						name="category"
						required
						className="mt-1 block w-full  border-gray-300 px-3 rounded-2 py-1 shadow-sm focus:border-blue-500 focus:ring-blue-500"
					/>
				</div>
				<div>
					<label htmlFor="amount" className="block text-left py-2 text-white ">
						Montant
					</label>
					<Input
						type="text"
						id="amount"
						name="amount"
						required
						className=" py-3 w-full  focus:border-blue-500 focus:ring-blue-500"
					/>
				</div>
				<div>
					<label htmlFor="date" className="text-left text-white block py-2 ">
						Date
					</label>
					<DatePicker name="date" required defaultValue={new Date()} />
				</div>
				<div className="flex flex-col md:flex-row justify-end gap-2">
					<Button type="submit" variant="blue">
						Créer
					</Button>
					<Button variant="outline" className="w-full md:w-auto">
						Annuler
					</Button>
				</div>
			</form>
		</div>
	);
}
