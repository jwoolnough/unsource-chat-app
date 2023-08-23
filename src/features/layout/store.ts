import { create } from "zustand"

interface LayoutStore {
  isAtTop: boolean;
  isAtBottom: boolean;
  setIsAtTop: (isAtTop: boolean) => void;
  setIsAtBottom: (isAtBottom: boolean) => void;
}

const useLayoutStore = create<LayoutStore>()((set) => ({
  isAtTop: false,
  setIsAtTop: (isAtTop) => set({ isAtTop }),
  isAtBottom: true,
  setIsAtBottom: (isAtBottom) => set({ isAtBottom }),
}))

export { useLayoutStore }