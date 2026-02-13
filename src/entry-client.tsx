import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/App";
import type { PreloadedState } from "@/types";
import "@/index.css";

/**
 * Client entry point.
 *
 * Reads the preloaded state that the server embedded into the HTML
 * (inside a <script> tag as window.__PRELOADED_STATE__), then hydrates
 * the React tree so it becomes interactive without re-rendering.
 */

// Grab SSR-injected state
const preloadedState: PreloadedState | undefined =
  typeof window !== "undefined"
    ? (window as unknown as { __PRELOADED_STATE__?: PreloadedState })
        .__PRELOADED_STATE__
    : undefined;

// Clean up to avoid leaking into other scripts
if (typeof window !== "undefined") {
  delete (window as unknown as { __PRELOADED_STATE__?: PreloadedState })
    .__PRELOADED_STATE__;
}

hydrateRoot(
  document.getElementById("root")!,
  <BrowserRouter>
    <App preloadedState={preloadedState} />
  </BrowserRouter>
);
