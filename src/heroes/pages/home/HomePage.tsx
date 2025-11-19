
import { useSearchParams } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { useMemo } from "react";
import { useSummary } from "@/heroes/hooks/useSummary";
import { useHeroes } from "@/heroes/hooks/useHeroes";

export const HomePage = () => {

  const [searchParams, setSearchParams] = useSearchParams();



  /* const [activeTab, setActiveTab] = useState<
    "all" | "favorites" | "heroes" | "villians"
  >("all"); */

  let activeTab = searchParams.get("tab") || "all";
  const page = searchParams.get("page") ?? '1';
  const limit = searchParams.get("limit") ?? '6'

  const validTab = useMemo(() => {
    const validsTab = ["all", "favorites", "heroes", "villians"];
    return validsTab.includes(activeTab) ? activeTab : "all"
  }, [activeTab])

  //!Muchos problemas y deficiencias manejarlo con useEffect
  /* useEffect(() => {
    getHeroesByPage().then((heroes) => {console.log({heroes})})
  }, []) */

  const { data: heroesResponse } = useHeroes(+page, +limit);

  const { summary } = useSummary();

  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron
          title="SUPERHOREOS"
          subtitle="QUe vivan los supersss"
        />

        <CustomBreadcrumbs currentPage="Super Héroes" />
        {/* Stats Dashboard */}
        <HeroStats />

        {/* Tabs */}
        <Tabs value={validTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" onClick={() => setSearchParams((prev) => {
              prev.set('tab', 'all')
              return prev
            })}>
              All Characters ({summary?.totalHeroes})
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="flex items-center gap-2"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'favorites')
                return prev
              })}
            >
              Favorites (3)
            </TabsTrigger>
            <TabsTrigger value="heroes" onClick={() => setSearchParams((prev) => {
              prev.set('tab', 'heroes')
              return prev
            })}>
              Heroes ({summary?.heroCount})
            </TabsTrigger>
            <TabsTrigger
              value="villains"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'villians')
                return prev
              })}
            >
              Villains ({summary?.villainCount})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <h1>Todos los personajes</h1>
            <HeroGrid heros={heroesResponse?.heroes || []} />
          </TabsContent>
          <TabsContent value="favorites">
            <h1>Favoritos</h1>
            <HeroGrid heros={heroesResponse?.heroes || []} />
          </TabsContent>
          <TabsContent value="heroes">
            <h1>Heroes!!</h1>
            <HeroGrid heros={heroesResponse?.heroes || []} />
          </TabsContent>
          <TabsContent value="villians">
            <h1>Villanos</h1>
            <HeroGrid heros={heroesResponse?.heroes || []} />
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
      </>
    </>
  );
};
