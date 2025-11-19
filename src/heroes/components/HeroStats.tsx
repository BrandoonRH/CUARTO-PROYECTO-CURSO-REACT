import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Trophy, Users, Zap } from "lucide-react";
import { HeroStatCard } from "./HeroStatCard";
import { useSummary } from "../hooks/useSummary";

export const HeroStats = () => {

  const { summary } = useSummary();
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Characters
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary?.totalHeroes}</div>
          <div className="flex gap-1 mt-2">
            <Badge variant="secondary" className="text-xs">
              {summary?.heroCount} heroes
            </Badge>
            <Badge variant="destructive" className="text-xs">
              {summary?.villainCount} villians
            </Badge>
          </div>
        </CardContent>
      </Card>

      <HeroStatCard
        icon={<Heart className="h-4 w-4 text-muted-foreground" />}
        title="Favorites"
      >
        <div className="text-2xl font-bold text-red-600">3</div>
        <p className="text-xs text-muted-foreground">18.8% of total</p>
      </HeroStatCard>

      <HeroStatCard
        icon={<Zap className="h-4 w-4 text-muted-foreground" />}
        title="Strongest"
      >
        <div className="text-lg font-bold">{summary?.strongestHero.name}</div>
        <p className="text-xs text-muted-foreground">Strength: {summary?.strongestHero.strength}</p>
      </HeroStatCard>

      <HeroStatCard
        icon={<Trophy className="h-4 w-4 text-muted-foreground" />}
        title="Smartest"
      >
        <div className="text-lg font-bold">{summary?.smartestHero.name}</div>
        <p className="text-xs text-muted-foreground">Intelligence: {summary?.smartestHero.intelligence}</p>
      </HeroStatCard>
    </div>
  );
};
