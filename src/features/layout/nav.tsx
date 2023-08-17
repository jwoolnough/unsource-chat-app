import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
      <Link href="/" className="max-sm:hidden">
        <Image src="/img/logogram.svg" alt="Unsource" width={24} height={14} />
      </Link>
      <ul className="flex sm:flex-col sm:h-full gap-[0.375rem] justify-between max-sm:mx-4">
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
