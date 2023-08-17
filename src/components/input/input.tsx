import { forwardRef, useId } from "react";
import { clsxm } from "@/utils/clsxm";
import "./style.css";
import { AnimatePresence, motion } from "framer-motion";

type RenderInputRightElement = (renderInputRightElementBag: {
  defaultClasses: string;
}) => React.ReactNode;

interface InputProps extends React.ComponentProps<"input"> {
  containerClassName?: string;
  label: string;
  labelClassName?: string;
  renderRightElement?: RenderInputRightElement;
  error?: string;
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
      error,
      ...rest
    },
    ref
  ) => {
    const id = useId();

    return (
      <div className={clsxm("mb-4", containerClassName)}>
        <div
          className={clsxm(
            "input-container",
            "relative",
            error && "is-invalid"
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
              "w-full rounded-md border border-accent bg-white px-4 py-3",
              "outline-none focus:border-orange-400",
              "placeholder:text-slate-200 placeholder:opacity-0 placeholder:transition-opacity",
              error &&
                "border-red-300 focus:border-red-300 focus:ring-2 ring-red-100",
              className
            )}
            placeholder={placeholder}
            {...rest}
          />
          {renderRightElement?.({
            defaultClasses: "absolute right-[17px] top-1/2 -translate-y-1/2",
          })}
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              className="before:pt-1 before:block text-sm text-red-400"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
export type { InputProps, RenderInputRightElement };
