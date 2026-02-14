export default function StepsIndicator({ steps, currentStep, className = '' }) {
  return (
    <nav className={`flex items-center justify-center gap-2 ${className}`} aria-label="Progress">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        const stepNum = index + 1;

        return (
          <div key={step} className="flex items-center">
            {index > 0 && (
              <div className={`mx-2 h-px w-8 sm:w-12 ${isCompleted ? 'bg-gold' : 'bg-sandstone/20'}`} />
            )}
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                  isCompleted
                    ? 'bg-gold text-night'
                    : isActive
                    ? 'bg-gold/10 text-gold ring-2 ring-gold'
                    : 'bg-sandstone/10 text-text/40'
                }`}
              >
                {isCompleted ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>
              <span
                className={`hidden text-sm font-medium sm:block ${
                  isActive ? 'text-text' : isCompleted ? 'text-gold' : 'text-text/40'
                }`}
              >
                {step}
              </span>
            </div>
          </div>
        );
      })}
    </nav>
  );
}
