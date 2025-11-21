import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "../components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { searchHeroesAction } from "../actions/search-heros.action";
import { HeroGrid } from "../components/HeroGrid";

const SearchPage = () => {

  const [searchParams] = useSearchParams()
  const name = searchParams.get('name') ?? undefined; 
  const strength = searchParams.get('strength') ?? undefined;

  const {data = []} = useQuery({
    queryKey: ['heroes', 'search', {name, strength }],
    queryFn: () => searchHeroesAction({name, strength }),
    //staleTime: 1000 * 60 * 5
  });

  return (
    <>
      <CustomJumbotron
        title="BUsqueda de Supers"
        subtitle="BUsca tu favorito"
      />
      <HeroStats />

      <SearchControls />
      <HeroGrid heros={data}/>
    </>
  );
};

export default SearchPage;
