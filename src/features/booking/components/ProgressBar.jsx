export const ProgressBar = ({ stage }) => {
  const steps = ["Room", "Guest", "Services", "Review", "Payment"];

  return (
    <div className="flex justify-between items-center mb-8 relative">
      <div className="absolute left-0 top-4 w-280 h-1 bg-border -z-10">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{
            width: `${((Math.min(stage, 5) - 1) / 4) * 100}%`,
          }}
        />
      </div>
      {steps.map((label, index) => {
        const stepNum = index + 1;
        const isActive = stage >= stepNum;
        return (
          <div key={stepNum} className="flex flex-col items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-background border-2 border-border text-muted-foreground"
              }`}
            >
              {stepNum}
            </div>
            <span
              className={`text-xs font-medium hidden md:block ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
