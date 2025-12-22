import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { RootLayout } from "./components/layout/RootLayout";
import Home from "pages/Home";
import About from "pages/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/visualizer" element={<div>TODO Visualizer</div>} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
