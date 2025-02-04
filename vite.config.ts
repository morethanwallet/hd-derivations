import { dirname, resolve, extname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv, type ConfigEnv } from "vite";
import wasm from "vite-plugin-wasm";
import dts from "vite-plugin-dts";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { globSync } from "glob";
// TODO: Add "rollup-plugin-typescript2" plugin when get network is fixed
// import typescript from "rollup-plugin-typescript2";

const __dirname = dirname(fileURLToPath(import.meta.url));

const config = ({ mode }: ConfigEnv): ReturnType<typeof defineConfig> => {
  const { VITE_ENVIRONMENT } = loadEnv(mode, process.cwd());
  const isNode = VITE_ENVIRONMENT === "node";
  const outDir = resolve(__dirname, isNode ? "build/node" : "build/browser");

  return defineConfig({
    plugins: [
      wasm(),
      dts({
        insertTypesEntry: true,
        exclude: ["src/__tests__/**/*", "src/**/*.test.ts"],
        tsconfigPath: "tsconfig.build.json",
      }),
      nodePolyfills(),
      //  typescript()
    ],
    resolve: {
      alias: [
        { find: "@", replacement: resolve(__dirname, "src") },
        {
          find: "@emurgo/cardano-serialization-lib-nodejs",
          replacement: isNode
            ? resolve(__dirname, "node_modules/@emurgo/cardano-serialization-lib-nodejs")
            : resolve(__dirname, "node_modules/@emurgo/cardano-serialization-lib-browser"),
        },
      ],
    },
    build: {
      outDir,
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        name: "hd-derivations",
        formats: ["es"],
      },
      rollupOptions: {
        input: Object.fromEntries(
          globSync(["src/**/*.ts"], {
            ignore: ["src/**/*.d.ts", "src/__tests__/**/*", "src/**/*.test.ts"],
          }).map((file) => {
            return [
              relative("src", file.slice(0, file.length - extname(file).length)),
              fileURLToPath(new URL(file, import.meta.url)),
            ];
          }),
        ),
        output: {
          entryFileNames: "[name].js",
        },
      },
      target: "esnext",
      minify: false,
    },
  });
};

export default config;
