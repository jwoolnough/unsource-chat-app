import { signOut } from "firebase/auth";
import { useRouter } from "next-nprogress-bar";
import Image from "next/image";
import Link from "next/link";
import {
  FiHelpCircle,
  FiLogOut,
  FiMessageCircle,
  FiSettings,
  FiUser,
} from "react-icons/fi";
import { toast } from "react-toastify";

import { auth } from "@/services/firebase";

import { NavItem } from "./nav-item";

interface NavProps {
  className: string;
}

const Nav = ({ className }: NavProps) => {
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
    <nav className={className}>
      <ul className="flex justify-between gap-1.5 max-sm:mx-4 sm:h-full sm:flex-col">
        <li className="mb-auto mt-[1.75rem] flex justify-center max-sm:hidden">
          <Link href="/">
            <Image
              src="/img/logogram.svg"
              alt="Unsource"
              width={24}
              height={14}
            />
          </Link>
        </li>
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
          // TODO: Point to proper page
          href="/profile"
        />
        <NavItem
          title="Help"
          renderIcon={(iconProps) => <FiHelpCircle {...iconProps} />}
          // TODO: Point to proper page
          href="/profile"
        />
        <NavItem
          title="Log out"
          renderIcon={(iconProps) => <FiLogOut {...iconProps} />}
          onClick={handleLogOut}
          className="mt-auto sm:mb-[1.375rem]"
        />
      </ul>
    </nav>
  );
};

export { Nav };
