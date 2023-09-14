import { useRef, useState } from "react";
import { FiEdit2, FiMoreVertical, FiTrash } from "react-icons/fi";

import { useClickOutside } from "@/hooks/use-click-outside";

import { Tippy } from "@/components/tippy";

import { clsxm } from "@/utils/clsxm";

interface MenuItemProps {
  onClick?: () => void;
  renderIcon: (renderIconProps: { className: string }) => React.ReactElement;
  children: React.ReactNode;
}

const MenuItem = ({ renderIcon, onClick, children }: MenuItemProps) => (
  <li>
    <button
      onClick={onClick}
      type="button"
      className="flex w-full items-center rounded-sm px-2 py-1 hover:bg-slate-600"
    >
      {renderIcon({ className: "mr-2 text-slate-400" })} {children}
    </button>
  </li>
);

interface MessageMenuProps {
  onDelete: () => void;
}

const MessageMenu = ({ onDelete }: MessageMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useClickOutside(menuRef, () => {
    setIsOpen(false);
  });

  return (
    <div ref={menuRef}>
      <Tippy
        visible={isOpen}
        offset={[6, 14]}
        placement="top-end"
        interactive
        className="z-10 [&>.tippy-content]:p-1"
        content={
          <ul>
            <MenuItem
              renderIcon={({ className }) => <FiEdit2 className={className} />}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={onDelete}
              renderIcon={({ className }) => <FiTrash className={className} />}
            >
              Delete
            </MenuItem>
          </ul>
        }
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className={clsxm(
            "absolute right-1.5 top-3 flex h-6 w-8 items-center justify-end rounded-sm bg-gradient-to-l from-orange-400 via-orange-400 via-70% pr-1.5 text-orange-200 opacity-0 ring-white transition hover:text-white focus:bg-orange-400 focus:opacity-100 group-hover:opacity-100",
            isOpen && "opacity-100"
          )}
          aria-label="More"
        >
          <FiMoreVertical size={20} />
        </button>
      </Tippy>
    </div>
  );
};

export { MessageMenu };
