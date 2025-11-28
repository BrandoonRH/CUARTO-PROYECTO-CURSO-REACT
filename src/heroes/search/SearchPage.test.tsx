import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { FavoriteHeroProvider } from "../context/FavoriteHeroContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchPage from "./SearchPage";
import { searchHeroesAction } from "../actions/search-heros.action";
import type { Hero } from "../interfaces/hero.interface";

vi.mock('@/heroes/actions/search-heros.action'); 
const mockSearchHeroAction = vi.mocked(searchHeroesAction); 

vi.mock('@/components/custom/CustomJumbotron', () => ({
    CustomJumbotron: () => <div data-testid="custom-jumbotron"></div>
})); 

vi.mock('./ui/SearchControls', () => ({
  SearchControls: () => <div data-testid="search-controls"></div>,
}));

vi.mock('@/heroes/components/HeroGrid', () => ({
    HeroGrid: ({heros}:{heros: Hero[]}) => (
        <div data-testId="hero-grid">
            {heros.map((hero) => (
                <div key={hero.id}>{hero.name}</div>
            ))}
        </div>
    )
}))

const queryClient = new QueryClient();

const renderSearchPage = (initialEntris: string[] = ['/']) => {
    return render(
        <MemoryRouter initialEntries={initialEntris}>
            <FavoriteHeroProvider>
                <QueryClientProvider client={queryClient}>
                    <SearchPage />
                </QueryClientProvider>
            </FavoriteHeroProvider>
        </MemoryRouter>
    )
}

describe('SearchPage', () => {
    beforeEach(() => {
        vi.clearAllMocks(); 
    })
    test('Should render with default values', () => {
        const {container} = renderSearchPage(); 
        expect(mockSearchHeroAction).toHaveBeenCalledWith({
            name: undefined,
            strength: undefined
        }); 
        expect(container).toMatchSnapshot(); 
    }); 

    test('should call search action with name parameter', () => {
        const {container} = renderSearchPage(['/search?name=superman']); 
        expect(mockSearchHeroAction).toHaveBeenCalledWith({
            name: 'superman',
            strength: undefined
        }); 
        expect(container).toMatchSnapshot(); 
    }); 

    test('should call search action with strength parameter', () => {
        const {container} = renderSearchPage(['/search?strength=6']); 
        expect(mockSearchHeroAction).toHaveBeenCalledWith({
            name: undefined,
            strength: '6'
        }); 
        expect(container).toMatchSnapshot(); 
    })

    test('should call search action with strength  and name parameter', () => {
        const {container} = renderSearchPage(['/search?strength=6&name=superman']); 
        expect(mockSearchHeroAction).toHaveBeenCalledWith({
            name: 'superman',
            strength: '6'
        }); 
        expect(container).toMatchSnapshot(); 
    }); 

    test('should render HeroGrid with search results', async () => {
    const mockHeroes = [
      { id: '1', name: 'Clark Kent' } as unknown as Hero,
      { id: '2', name: 'Bruce Wayne' } as unknown as Hero,
    ];

    mockSearchHeroAction.mockResolvedValue(mockHeroes);

    renderSearchPage();

    await waitFor(() => {
      expect(screen.getByText('Clark Kent')).toBeDefined();
      expect(screen.getByText('Bruce Wayne')).toBeDefined();
    });
  });
})