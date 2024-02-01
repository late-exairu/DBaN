import { create } from "zustand";

type State = {
  isMenuOpen: boolean;
  isSearchResultVisible: boolean;
};

type Action = {
  toggleMenuOpen: (isMenuOpen: State["isMenuOpen"]) => void;
  showSearchResult: () => void;
  hideSearchResult: () => void;
};

export const useStore = create<State & Action>((set) => ({
  isMenuOpen: false,
  isSearchResultVisible: false,

  // Actions
  toggleMenuOpen: (isMenuOpen) => set(() => ({ isMenuOpen: !isMenuOpen })),
  showSearchResult: () => set(() => ({ isSearchResultVisible: true })),
  hideSearchResult: () => set(() => ({ isSearchResultVisible: false })),
}));
