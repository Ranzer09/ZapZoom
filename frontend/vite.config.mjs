import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// Load environment variables from `.env` file
dotenv.config();

export default defineConfig({
  plugins: [react()],
  define: {
    // Expose Vite environment variables to the app
    'import.meta.env': process.env,
  },
  server: {
    open: true,
    port: 3000,
    proxy: {
      "/api": {
        target: process.env.VITE_API_URL, // Access the API URL from environment variables
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
});

