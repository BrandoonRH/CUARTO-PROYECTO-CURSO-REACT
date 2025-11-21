import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import type { Hero } from "../interfaces/hero.interface";
interface FavHeroContext {
    //state
    favorites: Hero[];
    favoriteCount: number;

    //method
    isFavorite: (id: Hero['id']) => boolean;
    toggleFavorite: (hero: Hero) => void;

}

export const FavoriteHeroContext = createContext({} as FavHeroContext);



const getFavoritesFromLocalStorage = () => {
    const favorites = localStorage.getItem('favorite');
    return favorites ? JSON.parse(favorites) : [];
}

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {


    const [favorites, setFavorites] = useState<Hero[]>(getFavoritesFromLocalStorage());

    const favoriteCount = favorites.length;

    const toggleFavorite = (hero: Hero) => {
        const heroExist = favorites.find(h => h.id === hero.id);
        if (heroExist) {
            setFavorites(favorites.filter((h) => h.id !== hero.id))
            return;
        }
        setFavorites([...favorites, hero])
    }

    const isFavorite = (id: Hero['id']) => favorites.some(hero => hero.id === id);


    useEffect(() => {
        localStorage.setItem('favorite', JSON.stringify(favorites))
    }, [favorites])


    return (
        <FavoriteHeroContext value={{
            favorites,
            favoriteCount,
            isFavorite,
            toggleFavorite
        }}>
            {children}
        </FavoriteHeroContext>
    )
}
