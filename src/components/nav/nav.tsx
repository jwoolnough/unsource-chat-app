import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, cloneElement } from "react";
import {
  FiHelpCircle,
  FiLogOut,
  FiMessageCircle,
  FiSettings,
  FiUser,
} from "react-icons/fi";

import { clsxm } from "@/utils/clsxm";

import { Tippy } from "../tippy";
import "./style.css";

interface NavItemProps extends ComponentProps<"li"> {
  title: string;
  href: ComponentProps<typeof Link>["href"];
  icon: React.ReactElement;
}

const NavItem = ({ title, href, icon, ...rest }: NavItemProps) => {
  const isActive = href === usePathname();

  return (
    <li {...rest}>
      <Tippy content={title}>
        <Link
          href={href}
          className={clsxm(
            "w-9 h-9 text-slate-400 flex items-center justify-center rounded-md",
            "hover:text-orange-500",
            isActive && "text-orange-500 bg-orange-100"
          )}
        >
          {cloneElement(icon, {
            size: 22,
          })}
        </Link>
      </Tippy>
    </li>
  );
};

const Nav = () => {
  return (
    <nav className="my-6">
      <ul className="flex flex-col h-full gap-[0.375rem]">
        <NavItem title="Chat" icon={<FiMessageCircle />} href="/" />
        <NavItem title="Profile" icon={<FiUser />} href="/profile" />
        <NavItem title="Settings" icon={<FiSettings />} href="/settings" />
        <NavItem title="Help" icon={<FiHelpCircle />} href="/help" />
        <NavItem
          title="Log out"
          icon={<FiLogOut />}
          href="/logout"
          className="mt-auto"
        />
      </ul>
    </nav>
  );
};

export { Nav };
