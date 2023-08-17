import { clsxm } from "@/utils/clsxm";

import "./style.css";

interface ButtonProps extends React.ComponentProps<"button"> {
  isLoading?: boolean;
}

const Button = ({
  children,
  isLoading = false,
  className,
  disabled,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={clsxm(isLoading && "button-loading", className)}
      disabled={disabled || isLoading}
      {...rest}
    >
      {children}
      <span className="button-spinner" aria-hidden />
    </button>
  );
};

export { Button };
