const variantStyles = {
  success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  warning: 'bg-amber-50 text-amber-700 border border-amber-200',
  danger: 'bg-red-50 text-red-700 border border-red-200',
  info: 'bg-sky-50 text-sky-700 border border-sky-200',
  neutral: 'bg-neutral text-text/70 border border-sandstone/20',
  gold: 'bg-gold/10 text-gold border border-gold/20',
  soldOut: 'bg-red-600 text-white',
};

export default function Badge({ variant = 'neutral', children, className = '', dot = false }) {
  return (
    <span className={`badge ${variantStyles[variant] || variantStyles.neutral} ${className}`}>
      {dot && (
        <span className={`h-1.5 w-1.5 rounded-full ${
          variant === 'success' ? 'bg-emerald-500' :
          variant === 'warning' ? 'bg-amber-500' :
          variant === 'danger' ? 'bg-red-500' :
          variant === 'info' ? 'bg-sky-500' :
          'bg-text/40'
        }`} />
      )}
      {children}
    </span>
  );
}
