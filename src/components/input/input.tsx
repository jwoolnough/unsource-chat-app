import { forwardRef, useId } from "react";
import { clsxm } from "@/utils/clsxm";
import "./style.css";

type RenderInputRightElement = (renderInputRightElementBag: {
  defaultClasses: string;
}) => React.ReactNode;

interface InputProps extends React.ComponentProps<"input"> {
  containerClassName?: string;
  label: string;
  labelClassName?: string;
  renderRightElement?: RenderInputRightElement;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      label,
      labelClassName,
      // Slight hack to leverage `:placeholder-shown` trick within `style.css`
      placeholder = " ",
      renderRightElement,
      ...rest
    },
    ref
  ) => {
    const id = useId();

    return (
      <div
        className={clsxm(
          "input-container",
          "relative mb-4",
          containerClassName
        )}
      >
        <label
          className={clsxm(
            "input-label",
            "absolute top-[13px] left-[13px] inline-block origin-top-left cursor-text px-1 text-slate-200",
            labelClassName
          )}
          htmlFor={id}
        >
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          className={clsxm(
            "input",
            "w-full rounded-md border border-accent bg-transparent px-4 py-3",
            "outline-none focus:border-orange-400",
            "placeholder:text-slate-200 placeholder:text-opacity-75 placeholder:opacity-0 placeholder:transition-opacity",
            className
          )}
          placeholder={placeholder}
          {...rest}
        />
        {renderRightElement?.({
          defaultClasses: "absolute right-[17px] top-1/2 -translate-y-1/2",
        })}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
export type { InputProps, RenderInputRightElement };
