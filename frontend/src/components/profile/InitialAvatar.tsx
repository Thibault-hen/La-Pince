import { cn } from '@/lib/utils';

const colors = ['#328bf0', '#eb8c34', '#32f091'] as string[];

export const InitialAvatar = ({ name, className }: { name: string; className?: string }) => {
  const initial = name.toUpperCase().slice(0, 2);
  const randomColor = colors[Math.floor(Math.random() * (colors.length - 0) + 0)];
  console.log(randomColor);
  return (
    <div
      className={cn(
        'rounded-full text-gray-800 font-bold flex items-center justify-center $',
        className
      )}
      style={{
        backgroundColor: randomColor,
      }}
    >
      {initial}
    </div>
  );
};
