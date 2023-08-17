import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, MouseEventHandler } from "react";

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
    "flex h-9 w-9 items-center justify-center rounded-md text-slate-400",
    "hover:text-orange-500",
    isActive && "bg-orange-100 text-orange-500"
  );

  const iconProps: RenderIconProps = {
    size: 22,
  };

  return (
    <li {...rest}>
      <Tippy content={title} offset={[0, 2]}>
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

export { NavItem };
