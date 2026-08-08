interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function QuantityStepper({ value, onChange, min = 1, max = 50 }: QuantityStepperProps) {
  return (
    <div className="inline-flex items-center rounded-lg border border-gray-300">
      <button
        type="button"
        className="px-3 py-2 text-lg text-gray-600 disabled:opacity-40 cursor-pointer"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Diminuisci quantità"
      >
        −
      </button>
      <span className="w-8 text-center text-sm font-medium text-gray-900">{value}</span>
      <button
        type="button"
        className="px-3 py-2 text-lg text-gray-600 disabled:opacity-40 cursor-pointer"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Aumenta quantità"
      >
        +
      </button>
    </div>
  );
}
