import { describe, expect, test, vi } from "vitest";
import { router } from "./app.routes";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, Outlet, RouterProvider, useParams } from "react-router";

vi.mock('@/heroes/layouts/HeroesLayout.tsx', () => ({
    HeroesLayout: () => <div data-testid="heroes-layout">HeroesLayout
        <Outlet />
    </div>
}));
vi.mock('@/heroes/pages/home/HomePage.tsx', () => ({
    HomePage: () => <div data-testid="home-page">HomePage</div>
}));
vi.mock('@/heroes/pages/hero/HeroPage', () => ({
    HeroPage: () => {
        const { idSlug = '' } = useParams();

        return <div data-testid="hero-page">HeroPage - {idSlug}</div>;
    },
}));
vi.mock('@/heroes/search/SearchPage', () => ({
    default: () => <div data-testid="search-page"></div>,
}));

describe('Router', () => {
    test('should be configured as expected', () => {
        expect(router.routes).toMatchSnapshot();
    });

    test('Should render home page at root path', () => {
        const routerMemory = createMemoryRouter(router.routes, {
            initialEntries: ['/']
        });

        render(<RouterProvider router={routerMemory} />);

        //screen.debug(); 
        expect(screen.getByTestId('home-page')).toBeDefined();
    });
    test('should render hero page at /heroes/:idSlug path', () => {
        const routerMemory = createMemoryRouter(router.routes, {
            initialEntries: ['/hero/superman'],
        });
        render(<RouterProvider router={routerMemory} />);

        expect(screen.getByTestId('hero-page').innerHTML).toContain('superman');
    });
    test('should render search page at /search path', async () => {
        const routerMemory = createMemoryRouter(router.routes, {
            initialEntries: ['/search'],
        });

        render(<RouterProvider router={routerMemory} />);

        expect(await screen.findByTestId('search-page')).toBeDefined();
    });
    test('should redirect to home page for unknown routes', () => {
        const routerMemory = createMemoryRouter(router.routes, {
            initialEntries: ['/otra-pagina-rara'],
        });

        render(<RouterProvider router={routerMemory} />);
         expect(screen.getByText('NOT FOUND 404')).toBeDefined(); 
    });
}); 
