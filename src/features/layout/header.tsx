"use client";

import { clsxm } from "@/utils/clsxm";

import { useLayoutStore } from "./store";

interface HeaderProps {
  title: string;
  renderHeaderRight?: () => React.ReactElement;
}

const Header = ({ title, renderHeaderRight }: HeaderProps) => {
  const { isAtTop } = useLayoutStore();

  return (
    <div
      className={clsxm(
        "sticky top-0 z-10 flex justify-between border-b border-slate-100 border-opacity-0 p-4 transition",
        !isAtTop && "border-opacity-100 bg-slate-50/70 backdrop-blur"
      )}
    >
      <h1 className="mb-0">{title}</h1>

      {renderHeaderRight?.()}
    </div>
  );
};

export { Header };
