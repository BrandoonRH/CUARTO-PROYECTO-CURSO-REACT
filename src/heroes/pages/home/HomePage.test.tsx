import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { HomePage } from "./HomePage";
import { useHeroes } from "@/heroes/hooks/useHeroes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoriteHeroProvider } from "@/heroes/context/FavoriteHeroContext";


vi.mock('@/heroes/hooks/useHeroes');
const mockUsePaginationHero = vi.mocked(useHeroes);

mockUsePaginationHero.mockReturnValue({
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: false
} as unknown as ReturnType<typeof mockUsePaginationHero>);

const queryClient = new QueryClient();


const renderHomePage = (initialEntris: string[] = ['/']) => {
    return render(
        <MemoryRouter initialEntries={initialEntris}>
            <FavoriteHeroProvider>
                <QueryClientProvider client={queryClient}>
                    <HomePage />
                </QueryClientProvider>
            </FavoriteHeroProvider>
        </MemoryRouter>
    )
}

describe('HomePage', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    })
    test('Should render home page with default values', () => {
        const { container } = renderHomePage();
        expect(container).toMatchSnapshot();
    });

    test('Should call useHeroes with default values', () => {
        renderHomePage();
        expect(mockUsePaginationHero).toHaveBeenCalledWith(1, 6, 'all')
    });
    test('Should call useHeroes with custom query params', () => {
        renderHomePage(['/?page=2&limit=10&category=villains']);
        expect(mockUsePaginationHero).toHaveBeenCalledWith(2, 10, 'villains')
    });

    test('Should with tab', () => {
        renderHomePage(['/?tab=favorites&page=2&limit=10']);
        const [, , , villainsTab] = screen.getAllByRole('tab'); 
        fireEvent.click(villainsTab); 
        expect(mockUsePaginationHero).toHaveBeenCalledWith(1, 10, 'villain'); 
        
        //expect(mockUsePaginationHero).toHaveBeenCalledWith(2, 10, 'villains')
    });


})