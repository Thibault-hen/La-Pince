import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { useLanguage } from '@/hooks/use-language';

export const LanguageSelector = () => {
  const { changeLanguage, currentLanguage, languages } = useLanguage();
  const selectedLanguage = languages.find((lang) => lang.code === currentLanguage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="shadow-none dark:bg-primary cursor-pointer hover:bg-secondary-color dark:hover:bg-secondary-color border focus:outline-none focus-visible:ring-2"
      >
        <Button variant="outline" size="icon">
          <span className="sr-only">{selectedLanguage ? selectedLanguage.name : 'Français'}</span>
          <img
            src={selectedLanguage?.flag || '/flags/fr.svg'}
            alt="Language Flag"
            width={20}
            height={20}
            className="rounded border"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className="cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <img
                src={lang?.flag || '/flags/fr.svg'}
                alt="Language Flag"
                width={22}
                height={22}
                className="rounded border"
              />
              <span>{lang.name}</span>
            </span>
            {currentLanguage === lang.code && (
              <span className="ml-auto text-xs text-muted-foreground">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
