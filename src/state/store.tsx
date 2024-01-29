import { create } from "zustand";

type State = {
  isMenuOpen: boolean;
};

type Action = {
  toggleMenuOpen: (isMenuOpen: State["isMenuOpen"]) => void;
};

export const useStore = create<State & Action>((set) => ({
  isMenuOpen: false,

  // Actions
  toggleMenuOpen: (isMenuOpen) => set(() => ({ isMenuOpen: !isMenuOpen })),
}));
