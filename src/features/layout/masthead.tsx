import Image from "next/image";
import Link from "next/link";

import { clsxm } from "@/utils/clsxm";

interface MastheadProps {
  className?: string;
}

const Masthead = ({ className }: MastheadProps) => (
  <header className={clsxm("mb-auto flex", className)}>
    <Link href="/">
      <Image
        src="/img/logo.svg"
        alt="Unsource"
        width={177}
        height={18}
        priority
      />
    </Link>
  </header>
);

export { Masthead };
