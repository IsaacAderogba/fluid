import path from "path";
import { defineConfig } from "vite";

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "Fluid",
      fileName: format => `index.${format}.js`,
      formats: ["es", "cjs"],
    },
  },
});
