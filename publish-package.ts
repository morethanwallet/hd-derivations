import { execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "node:url";

const PACKAGE_JSON = "package.json";
const __dirname = dirname(fileURLToPath(import.meta.url));
const packageJsonPath = resolve(__dirname, PACKAGE_JSON);
const oldPackageJsonContent = JSON.parse(readFileSync(packageJsonPath, "utf8"));
const updatedPackageJsonContent = { ...oldPackageJsonContent };
delete updatedPackageJsonContent.dependencies;
delete updatedPackageJsonContent.devDependencies;
writeFileSync(packageJsonPath, JSON.stringify(updatedPackageJsonContent, null, 2), "utf8");
const args = process.argv.slice(2).join(" ");

try {
  execSync(`npm publish ${args}`, { stdio: "inherit" });
} catch (error) {
  console.error("Publishing failed:", error);
}

writeFileSync(packageJsonPath, JSON.stringify(oldPackageJsonContent, null, 2), "utf8");
