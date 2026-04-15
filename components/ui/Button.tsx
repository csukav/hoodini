"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/lib/buttonVariants";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export { buttonVariants };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", children, ...props },
    ref,
  ) => (
    <button
      ref={ref}
      className={cn(
        buttonVariants(variant, size),
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  ),
);

Button.displayName = "Button";

export default Button;
