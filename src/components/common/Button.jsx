export const Button = ({
  size = "default",
  className = "",
  background = "primary",
  onClick = () => {},
  children,
  disabled = false,
}) => {
  const baseClasses =
    "rounded-[var(--radius)] font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:disabled:brightness-100 hover:disabled:scale-100 active:disabled:scale-100 [&:not(:disabled)]:active:opacity-80 [&:not(:disabled)]:hover:brightness-110 [&:not(:disabled)]:hover:scale-[1.02] [&:not(:disabled)]:active:scale-95";
  const sizeClasses = {
    sm: "py-2 px-4 text-sm",
    default: "py-3 px-6 text-base",
    lg: "py-4 px-8 text-lg",
  };
  const backgroundClasses = {
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    accent: "bg-accent text-accent-foreground",
    muted: "bg-muted text-muted-foreground",
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${backgroundClasses[background]} ${className}`;
  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      <span className="relative flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};
