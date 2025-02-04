import fs from "fs";
import { dirname, resolve, join } from "path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageJsonPath = resolve(__dirname, "package.json");
const packageJsonContent = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const newPackageJsonContent = { ...packageJsonContent };
delete newPackageJsonContent.dependencies;
delete newPackageJsonContent.devDependencies;
const outputDir = resolve(__dirname, "build");
const newPackageJsonPath = join(outputDir, "package.json");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(newPackageJsonPath, JSON.stringify(newPackageJsonContent, null, 2), "utf8");
