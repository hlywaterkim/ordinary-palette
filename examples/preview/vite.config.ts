import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

const workspaceRoot = fileURLToPath(new URL("../..", import.meta.url));

export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  server: {
    host: "0.0.0.0",
    port: 43123,
    strictPort: true,
    fs: {
      allow: [workspaceRoot],
    },
  },
});
