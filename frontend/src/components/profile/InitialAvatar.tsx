import { cn } from '@/lib/utils';

const colors = ['#328bf0', '#eb8c34', '#32f091'] as string[];

export const InitialAvatar = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  const userInitial = name.slice(0, 2).toUpperCase();
  const randomColor =
    colors[Math.floor(Math.random() * (colors.length - 0) + 0)];
  return (
    <div
      className={cn(
        'text-shadow-lg rounded-full text-white font-bold flex p-5 items-center border justify-center ',
        className,
      )}
      style={{
        backgroundColor: randomColor,
      }}
    >
      {userInitial}
    </div>
  );
};
