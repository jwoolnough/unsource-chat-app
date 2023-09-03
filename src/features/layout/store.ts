
import { RefObject } from "react";
import { create } from "zustand"

type ScrollerRef = RefObject<HTMLDivElement> | null;

interface LayoutStore {
  scrollerRef: ScrollerRef;
  setScrollerRef: (scrollerRef: ScrollerRef) => void;
}

const useLayoutStore = create<LayoutStore>()((set) => ({
  scrollerRef: null,
  setScrollerRef: (scrollerRef) => set({ scrollerRef }),
}))

export { useLayoutStore }