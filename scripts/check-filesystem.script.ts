import { readdirSync, statSync } from "node:fs";
import path from "node:path";

const KEBAB_CASE_REGEX = /^(?!.*-\.)[a-z0-9]+(-[a-z0-9]+)*(?:\.[a-z0-9]+(-[a-z0-9]+)*)*\.ts$/;
const DRIZZLE_MIGRATIONS_DIRECTORY_NAME = "migrations";

function checkFilesystem(directory: string) {
  const files = readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      if (file === DRIZZLE_MIGRATIONS_DIRECTORY_NAME) {
        continue;
      }

      checkFilesystem(fullPath);
    } else {
      if (!KEBAB_CASE_REGEX.test(file)) {
        throw new Error(`❌ Invalid file name: ${fullPath}`);
      }
    }
  }
}

checkFilesystem("src");
