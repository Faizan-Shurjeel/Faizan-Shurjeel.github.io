import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Deployed at the domain root as a GitHub Pages user site, so base stays "/".
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      output: {
        // Split the two big vendors so a change to either one doesn't
        // invalidate the other's cached chunk on repeat visits. Rolldown
        // (Vite 8) only accepts the function form here.
        manualChunks: (id) => {
          if (id.includes("node_modules/gsap") || id.includes("@gsap/react")) {
            return "gsap";
          }
          if (id.includes("node_modules/react")) return "react";
          return undefined;
        },
      },
    },
  },
});
