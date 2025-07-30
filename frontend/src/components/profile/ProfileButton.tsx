import { useAtomValue } from 'jotai';
import { CircleUserRound, LogOutIcon } from 'lucide-react';
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
          name={user?.name || 'La Pince'}
          avatar_color={user?.avatar_color || '#4D96FF'}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex items-center gap-2 p-1">
            <div>
              <InitialAvatar
                className="h-2 w-2 cursor-pointer"
                name={user?.name || 'La Pince'}
                avatar_color={user?.avatar_color || '#4D96FF'}
              />
            </div>
            <div>
              <div>
                <p>{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => naviguate('/dashboard/settings')}
          className="cursor-pointer transition-all duration-150 ease-in-out"
        >
          <CircleUserRound className="hover:text-white" />
          Profil
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => handleLogout()}
          className="cursor-pointer transition-all duration-150 ease-in-out"
        >
          <LogOutIcon className="hover:text-white" />
          Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
