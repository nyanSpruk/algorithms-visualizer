import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="bg-background flex min-h-[calc(100vh-7rem)] flex-col items-center justify-center px-4 py-10 text-center">
      <h1 className="text-primary mb-4 text-4xl font-bold">
        Welcome to Algorithm Visualizer
      </h1>

      <p className="text-muted-foreground mb-8 max-w-2xl text-lg">
        Explore and understand common algorithms and data structures through
        interactive visualizations. Built for education — to make computer
        science concepts more intuitive and visually engaging.
      </p>

      <Link
        to="/visualizer"
        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-3 text-lg transition"
      >
        Start Visualizing →
      </Link>
    </main>
  );
}
