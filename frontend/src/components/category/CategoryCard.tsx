import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Badge } from '../ui/badge';

interface ICategoryProps {
  category?: {
    id: string;
    title: string;
    color: string;
    budget: {
      id: string;
      amount: number;
      totalExpenses: number;
    };
  };
  onOpenEditModal: () => void;
  onOpenDeleteModal: () => void;
}

export const CategoryCard = (props: ICategoryProps) => {
  return (
    <Card
      className="flex justify-around p-4 dark:bg-primary hover:border-secondary-color transition-all duration-200 ease-in-out gap-1 shadow"
      style={
        {
          '--hover-card': props.category?.color,
        } as React.CSSProperties
      }
    >
      <CardHeader className="p-0">
        <div className="flex items-center justify-between">
          <CardTitle
            className="border-l-4 px-2 flex gap-2 items-center"
            style={{ borderLeftColor: props.category?.color }}
          >
            {props.category?.title}
          </CardTitle>
          <CardDescription className="flex gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                className="dark:bg-primary cursor-pointer hover:bg-secondary-color dark:hover:bg-secondary-color border-none  focus:outline-none focus:ring-0 focus:ring-transparent
             focus-visible:outline-none focus-visible:ring-0
             data-[highlighted]:bg-transparent data-[state=open]:bg-transparent
             shadow-none focus:shadow-none focus-visible:shadow-none"
              >
                <Button variant="outline" size="icon">
                  <EllipsisVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="p-2 dark:bg-primary cursor-pointer hover:!bg-secondary-color transition-all duration-150 ease-in-out"
                  onClick={props.onOpenEditModal}
                >
                  <Pencil className="dark:text-white text-dark" />
                  <span>Editer</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="p-2 dark:bg-primary cursor-pointer hover:!bg-red-500 dark:hover:bg-red-700/20 transition-all duration-150 ease-in-out"
                  onClick={props.onOpenDeleteModal}
                >
                  <Trash2 className="dark:text-white text-dark" />
                  <span>Supprimer</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-0 mx-4">
        <CardDescription>
          <span>Budget en cours : </span>
          <Badge
            variant="outline"
            className="font-bold items-center hover:bg-secondary-color transition-all duration-200 ease-in-out"
          >
            {props.category?.budget.amount.toFixed(2).toLocaleString()} €
          </Badge>
        </CardDescription>
      </CardContent>
    </Card>
  );
};
