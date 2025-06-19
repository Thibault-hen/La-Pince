import { ArrowUpIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface FinanceCardProps {
  title: string;
  amount: string;
  variant?: 'positive' | 'negative';
}

export function FinanceCard({ title, amount, variant = 'positive' }: FinanceCardProps) {
  return (
    <Card className="w-full flex bg-primary shadow-md hover:shadow-lg transition-all duration-300 max-h-[200px]">
      <CardContent className="space-y-4">
        {/* Icon at the top */}
        <div className="flex justify-start">
          <div className="p-2 bg-primary-color/10 border border-primary-color/20 rounded-lg">
            <ArrowUpIcon
              className={`h-5 w-5 text-primary-color ${variant === 'negative' ? 'rotate-180' : ''}`}
            />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground tracking-wide">{title}</h3>
          <p className="text-base lg:text-2xl font-bold text-foreground tracking-tight">{amount}€</p>
        </div>
      </CardContent>
    </Card>
  );
}
