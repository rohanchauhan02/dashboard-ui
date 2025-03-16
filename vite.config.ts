import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

// Convert the file URL to a directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:11001", // Backend API URL
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ""), // Remove /api prefix
  //     },
  //   },
  // },
  plugins: [
    react(), // Enable React support
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Map "@" to the "src" directory
    },
  },
  root: __dirname, // Set the root directory to the project root
  build: {
    outDir: path.resolve(__dirname, "dist"), // Output to the "dist" directory
    emptyOutDir: true, // Clear the output directory before building
  },
});
