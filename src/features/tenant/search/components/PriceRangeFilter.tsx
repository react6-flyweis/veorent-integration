import { CurrencyInput } from "@/components/CurrencyInput";
import { Slider } from "@/components/ui/slider";

interface PriceRangeFilterProps {
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  min?: number;
  max?: number;
}

export const PriceRangeFilter = ({
  priceRange,
  setPriceRange,
  min = 0,
  max = 30000,
}: PriceRangeFilterProps) => {
  // This would typically come from backend data
  // For demonstration, we're creating mock histogram data
  const getHistogramData = () => {
    const mockData = [
      4, 8, 15, 25, 30, 40, 35, 45, 30, 25, 20, 15, 18, 22, 15, 12, 8, 5, 10, 8,
      12, 8, 10, 5, 8, 10, 6, 4, 8, 12,
    ];
    return mockData;
  };

  const histogramData = getHistogramData();
  const maxHeight = Math.max(...histogramData);

  return (
    <div className="space-y-3">
      <h3 className="text-base font-medium">Price range</h3>
      <p className="text-muted-foreground text-sm">
        Nightly prices before fees and taxes
      </p>

      {/* Histogram visualization */}
      <div className="relative mt-4 h-20 w-full">
        <div className="absolute inset-0 flex items-end justify-between">
          {histogramData.map((value, i) => (
            <div
              key={i}
              className={`mx-[1px] w-[2px] bg-gray-400 transition-all duration-200`}
              style={{
                height: `${(value / maxHeight) * 100}%`,
                opacity:
                  i * (max / histogramData.length) >= priceRange[0] &&
                  i * (max / histogramData.length) <= priceRange[1]
                    ? 1
                    : 0.3,
              }}
            />
          ))}
        </div>
      </div>

      <div className="pt-2">
        <Slider
          value={priceRange}
          min={min}
          max={max}
          step={100}
          onValueChange={setPriceRange}
        />

        <div className="mt-4 flex justify-between gap-8">
          <CurrencyInput
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([parseInt(e.target.value) || min, priceRange[1]])
            }
          />

          <CurrencyInput
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], parseInt(e.target.value) || max])
            }
          />
        </div>

        <div className="text-muted-foreground mt-2 flex justify-between text-sm">
          <div>Minimum</div>
          <div>Maximum</div>
        </div>
      </div>
    </div>
  );
};
