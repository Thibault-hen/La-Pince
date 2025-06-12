import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import ExpenseAddForm from "./expenseAddForm";
import { Button } from "@/components/ui/button";

type ExpenseAddModalProps = {
	isModalOpen: boolean;
	handleClose: () => void;
};

export default function ExpenseAddModal({
	isModalOpen,
	handleClose,
}: ExpenseAddModalProps) {
	return (
		<Dialog
			open={isModalOpen}
			onOpenChange={(open) => {
				if (!open) {
					handleClose();
				}
			}}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="font-medium text-xl">
						Créer une nouvelle dépense
					</DialogTitle>
					<DialogDescription>
						Entre les informations de ta nouvelle dépense
					</DialogDescription>

					<DialogDescription>
						<ExpenseAddForm />
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
			<DialogFooter>
				<DialogClose asChild>
					<Button variant="outline">Annuler</Button>
				</DialogClose>
				<Button type="submit" variant="blue">
					Créer
				</Button>
			</DialogFooter>
		</Dialog>
	);
}
