import { Link } from "react-router-dom";
import { Button } from "ui/button";

export function TooSmallScreen() {
  return (
    <div className="bg-background text-foreground fixed inset-0 flex h-dvh w-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <h2 className="text-primary mb-4 text-3xl font-bold">Screen Too Small</h2>

      <p className="text-muted-foreground mb-6 max-w-sm">
        This visualizer works best on a larger screen or in landscape mode.
        Please rotate your device or visit from a computer.
      </p>

      <Button asChild variant="outline">
        <Link to="/about">Learn More</Link>
      </Button>
    </div>
  );
}
