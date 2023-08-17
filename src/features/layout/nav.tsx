import { signOut } from "firebase/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ComponentProps, MouseEventHandler } from "react";
import {
  FiHelpCircle,
  FiLogOut,
  FiMessageCircle,
  FiSettings,
  FiUser,
} from "react-icons/fi";
import { toast } from "react-toastify";

import { auth } from "@/services/firebase";

import { Tippy } from "@/components/tippy";

import { clsxm } from "@/utils/clsxm";

type RenderIconProps = {
  size: number;
};

interface NavItemProps extends Omit<ComponentProps<"li">, "onClick"> {
  title: string;
  href?: ComponentProps<typeof Link>["href"];
  onClick?: MouseEventHandler<HTMLButtonElement>;
  renderIcon: (iconProps: RenderIconProps) => React.ReactElement;
}

const NavItem = ({
  title,
  href,
  renderIcon,
  onClick,
  ...rest
}: NavItemProps) => {
  const isActive = href === usePathname();

  const buttonClasses = clsxm(
    "w-9 h-9 text-slate-400 flex items-center justify-center rounded-md",
    "hover:text-orange-500",
    isActive && "text-orange-500 bg-orange-100"
  );

  const iconProps: RenderIconProps = {
    size: 22,
  };

  return (
    <li {...rest}>
      <Tippy content={title}>
        {href ? (
          <Link href={href} className={buttonClasses}>
            {renderIcon(iconProps)}
          </Link>
        ) : (
          <button type="button" onClick={onClick} className={buttonClasses}>
            {renderIcon(iconProps)}
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
      toast.error("Unable to log out");
    }
  };

  return (
    <nav className="my-6">
      <ul className="flex flex-col h-full gap-[0.375rem]">
        <NavItem
          title="Chat"
          renderIcon={(iconProps) => <FiMessageCircle {...iconProps} />}
          href="/"
        />
        <NavItem
          title="Profile"
          renderIcon={(iconProps) => <FiUser {...iconProps} />}
          href="/profile"
        />
        <NavItem
          title="Settings"
          renderIcon={(iconProps) => <FiSettings {...iconProps} />}
          href="/settings"
        />
        <NavItem
          title="Help"
          renderIcon={(iconProps) => <FiHelpCircle {...iconProps} />}
          href="/help"
        />
        <NavItem
          title="Log out"
          renderIcon={(iconProps) => <FiLogOut {...iconProps} />}
          onClick={handleLogOut}
          className="mt-auto"
        />
      </ul>
    </nav>
  );
};

export { Nav };
