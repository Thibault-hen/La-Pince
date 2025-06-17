import { Home } from 'lucide-react';

export const Dashboard = () => {
  return (
    <>
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary-color/10 border border-primary-color/20 rounded-lg">
          <Home className="h-5 w-5 text-primary-color" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tableau de bord</h1>
          <p className="text-sm text-muted-foreground">Gérez vos finances</p>
        </div>
      </div>
    </>
  );
};
