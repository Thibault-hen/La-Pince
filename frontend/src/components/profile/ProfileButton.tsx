import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLogout } from '@/hooks/use-auth';
import { userAtom } from '@/stores/authStore';
import { InitialAvatar } from './InitialAvatar';

export const ProfileButton = () => {
	const naviguate = useNavigate();
	const user = useAtomValue(userAtom);
	const { mutateAsync: logout } = useLogout();

	const handleLogout = async () => {
		logout();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<InitialAvatar
					className="h-8 w-8 cursor-pointer"
					name={user?.name || ':)'}
				/>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="w-48">
				<DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => naviguate('/tableau-de-bord/parametres')}
					className="cursor-pointer transition-all duration-150 ease-in-out"
				>
					Profil
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={async () => handleLogout()}
					className="cursor-pointer transition-all duration-150 ease-in-out"
				>
					Déconnexion
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
