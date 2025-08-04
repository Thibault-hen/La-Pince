import {
	Car,
	Dumbbell,
	Gamepad2,
	GraduationCap,
	Heart,
	Home,
	LibraryBig,
	type LucideIcon,
	MoreHorizontal,
	PawPrint,
	Receipt,
	ShoppingCart,
	Utensils,
	Wifi,
} from 'lucide-react';

const getCategoryIcon = (category: string): LucideIcon => {
	const iconMap: Record<string, LucideIcon> = {
		'category.health': Heart,
		'category.food': Utensils,
		'category.houseRent': Home,
		'category.subscriptions': Wifi,
		'category.shopping': ShoppingCart,
		'category.sport': Dumbbell,
		'category.bills': Receipt,
		'category.transport': Car,
		'category.entertainment': Gamepad2,
		'category.education': GraduationCap,
		'category.pet': PawPrint,
		'category.other': MoreHorizontal,
	};

	return iconMap[category] || LibraryBig;
};

export { getCategoryIcon };
