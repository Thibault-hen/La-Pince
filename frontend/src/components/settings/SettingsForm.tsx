import { Settings, User, Mail, DollarSign, Bell, Lock } from 'lucide-react';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { useQueryClient } from '@tanstack/react-query';
import type { User as UserType } from '@/services/auth';

export const SettingsForm = () => {
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData<UserType>(['authUser']);
  const [alertsEnabled, setAlertsEnabled] = useState(userData?.user.alert || false);

  return (
    <>
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary-color/10 border border-primary-color/20 rounded-lg">
          <Settings className="h-5 w-5 text-primary-color" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Paramètres du compte</h1>
          <p className="text-sm text-muted-foreground">Gérez vos informations personnelles</p>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="dark:bg-primary border rounded-xl">
          <Card className="bg-transparent border-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary-color" />
                  <CardTitle className="text-xl">Paramètres du profil</CardTitle>
                </div>
              </div>
              <CardDescription>
                Modifie les informations d’identification de ton compte et préférences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Nom
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="Votre nom"
                      className="pl-10 text-xs md:text-sm"
                      defaultValue={userData?.user.name}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="lapince@oclock.io"
                      className="pl-10 text-xs md:text-sm"
                      defaultValue={userData?.user.email || ''}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency" className="text-sm font-medium">
                  Devise préférée
                </Label>
                <Select defaultValue={userData?.user.currency || 'EUR'}>
                  <SelectTrigger className="">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="Sélectionnez votre devise" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EUR">🇪🇺 Euro (EUR)</SelectItem>
                    <SelectItem value="USD">🇺🇸 Dollar US (USD)</SelectItem>
                    <SelectItem value="GBP">🇬🇧 Livre Sterling (GBP)</SelectItem>
                    <SelectItem value="CAD">🇨🇦 Dollar Canadien (CAD)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex w-full lg:max-w-1/2 items-center justify-between p-4 rounded-lg bg-secondary-color/5 border border-secondary-color/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary-color/20 rounded-lg">
                    <Bell className="h-4 w-4 text-secondary-color" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm md:text-base">
                      Alertes de budget
                    </h4>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Recevoir des notifications lorsque tu approches de tes limites
                    </p>
                  </div>
                </div>
                <Switch
                  checked={alertsEnabled}
                  onCheckedChange={setAlertsEnabled}
                  className="data-[state=checked]:bg-primary-color"
                />
              </div>
              <div className="">
                <Button size="lg" variant="blue">
                  Enregistrer les modifications
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="dark:bg-primary">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary-color" />
              <CardTitle className="text-xl">Sécurité</CardTitle>
            </div>
            <CardDescription>Modifiez votre mot de passe</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="current-password" className="text-sm font-medium">
                  Mot de passe actuel
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 text-xs md:text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-sm font-medium">
                  Nouveau mot de passe
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 text-xs md:text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-sm font-medium">
                Confirmer le nouveau mot de passe
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 text-xs md:text-sm"
                />
              </div>
            </div>
            <div className="pt-1">
              <Button size="lg" variant="blue">
                Modifier mot de passe
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
