export default function Button({ 
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  type = "button"
}) {
  
  const base = `
    inline-flex items-center justify-center gap-2 font-semibold rounded-xl focus:outline-none
  `
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-slate-100 hover:bg-slate-200 text-slate-700 ",
    outline: "bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 ",
    }

  const sizes = {
    xs: "px-2.5 py-1.5 text-[11px] uppercase tracking-wider",
    sm: "px-3.5 py-2 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3 text-sm",
  }

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`}
    >
      {children}
    </button>
  )
}