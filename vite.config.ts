import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      components: path.resolve(__dirname, "./src/components"),
      ui: path.resolve(__dirname, "./src/components/ui"),
      lib: path.resolve(__dirname, "./src/lib"),
      utils: path.resolve(__dirname, "./src/lib/utils"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      interfaces: path.resolve(__dirname, "./src/interfaces"),
      data: path.resolve(__dirname, "./src/data"),
      pages: path.resolve(__dirname, "./src/pages"),
    },
  },
});
