import { cn } from "@/lib/utils";
import type { ButtonVariant, ButtonSize } from "@/components/ui/Button";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
  secondary: "bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-500",
  outline:
    "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500",
  ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-300",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

/** Returns Tailwind class string for use on non-button elements (e.g. <Link>). */
export function buttonVariants(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  extra?: string,
): string {
  return cn(
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
    variantStyles[variant],
    sizeStyles[size],
    extra,
  );
}
