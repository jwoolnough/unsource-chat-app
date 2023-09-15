import { RefObject } from "react";
import { create } from "zustand";

type ScrollerRef = RefObject<HTMLDivElement> | null;

interface LayoutStore {
  scrollerRef: ScrollerRef;
  setScrollerRef: (scrollerRef: ScrollerRef) => void;
}

// Typing zustand stores requires this currying hack workaround
// https://github.com/pmndrs/zustand/blob/main/docs/guides/typescript.md
const useLayoutStore = create<LayoutStore>()((set) => ({
  scrollerRef: null,
  setScrollerRef: (scrollerRef) => set({ scrollerRef }),
}));

export { useLayoutStore };
