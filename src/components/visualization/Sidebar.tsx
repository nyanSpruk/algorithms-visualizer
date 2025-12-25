import type { AlgorithmDefinition } from "lib/algorithms/types";
import type { AlgorithmId } from "lib/algorithms/registry";
import { Button } from "ui/button";
import { cn } from "lib/utils";

type AlgorithmSidebarProps = {
  groupedAlgorithms: Record<string, AlgorithmDefinition<unknown>[]>;
  selectedId: AlgorithmId;
  onSelect: (id: AlgorithmId) => void;
};

export function Sidebar({
  groupedAlgorithms,
  selectedId,
  onSelect,
}: AlgorithmSidebarProps) {
  return (
    <aside className="border-border/60 bg-muted/30 flex w-full flex-col gap-6 border-r p-6 lg:w-72">
      <div className="space-y-4 overflow-y-auto pr-2 pb-4">
        {Object.entries(groupedAlgorithms).map(([category, algorithms]) => (
          <section key={category} className="space-y-2">
            <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
              {category}
            </p>

            <div className="space-y-2">
              {algorithms.map((algorithm) => (
                <Button
                  key={algorithm.id}
                  variant={algorithm.id === selectedId ? "default" : "outline"}
                  className={cn(
                    "w-full justify-start text-left",
                    algorithm.id === selectedId
                      ? "shadow-lg"
                      : "border-dashed hover:border-solid",
                  )}
                  onClick={() => onSelect(algorithm.id as AlgorithmId)}
                >
                  <div>
                    <p className="font-semibold">{algorithm.name}</p>
                  </div>
                </Button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </aside>
  );
}
