import Link from "next/link";

import { clsxm } from "@/utils/clsxm";

interface MastheadProps {
  className?: string;
}

const Legal = ({ className }: MastheadProps) => (
  <footer className={clsxm("mt-auto text-sm sm:flex", className)}>
    <p className="text-center">&copy; {new Date().getFullYear()} Unsource</p>
    <ul className="flex">
      <li className="sm:before:mx-3 sm:before:content-['·']">
        <Link href="/privacy" className="hover:text-orange-400">
          Privacy Policy
        </Link>
      </li>
      <li className="before:mx-3 before:content-['·']">
        <Link href="/terms-of-service" className="hover:text-orange-400">
          Terms of Service
        </Link>
      </li>
    </ul>
  </footer>
);

export { Legal };
