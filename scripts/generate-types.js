require("dotenv").config({ path: ".env.local" });

const execSync = require("child_process").execSync;
const path = require("path");
const { exit } = require("process");

const typesDir = "src/generated/contentful";

function getBinFile(cmd) {
  return path.join("node_modules", ".bin", cmd);
}

if (
  !process.env.CONTENTFUL_SPACE_ID ||
  !process.env.CONTENTFUL_MANAGEMENT_TOKEN ||
  !process.env.CONTENTFUL_ENVIRONMENT_ID
) {
  console.error("Couldn't load env");

  exit(1);
}

console.log("Generating types...\n");

execSync(
  `${getBinFile("cf-content-types-generator")} --spaceId ${
    process.env.CONTENTFUL_SPACE_ID
  } --token ${process.env.CONTENTFUL_MANAGEMENT_TOKEN} --environment ${
    process.env.CONTENTFUL_ENVIRONMENT_ID
  } -o ${typesDir} -X -d -g`,
  { stdio: [0, 1, 2] }
);

console.log("\nFormatting generated files...\n");

execSync(`${getBinFile("prettier")} --write ${typesDir}`, { stdio: [0, 1, 2] });

console.log("\nDone.");
