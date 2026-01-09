import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import {
  algorithmRegistry,
  getAlgorithmsByCategory,
  type AlgorithmId,
} from "@/lib/algorithms/registry";
import { Sidebar } from "@/components/visualization/Sidebar";
import { Button } from "../ui/button";
import { VisualizationCanvas } from "@/components/visualization/VisualizationCanvas";
import { AlgorithmPresetPicker } from "@/components/visualization/AlgorithmPresetPicker";
import type { VisualizationStep } from "@/lib/algorithms/types";

const groupedAlgorithms = getAlgorithmsByCategory();
const algorithmIds = Object.keys(algorithmRegistry) as AlgorithmId[];
const defaultAlgorithmId = (algorithmIds[0] ?? "bubblesort") as AlgorithmId;

export function VisualizerLayout() {
  const [selectedId, setSelectedId] = useState<AlgorithmId>(defaultAlgorithmId);
  const selectedAlgorithm = useMemo(
    () => algorithmRegistry[selectedId],
    [selectedId],
  );

  const [presetSelections, setPresetSelections] = useState<
    Partial<Record<AlgorithmId, string>>
  >(() => {
    const initialAlgorithm = algorithmRegistry[defaultAlgorithmId];
    return initialAlgorithm
      ? {
          [defaultAlgorithmId]: initialAlgorithm.presets[0]?.id ?? "",
        }
      : {};
  });

  const activePresetId =
    presetSelections[selectedId] ?? selectedAlgorithm.presets[0]?.id ?? "";

  const activePreset = useMemo(
    () =>
      selectedAlgorithm.presets.find(
        (preset) => preset.id === activePresetId,
      ) ?? null,
    [selectedAlgorithm, activePresetId],
  );

  const visualizationSteps = useMemo<VisualizationStep[]>(() => {
    const input = activePreset?.value ?? selectedAlgorithm.defaultInput;
    if (selectedAlgorithm.buildVisualizationSteps) {
      return selectedAlgorithm.buildVisualizationSteps(input);
    }
    const state = selectedAlgorithm.buildVisualization(input);
    return [
      {
        id: "static-visualization",
        label: "Initial",
        state,
      },
    ];
  }, [selectedAlgorithm, activePreset]);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(900);
  const animationBufferMs = 450;

  const stepCount = visualizationSteps.length;
  const hasSteps = stepCount > 0;
  const canPlayback = stepCount > 1;
  const activeStep = visualizationSteps[currentStepIndex] ?? null;
  const visualizationState = activeStep?.state ?? null;
  const speedLabel =
    playbackSpeed <= 500
      ? "Fast"
      : playbackSpeed <= 900
        ? "Normal"
        : playbackSpeed <= 1400
          ? "Slow"
          : "Very slow";

  useEffect(() => {
    if (!isPlaying || !canPlayback) return;
    const isAtEnd = currentStepIndex >= stepCount - 1;
    const timer = window.setTimeout(() => {
      if (isAtEnd) {
        setIsPlaying(false);
        return;
      }

      setCurrentStepIndex((previous) => {
        const nextIndex = Math.min(previous + 1, stepCount - 1);
        if (nextIndex >= stepCount - 1) {
          setIsPlaying(false);
        }
        return nextIndex;
      });
    }, isAtEnd ? 0 : playbackSpeed + animationBufferMs);

    return () => window.clearTimeout(timer);
  }, [isPlaying, canPlayback, currentStepIndex, stepCount, playbackSpeed]);

  function handlePresetSelect(presetId: string) {
    setCurrentStepIndex(0);
    setIsPlaying(false);
    setPresetSelections((previous) => ({
      ...previous,
      [selectedId]: presetId,
    }));
  }

  function handleAlgorithmSelect(id: AlgorithmId) {
    setCurrentStepIndex(0);
    setIsPlaying(false);
    setSelectedId(id);
    setPresetSelections((previous) => {
      if (previous[id]) return previous;
      const nextAlgorithm = algorithmRegistry[id];
      const nextPresetId = nextAlgorithm.presets[0]?.id ?? "";
      return { ...previous, [id]: nextPresetId };
    });
  }

  function handlePlayToggle() {
    if (!canPlayback) return;
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    if (currentStepIndex >= stepCount - 1) {
      setCurrentStepIndex(0);
    }
    setIsPlaying(true);
  }

  function handlePreviousStep() {
    setIsPlaying(false);
    setCurrentStepIndex((previous) => Math.max(previous - 1, 0));
  }

  function handleNextStep() {
    setIsPlaying(false);
    setCurrentStepIndex((previous) => Math.min(previous + 1, stepCount - 1));
  }

  function handleReset() {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  }

  function handleStepScrub(event: ChangeEvent<HTMLInputElement>) {
    const nextIndex = Number(event.target.value);
    setIsPlaying(false);
    setCurrentStepIndex(nextIndex);
  }

  function handleSpeedChange(event: ChangeEvent<HTMLInputElement>) {
    setPlaybackSpeed(Number(event.target.value));
  }

  const fitViewKey = `${selectedId}-${activePresetId}`;
  return (
    <div className="bg-background flex h-full">
      <Sidebar
        groupedAlgorithms={groupedAlgorithms}
        selectedId={selectedId}
        onSelect={handleAlgorithmSelect}
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

        <div className="flex flex-col gap-4">
          <div className="gap-4 lg:grid lg:grid-cols-[minmax(600px,380px)_1fr]">
            <div className="bg-card/60 rounded-2xl border p-4 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                    Presets
                  </label>
                </div>

                <AlgorithmPresetPicker
                  presets={selectedAlgorithm.presets}
                  activePresetId={activePresetId}
                  onSelect={handlePresetSelect}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-card/60 rounded-2xl border p-4 shadow-sm">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      size="sm"
                      variant={isPlaying ? "destructive" : "default"}
                      onClick={handlePlayToggle}
                      disabled={!canPlayback}
                    >
                      {isPlaying ? "Pause autoplay" : "Play all"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handlePreviousStep}
                      disabled={!canPlayback || currentStepIndex === 0}
                    >
                      Previous
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleNextStep}
                      disabled={
                        !canPlayback || currentStepIndex >= stepCount - 1
                      }
                    >
                      Next
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="ml-auto"
                      onClick={handleReset}
                      disabled={!hasSteps}
                    >
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
                      max={Math.max(stepCount - 1, 0)}
                      step={1}
                      value={
                        stepCount
                          ? Math.min(currentStepIndex, stepCount - 1)
                          : 0
                      }
                      onChange={handleStepScrub}
                      disabled={!canPlayback}
                      className="accent-primary mt-2 w-full"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <label className="text-muted-foreground font-semibold tracking-wide uppercase">
                        Speed
                      </label>
                      <span className="text-muted-foreground">
                        {speedLabel} · {playbackSpeed}ms
                      </span>
                    </div>
                    <input
                      type="range"
                      min={200}
                      max={2000}
                      step={100}
                      value={playbackSpeed}
                      onChange={handleSpeedChange}
                      disabled={!canPlayback}
                      className="accent-primary mt-2 w-full"
                    />
                    <div className="text-muted-foreground flex items-center justify-between text-[0.65rem] tracking-wide uppercase">
                      <span>Slower</span>
                      <span>Faster</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background/60 min-h-130 rounded-3xl border p-4 shadow-sm">
            <VisualizationCanvas
              visualization={visualizationState}
              fitViewKey={fitViewKey}
              isPlaying={isPlaying}
              stepLabel={activeStep?.label}
              stepDescription={activeStep?.description}
              stepCount={stepCount}
              stepIndex={currentStepIndex}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
