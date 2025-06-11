import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { InitialAvatar } from './InitialAvatar';

export const ProfileButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <InitialAvatar className="h-8 w-8 cursor-pointer" name={':)'} />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => console.log('Profile')}
          className="cursor-pointer transition-all duration-150 ease-in-out"
        >
          Profil
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => console.log('Logout')}
          className="cursor-pointer transition-all duration-150 ease-in-out"
        >
          Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
