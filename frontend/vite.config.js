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
              : `http://ec2-98-81-123-148.compute-1.amazonaws.com:3000/api/v1`,
          changeOrigin: true,
        },
      },
    },
  };
});
