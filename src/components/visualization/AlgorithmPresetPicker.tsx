import type { AlgorithmPreset } from "@/lib/algorithms/types";
import { cn } from "@/lib/utils";

type AlgorithmPresetPickerProps = {
  presets: AlgorithmPreset<unknown>[];
  activePresetId: string;
  onSelect: (presetId: string) => void;
};

export function AlgorithmPresetPicker({
  presets,
  activePresetId,
  onSelect,
}: AlgorithmPresetPickerProps) {
  if (!presets.length) {
    return (
      <div className="text-muted-foreground text-sm">
        No presets available for this algorithm yet.
      </div>
    );
  }

  function PresetValuePreview({ value }: { value: unknown }) {
    const preview = formatPresetValue(value);
    if (!preview) return null;

    return (
      <p className="text-muted-foreground mt-2 font-mono text-xs">{preview}</p>
    );
  }

  function formatPresetValue(value: unknown): string | null {
    if (Array.isArray(value)) {
      return value.join(", ");
    }

    if (value && typeof value === "object") {
      const summary = Object.entries(value as Record<string, unknown>)
        .filter(([key]) => key !== "operation")
        .map(([key, val]) => `${key}: ${summarizePrimitive(val)}`)
        .join(" · ");
      return summary || null;
    }

    if (value === null || value === undefined) return null;
    return String(value);
  }

  function summarizePrimitive(value: unknown): string {
    if (Array.isArray(value)) {
      return `[${value.join(", ")}]`;
    }

    if (value && typeof value === "object") {
      return "…";
    }

    return String(value ?? "");
  }

  return (
    <div className="space-y-3">
      {presets.map((preset) => {
        const isActive = preset.id === activePresetId;
        return (
          <button
            key={preset.id}
            type="button"
            onClick={() => onSelect(preset.id)}
            className={cn(
              "hover:border-primary/60 w-full rounded-2xl border p-3 text-left transition",
              isActive
                ? "border-primary bg-primary/5 text-primary"
                : "border-border/70 bg-background/40",
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-semibold">{preset.label}</span>
              {isActive && (
                <span className="text-primary text-[0.65rem] font-bold tracking-wide uppercase">
                  Active
                </span>
              )}
            </div>

            {preset.description && (
              <p className="text-muted-foreground mt-1 text-xs">
                {preset.description}
              </p>
            )}

            <PresetValuePreview value={preset.value} />
          </button>
        );
      })}
    </div>
  );
}
