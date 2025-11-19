import { useQuery } from "@tanstack/react-query";
import { getSummaryAction } from "../actions/get-summary.action";

export const useSummary = () => {

    const { data: summary, isError, isLoading } = useQuery({
        queryKey: ['summary-information'],
        queryFn: getSummaryAction,
        staleTime: 1000 * 60 * 5
    });

    return {
        summary,
        isError,
        isLoading
    }
}