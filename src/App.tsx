import { Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import type { PreloadedState } from "@/types";

interface AppProps {
  preloadedState?: PreloadedState;
}

export default function App({ preloadedState }: AppProps) {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage preloadedState={preloadedState} />}
      />
      {/* Add more routes here as the site grows */}
    </Routes>
  );
}
