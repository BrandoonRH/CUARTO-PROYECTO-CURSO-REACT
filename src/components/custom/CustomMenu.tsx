import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@radix-ui/react-navigation-menu";
import { Link } from "react-router";
import { NavigationMenu, NavigationMenuList } from "../ui/navigation-menu";
import { useLocation } from "react-router";
import { cn } from "@/lib/utils";

export const CustomMenu = () => {

    const {pathname} = useLocation()

    const isActive = (path:string) => {
        return pathname === path 
    }
    
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild
            className={cn(`bg-slate-200 rounded-md p-2 ${isActive('/') ? 'bg-blue-300 ':'' }`)}
          >
            <Link to="/">Inicio</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild
           className={cn(`bg-slate-200 rounded-md p-2 ${isActive('/search') ? 'bg-blue-300 ':'' }`)}
          >
            <Link to="/search">Buscar</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
