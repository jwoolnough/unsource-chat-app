import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const clsxm = (...classes: ClassValue[]) => twMerge(clsx(...classes));

export { clsxm };
