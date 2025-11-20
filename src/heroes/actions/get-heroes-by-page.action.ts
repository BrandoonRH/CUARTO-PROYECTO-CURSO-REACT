import heroesApi from "../api/heroes.api"
import type { HeroesResponse } from "../interfaces/get-heroes.response";

const url = import.meta.env.VITE_API_URL; 
export const getHeroesByPage = async (
    page: number ,
    limit: number = 6,
    category: string = 'all'
): Promise<HeroesResponse> => {
    if(isNaN(page)) {
        page = 1
    }
    if(isNaN(limit)) {
        limit = 6
    }
    const {data} = await heroesApi.get<HeroesResponse>(`/`, {
        params: {
            limit: limit,
            offset: (page - 1) * limit,
            category: category
        }
    }); 
    const heroes = data.heroes.map(hero => ({
        ...hero,
        image: `${url}/images/${hero.image}`
    }))
    return {
        ...data,
        heroes
    }; 
}