import { create } from "zustand";

type State = {
  isMenuOpen: boolean;
  isSearchResultVisible: boolean;
  searchString: string;
};

type Action = {
  toggleMenuOpen(): void;
  openMenu(): void;
  closeMenu(): void;
  showSearchResult(): void;
  hideSearchResult(): void;
  setSearchString(searchString: State["searchString"]): void;
};

export const useStore = create<State & Action>((set) => ({
  isMenuOpen: false,
  isSearchResultVisible: false,
  searchString: "",

  // Actions
  toggleMenuOpen: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  openMenu: () => set(() => ({ isMenuOpen: true })),
  closeMenu: () => set(() => ({ isMenuOpen: false })),
  showSearchResult: () => set(() => ({ isSearchResultVisible: true })),
  hideSearchResult: () => set(() => ({ isSearchResultVisible: false })),
  setSearchString: (searchString) => set(() => ({ searchString })),
}));
