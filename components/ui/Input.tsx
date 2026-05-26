import { forwardRef } from "react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const fieldClasses =
  "w-full rounded-[3px] border border-bone-50/10 bg-ink-900 px-4 py-3 text-bone-50 placeholder:text-bone-500 transition-colors focus:border-rain-500 focus:bg-ink-800 focus:outline-none";

export const Input = forwardRef<HTMLInputElement, ComponentProps<"input">>(
  function Input({ className, ...rest }, ref) {
    return <input ref={ref} className={cn(fieldClasses, className)} {...rest} />;
  },
);

export const TextArea = forwardRef<HTMLTextAreaElement, ComponentProps<"textarea">>(
  function TextArea({ className, ...rest }, ref) {
    return <textarea ref={ref} className={cn(fieldClasses, "min-h-32", className)} {...rest} />;
  },
);

export const Select = forwardRef<HTMLSelectElement, ComponentProps<"select">>(
  function Select({ className, children, ...rest }, ref) {
    return (
      <select ref={ref} className={cn(fieldClasses, "appearance-none pr-10", className)} {...rest}>
        {children}
      </select>
    );
  },
);

export function Label({
  children,
  htmlFor,
  required,
}: {
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block mb-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500"
    >
      {children}
      {required && <span aria-hidden className="text-rain-500"> *</span>}
    </label>
  );
}

export function FieldError({ children }: { children?: React.ReactNode }) {
  if (!children) return null;
  return <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-copper-500">{children}</p>;
}
