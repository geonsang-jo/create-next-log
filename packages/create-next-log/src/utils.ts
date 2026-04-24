import fs from "fs-extra";
import path from "path";

export function detectPackageManager(): "npm" | "yarn" | "pnpm" {
  const userAgent = process.env.npm_config_user_agent || "";
  if (userAgent.startsWith("yarn")) return "yarn";
  if (userAgent.startsWith("pnpm")) return "pnpm";
  return "npm";
}

export function getInstallCommand(pm: "npm" | "yarn" | "pnpm"): string {
  switch (pm) {
    case "yarn": return "yarn install";
    case "pnpm": return "pnpm install";
    default: return "npm install";
  }
}

export function getRunCommand(pm: "npm" | "yarn" | "pnpm", script = "dev"): string {
  switch (pm) {
    case "yarn": return `yarn ${script}`;
    case "pnpm": return `pnpm ${script}`;
    default: return `npm run ${script}`;
  }
}

function escapeString(str: string): string {
  return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

export function generateConfig(input: {
  title: string;
  description: string;
  authorName: string;
  primaryColor: string;
}): string {
  const title = escapeString(input.title);
  const description = escapeString(input.description);
  const authorName = escapeString(input.authorName);

  return `const config = {
  title: "${title}",
  description: "${description}",
  url: "https://example.com",

  author: {
    name: "${authorName}",
  },

  social: {
    github: "",
    linkedin: "",
  },

  theme: {
    primaryColor: "${input.primaryColor}",
  },

  googleVerification: "",
  googleAnalyticsId: "",
};

export default config;
`;
}
