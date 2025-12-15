import "./App.css";
import { Button } from "ui/button";

function App() {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold text-blue-500">Tailwind is working</h1>
      <Button onClick={() => alert("Shadcn Button Works!")}>Click Me</Button>
    </div>
  );
}

export default App;
