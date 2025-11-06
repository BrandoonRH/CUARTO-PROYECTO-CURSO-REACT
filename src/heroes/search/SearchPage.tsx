import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "../components/HeroStats";
import { SearchControls } from "./ui/SearchControls";

const SearchPage = () => {
  return (
    <>
      <CustomJumbotron
        title="BUsqueda de Supers"
        subtitle="BUsca tu favorito"
      />
      <HeroStats />

      <SearchControls />
    </>
  );
};

export default SearchPage;
