import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Lock } from 'lucide-react';
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export const Security = () => {
return <>
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
        </Card></>;
}