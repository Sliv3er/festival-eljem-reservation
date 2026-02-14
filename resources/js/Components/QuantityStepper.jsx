export default function QuantityStepper({ value, onChange, min = 0, max = 10, disabled = false }) {
  return (
    <div className="inline-flex items-center rounded-lg border border-sandstone/20 bg-white">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={disabled || value <= min}
        className="flex h-10 w-10 items-center justify-center text-text/60 transition-colors hover:bg-sandstone/10 hover:text-text disabled:opacity-30 disabled:cursor-not-allowed rounded-s-lg"
        aria-label="Decrease quantity"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" d="M5 12h14" />
        </svg>
      </button>
      <span className="flex h-10 w-12 items-center justify-center border-x border-sandstone/20 text-sm font-semibold text-text tabular-nums">
        {value}
      </span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={disabled || value >= max}
        className="flex h-10 w-10 items-center justify-center text-text/60 transition-colors hover:bg-sandstone/10 hover:text-text disabled:opacity-30 disabled:cursor-not-allowed rounded-e-lg"
        aria-label="Increase quantity"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" d="M12 5v14m-7-7h14" />
        </svg>
      </button>
    </div>
  );
}
