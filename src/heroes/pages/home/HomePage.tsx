
import { useSearchParams } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { use, useMemo } from "react";
import { useSummary } from "@/heroes/hooks/useSummary";
import { useHeroes } from "@/heroes/hooks/useHeroes";
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext";

export const HomePage = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const { favoriteCount, favorites } = use(FavoriteHeroContext)



  /* const [activeTab, setActiveTab] = useState<
    "all" | "favorites" | "heroes" | "villians"
  >("all"); */

  let activeTab = searchParams.get("tab") || "all";
  const page = searchParams.get("page") ?? '1';
  const limit = searchParams.get("limit") ?? '6'
  const category = searchParams.get("category") ?? 'all'


  const validTab = useMemo(() => {
    const validsTab = ["all", "favorites", "heroes", "villians"];
    return validsTab.includes(activeTab) ? activeTab : "all"
  }, [activeTab])

  //!Muchos problemas y deficiencias manejarlo con useEffect
  /* useEffect(() => {
    getHeroesByPage().then((heroes) => {console.log({heroes})})
  }, []) */

  const { data: heroesResponse } = useHeroes(+page, +limit, category);

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
              prev.set('category', 'all')
              prev.set('page', '1')
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
              Favorites ({favoriteCount})
            </TabsTrigger>
            <TabsTrigger value="heroes" onClick={() => setSearchParams((prev) => {
              prev.set('tab', 'heroes')
              prev.set('category', 'hero')
              prev.set('page', '1')


              return prev
            })}>
              Heroes ({summary?.heroCount})
            </TabsTrigger>
            <TabsTrigger
              value="villains"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'villians')
                prev.set('category', 'villain')

                prev.set('page', '1')

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
            <HeroGrid heros={favorites} />
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

        {validTab !== 'favorites' && (

          <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
        )}
      </>
    </>
  );
};
