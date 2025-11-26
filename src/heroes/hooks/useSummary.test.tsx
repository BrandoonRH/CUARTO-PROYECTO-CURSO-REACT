import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, expect, test, vi } from "vitest";
import type { PropsWithChildren } from 'react';
import { renderHook, waitFor } from "@testing-library/react";
import { useSummary } from "./useSummary";
import type { SummaryResponse } from "../interfaces/summary-information.response";
import { getSummaryAction } from "../actions/get-summary.action";


vi.mock('../actions/get-summary.action', () => ({
    getSummaryAction: vi.fn(),
}));

const mockGetSummaryAction = vi.mocked(getSummaryAction);

//Tenemos que envolver la probea en la configuración que nos da tanstack para que registre correctamente sus hooks
const tanStackCustomProvider = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false
            }
        }
    });

    return ({ children }: PropsWithChildren) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}

describe('useSummary', () => {
    test('should return the initial state', () => {
        const { result } = renderHook(() => useSummary(), {
            wrapper: tanStackCustomProvider()
        });

        expect(result.current.isLoading).toBe(true);
        expect(result.current.isError).toBe(false);
        expect(result.current.summary).toBe(undefined);
        expect(result.current.summary).toBeUndefined();
    });
    test('should return success state with data when API call succeeds', async () => {
        const mockSummaryData = {
            totalHeroes: 10,
            strongestHero: {
                id: '1',
                name: 'Superman',
            },
            smartestHero: {
                id: '2',
                name: 'Batman',
            },
            heroCount: 18,
            villainCount: 7,
        } as SummaryResponse;

        mockGetSummaryAction.mockResolvedValue(mockSummaryData);

        const { result } = renderHook(() => useSummary(), {
            wrapper: tanStackCustomProvider(),
        });

        await waitFor(() => {
            expect(result.current.isLoading).toBe(true);
        });

        expect(result.current.isError).toBe(false);
        expect(mockGetSummaryAction).toHaveBeenCalled();
    });
    test('should return error state when API call fails', async () => {
        const mockError = new Error('Failed to fetch summary');
        mockGetSummaryAction.mockRejectedValue(mockError);

        const { result } = renderHook(() => useSummary(), {
            wrapper: tanStackCustomProvider(),
        });

        await waitFor(() => {
            expect(result.current.isError).toBe(true);
        });

        expect(result.current.error).toBeDefined();
        expect(result.current.isLoading).toBe(false);
        expect(mockGetSummaryAction).toHaveBeenCalled();
        expect(result.current.error?.message).toBe('Failed to fetch summary');
    });
})