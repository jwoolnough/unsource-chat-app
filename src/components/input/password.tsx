"use client";

import { forwardRef, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { clsxm } from "@/utils/clsxm";

import { Tippy } from "../tippy/tippy";
import { Input, type InputProps, type RenderInputRightElement } from "./input";

type PasswordInputProps = Omit<InputProps, "ref">;

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ placeholder = "••••••••••••", ...rest }, ref) => {
    const [show, setShow] = useState(false);

    const renderRightElement: RenderInputRightElement = ({
      defaultClasses,
    }) => (
      <Tippy content={show ? "Hide password" : "Show password"}>
        <button
          type="button"
          className={clsxm(
            defaultClasses,
            "mr-[-2px] flex h-[21px] w-[21px] items-center justify-center text-slate-400 hover:text-slate-600"
          )}
          onClick={() => setShow(!show)}
          aria-label={!show ? "Show password" : "Hide password"}
        >
          {show ? <FiEye size={18} /> : <FiEyeOff size={18} />}
        </button>
      </Tippy>
    );

    return (
      <Input
        ref={ref}
        placeholder={placeholder}
        renderRightElement={renderRightElement}
        {...rest}
        type={!show ? "password" : "text"}
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
