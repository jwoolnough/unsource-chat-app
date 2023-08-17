import { signOut } from "firebase/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ComponentProps, MouseEventHandler, cloneElement } from "react";
import {
  FiHelpCircle,
  FiLogOut,
  FiMessageCircle,
  FiSettings,
  FiUser,
} from "react-icons/fi";

import { auth } from "@/services/firebase";

import { clsxm } from "@/utils/clsxm";

import { Tippy } from "../tippy";
import "./style.css";
import { toast } from "react-toastify";

interface NavItemProps extends Omit<ComponentProps<"li">, "onClick"> {
  title: string;
  href?: ComponentProps<typeof Link>["href"];
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon: React.ReactElement;
}

const NavItem = ({ title, href, icon, onClick, ...rest }: NavItemProps) => {
  const isActive = href === usePathname();

  const styledIcon = cloneElement(icon, {
    size: 22,
  });
  const buttonClasses = clsxm(
    "w-9 h-9 text-slate-400 flex items-center justify-center rounded-md",
    "hover:text-orange-500",
    isActive && "text-orange-500 bg-orange-100"
  );

  return (
    <li {...rest}>
      <Tippy content={title}>
        {href ? (
          <Link href={href} className={buttonClasses}>
            {styledIcon}
          </Link>
        ) : (
          <button type="button" onClick={onClick} className={buttonClasses}>
            {styledIcon}
          </button>
        )}
      </Tippy>
    </li>
  );
};

const Nav = () => {
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch {
      toast.error("Unable to log out")
    }
  };

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
          onClick={handleLogOut}
          className="mt-auto"
        />
      </ul>
    </nav>
  );
};

export { Nav };
