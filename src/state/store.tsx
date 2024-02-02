import { create } from "zustand";

type State = {
  isMenuOpen: boolean;
  isSearchResultVisible: boolean;
  searchString: string;
};

type Action = {
  toggleMenuOpen: (isMenuOpen: State["isMenuOpen"]) => void;
  showSearchResult: () => void;
  hideSearchResult: () => void;
  setSearchString: (searchString: State["searchString"]) => void;
};

export const useStore = create<State & Action>((set) => ({
  isMenuOpen: false,
  isSearchResultVisible: false,
  searchString: "",

  // Actions
  toggleMenuOpen: (isMenuOpen) => set(() => ({ isMenuOpen: !isMenuOpen })),
  showSearchResult: () => set(() => ({ isSearchResultVisible: true })),
  hideSearchResult: () => set(() => ({ isSearchResultVisible: false })),
  setSearchString: (searchString) => set(() => ({ searchString })),
}));
