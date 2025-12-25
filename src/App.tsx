import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@xyflow/react/dist/style.css";
import "./App.css";
import { RootLayout } from "./components/layout/RootLayout";
import Home from "pages/Home";
import About from "pages/About";
import { VisualizerLayout } from "./components/layout/VisualizerLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/visualizer" element={<VisualizerLayout />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
