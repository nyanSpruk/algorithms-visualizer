import { useMemo, useState } from "react";
import {
  algorithmRegistry,
  getAlgorithmsByCategory,
  type AlgorithmId,
} from "@/lib/algorithms/registry";
import { Sidebar } from "@/visualizer/Sidebar";
import { Button } from "../ui/button";

const groupedAlgorithms = getAlgorithmsByCategory();
const algorithmIds = Object.keys(algorithmRegistry) as AlgorithmId[];
const defaultAlgorithmId = (algorithmIds[0] ?? "bubblesort") as AlgorithmId;

export function VisualizerLayout() {
  const [selectedId, setSelectedId] = useState<AlgorithmId>(defaultAlgorithmId);
  const selectedAlgorithm = useMemo(
    () => algorithmRegistry[selectedId],
    [selectedId],
  );

  const isPlaying = false;

  return (
    <div className="bg-background flex h-full">
      <Sidebar
        groupedAlgorithms={groupedAlgorithms}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />

      <section className="bg-muted/20 flex flex-1 flex-col gap-6 overflow-y-auto px-4 py-6 lg:px-8">
        <div className="bg-card/70 rounded-2xl border p-6 shadow-sm">
          <p className="text-primary text-sm font-semibold tracking-wide uppercase">
            {selectedAlgorithm.category}
          </p>
          <h1 className="text-foreground mt-2 text-3xl font-bold">
            {selectedAlgorithm.name}
          </h1>
          <p className="text-muted-foreground mt-3 max-w-3xl text-base leading-relaxed">
            {selectedAlgorithm.description}
          </p>
        </div>

        <div className="gap-4 lg:grid lg:grid-cols-[minmax(320px,380px)_1fr]">
          <div className="flex flex-col gap-4">
            <div className="bg-card/60 rounded-2xl border p-4 shadow-sm">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    size="sm"
                    variant={isPlaying ? "destructive" : "default"}
                  >
                    {isPlaying ? "Pause autoplay" : "Play all"}
                  </Button>
                  <Button size="sm" variant="outline">
                    Previous
                  </Button>
                  <Button size="sm" variant="outline">
                    Next
                  </Button>
                  <Button size="sm" variant="destructive" className="ml-auto">
                    Reset
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-card/60 rounded-2xl border p-4 shadow-sm">
              <div className="space-y-4">
                <div>
                  <label className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                    Navigate steps
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={10}
                    className="accent-primary mt-2 w-full"
                  />
                </div>
                <div>
                  <label className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                    Speed
                  </label>
                  <input
                    type="range"
                    min={200}
                    max={2000}
                    step={100}
                    className="accent-primary mt-2 w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background/60 min-h-130 flex-1 rounded-3xl border p-4 shadow-inner">
            <div className="bg-background h-full w-full rounded-2xl border"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
