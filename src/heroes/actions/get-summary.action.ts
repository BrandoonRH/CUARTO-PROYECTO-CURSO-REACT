import heroesApi from "../api/heroes.api";
import type { SummaryResponse } from "../interfaces/summary-information.response";

export const getSummaryAction = async () => {
  const { data } = await heroesApi.get<SummaryResponse>("/summary");
  return data;
};
