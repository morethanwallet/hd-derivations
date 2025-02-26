import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  test: {
    globals: true,
    include: ["./src/**/*.{test,spec}.ts"],
    exclude: ["node_modules/*"],
    coverage: {
      provider: "istanbul",
    },
    server: {
      deps: {
        inline: ["ecpair"],
      },
    },
  },
  plugins: [tsconfigPaths()],
});
