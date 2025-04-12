import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [tailwindcss(), react()],
    server: {
      proxy: {
        "/api": {
          target:
            mode === "development"
              ? process.env.VITE_DEVELOPMENT_URL
              : process.env.VITE_PRODUCTION_URL,
          changeOrigin: true,
        },
      },
    },
  };
});
