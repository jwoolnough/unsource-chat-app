import BaseTippy, { TippyProps } from "@tippyjs/react";
import { forwardRef } from "react";
import "tippy.js/dist/tippy.css";

import { clsxm } from "@/utils/clsxm";

import "./style.css";

const Tippy = forwardRef<HTMLElement, TippyProps>(
  ({ className, ...rest }, ref) => (
    <BaseTippy className={clsxm("app-tippy", className)} {...rest} ref={ref} />
  )
);

Tippy.displayName = "Tippy";

export { Tippy };
