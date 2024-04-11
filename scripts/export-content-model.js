require("dotenv").config({ path: ".env.local" });

const execSync = require("child_process").execSync;
const path = require("path");
const process = require("process");
const fs = require("fs");

function getBinFile(cmd) {
  return path.join("node_modules", ".bin", cmd);
}

if (
  !process.env.CONTENTFUL_SPACE_ID ||
  !process.env.CONTENTFUL_MANAGEMENT_TOKEN ||
  !process.env.CONTENTFUL_ENVIRONMENT_ID
) {
  console.error("Couldn't load env");
  process.exit(1);
}

if (process.argv.length !== 3) {
  console.error(`Usage: node ${process.argv[1].split("/").at(-1)} <file.json>`);
  process.exit(1);
}

const filePath = process.argv[2];

fs.accessSync(filePath, fs.constants.F_OK | fs.constants.W_OK, (err) => {
  if (err) {
    console.error(`${filePath} is not writable`);
    process.exit(1);
  }
});

console.log("Exporting content model...\n");

execSync(
  `${getBinFile("contentful")} space export --spaceId ${
    process.env.CONTENTFUL_SPACE_ID
  } --management-token ${
    process.env.CONTENTFUL_MANAGEMENT_TOKEN
  } --environment-id ${
    process.env.CONTENTFUL_ENVIRONMENT_ID
  } --content-file ${filePath} --skip-content --skip-roles --skip-webhooks`,
  { stdio: [0, 1, 2] }
);

console.log("\nFormatting exported file...\n");

execSync(`${getBinFile("prettier")} --write ${filePath}`, {
  stdio: [0, 1, 2],
});

console.log("\nDone.");
