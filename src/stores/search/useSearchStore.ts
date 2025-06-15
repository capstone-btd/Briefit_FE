import { create } from "zustand";

interface SearchState {
  queries: Record<string, string>; // id별 검색어 저장
  setQuery: (id: string | null, newQuery: string) => void;
  focusedSearchBarId: string | null;
  setFocusedSearchBarId: (id: string | null) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  queries: {},
  setQuery: (id, newQuery) => {
    set((state) => {
      if (id == null) {
        return { queries: {} };
      }
      return {
        queries: { ...state.queries, [id]: newQuery },
      };
    });
  },
  focusedSearchBarId: null,
  setFocusedSearchBarId: (id) => {
    set({ focusedSearchBarId: id });
    set({ queries: {} });
  },
}));
