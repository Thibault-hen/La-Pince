import { cn } from '@/lib/utils';

const colors = ['#328bf0', '#eb8c34', '#32f091'] as string[];

export const InitialAvatar = ({
  name,
  className,
  avatar_color,
}: {
  name: string;
  className?: string;
  avatar_color?: string;
}) => {
  const userInitial = name.slice(0, 2).toUpperCase();
  return (
    <div
      className={cn(
        'text-shadow-lg rounded-full text-white font-bold flex p-3 items-center border justify-center text-xs',
        className,
      )}
      style={{
        backgroundColor: avatar_color,
      }}
    >
      {userInitial}
    </div>
  );
};
