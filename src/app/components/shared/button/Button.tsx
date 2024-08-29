import React from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "draft"
  | "discard"
  | "cancel";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const baseStyles =
  "font-bold rounded-full inline-flex items-center transition-colors duration-300";

const sizeStyles: Record<ButtonSize, string> = {
  small: "px-4 py-2 text-xs",
  medium: "px-2 py-2 text-[0.938rem]",
  large: "px-6 py-4 text-[0.938rem]",
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-color01 hover:bg-color02 text-white",
  secondary:
    "bg-[#F9FAFE] text-color07 hover:bg-color05 dark:bg-color04 dark:hover:bg-white dark:text-color05 dark:hover:text-color07",
  danger:
    "bg-color09 hover:bg-color10 text-white font-bold rounded-3xl outline-none",
  draft:
    "bg-[#373B53] hover:bg-color08 dark:hover:bg-color03 text-color05 font-bold rounded-3xl",
  discard: "bg-[#F9FAFE] text-color07 font-bold rounded-3xl",
  cancel:
    "bg-[#F9FAFE] dark:bg-color04 text-color07 dark:text-color05 font-bold rounded-3xl",
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  className = "",
  children,
  ...props
}) => {
  const classes = [
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className,
  ].join(" ");

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
