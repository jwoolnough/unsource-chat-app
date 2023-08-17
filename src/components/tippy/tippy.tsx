import BaseTippy, { TippyProps } from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "./style.css";

const Tippy = ({ className, ...rest }: TippyProps) => (
  <BaseTippy className="app-tippy" {...rest} />
);

export { Tippy };
