#!/usr/bin/env node

import path from "path";
import fs from "fs-extra";
import chalk from "chalk";
import { execSync } from "child_process";
import { getUserInput } from "./prompts";
import {
  detectPackageManager,
  getInstallCommand,
  getRunCommand,
  generateConfig,
} from "./utils";

async function main() {
  console.log(chalk.bold("\n  create-next-log\n"));

  const input = await getUserInput();
  if (!input) {
    console.log("Cancelled.");
    return;
  }

  const projectDir = path.resolve(process.cwd(), input.projectName);

  if (fs.existsSync(projectDir)) {
    console.error(
      chalk.red(`Error: Directory "${input.projectName}" already exists.`)
    );
    process.exit(1);
  }

  // Copy template
  const templateDir = path.join(__dirname, "..", "template");
  console.log(chalk.dim("  Copying template..."));
  fs.copySync(templateDir, projectDir, {
    filter: (src: string) => {
      const basename = path.basename(src);
      return !["node_modules", ".next", ".git", ".env", ".env.local", ".env.production"].includes(basename);
    },
  });

  // Write config
  const configPath = path.join(projectDir, "next-log.config.ts");
  fs.writeFileSync(configPath, generateConfig(input));

  // Add Vercel analytics if selected
  if (input.platform === "vercel") {
    const pkgPath = path.join(projectDir, "package.json");
    const pkg = fs.readJsonSync(pkgPath);
    pkg.dependencies = pkg.dependencies || {};
    pkg.dependencies["@vercel/analytics"] = "^2.0.0";
    fs.writeJsonSync(pkgPath, pkg, { spaces: 2 });

    // Add Analytics import to layout
    const layoutPath = path.join(projectDir, "app", "layout.tsx");
    let layout = fs.readFileSync(layoutPath, "utf8");
    layout = `import { Analytics } from "@vercel/analytics/next";\n${layout}`;
    layout = layout.replace(
      "</body>",
      "        <Analytics />\n      </body>"
    );
    fs.writeFileSync(layoutPath, layout);
  }

  // Install dependencies
  const pm = detectPackageManager();
  console.log(chalk.dim(`  Installing dependencies with ${pm}...`));
  try {
    execSync(getInstallCommand(pm), {
      cwd: projectDir,
      stdio: "inherit",
    });
  } catch {
    console.log(
      chalk.yellow(
        `  Warning: Failed to install dependencies. Run "${getInstallCommand(pm)}" manually.`
      )
    );
  }

  // Done
  console.log(chalk.green("\n  Success!") + " Your blog is ready.\n");
  console.log(`  ${chalk.dim("cd")} ${input.projectName}`);
  console.log(`  ${chalk.dim(getRunCommand(pm))}\n`);
}

main().catch(console.error);
