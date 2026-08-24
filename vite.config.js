import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
  ],
  server: {
    // Native fs.watch on Windows throws EBUSY (crashing the whole dev
    // server) when something else briefly locks a file under public/ —
    // e.g. OneDrive sync or an image editor mid-save. Polling avoids that.
    watch: {
      usePolling: true,
    },
  },
});
