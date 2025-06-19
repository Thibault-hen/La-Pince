import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { InitialAvatar } from './InitialAvatar';
import { authService, type User } from '@/services/auth';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const ProfileButton = () => {
  const queryClient = useQueryClient();
  const naviguate = useNavigate();
  const userData = queryClient.getQueryData<User>(['authUser']);

  const handleLogout = async () => {
    try {
      await authService.logout();
      queryClient.clear();
      naviguate('/', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <InitialAvatar className="h-8 w-8 cursor-pointer" name={userData?.user.name || ':)'} />
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
