import { execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "node:url";

const PARENT_DIRECTORY_NOTATION = "../";
const BUNDLED_DEPENDENCY = "@emurgo/cardano-serialization-lib-browser";
const PACKAGE_JSON = "package.json";
const __dirname = dirname(fileURLToPath(import.meta.url));
const packageJsonPath = resolve(__dirname, PARENT_DIRECTORY_NOTATION, PACKAGE_JSON);
const oldPackageJsonContent = readFileSync(packageJsonPath, "utf8");
const updatedPackageJsonContent = JSON.parse(oldPackageJsonContent);
delete updatedPackageJsonContent.dependencies[BUNDLED_DEPENDENCY];
writeFileSync(packageJsonPath, JSON.stringify(updatedPackageJsonContent, null, 2), "utf8");
const args = process.argv.slice(2).join(" ");

try {
  execSync(`npm publish --registry https://registry.npmjs.org ${args}`, { stdio: "inherit" });
} catch (error) {
  console.error("Publishing failed:", error);
}

writeFileSync(packageJsonPath, oldPackageJsonContent);
