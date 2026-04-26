import prompts from "prompts";
import chalk from "chalk";

export interface UserInput {
  projectName: string;
  title: string;
  description: string;
  authorName: string;
  language: string;
  primaryColor: string;
  platform: "vercel" | "other";
}

function colorSwatch(hex: string, name: string): string {
  return `${chalk.bgHex(hex)("   ")} ${name.padEnd(10)} ${chalk.dim(hex)}`;
}

const COLOR_PRESETS = [
  { title: colorSwatch("#1ed760", "Emerald"), value: "#1ed760" },
  { title: colorSwatch("#2563eb", "Cobalt"), value: "#2563eb" },
  { title: colorSwatch("#ff0369", "Rose"), value: "#ff0369" },
  { title: colorSwatch("#e50914", "Crimson"), value: "#e50914" },
  { title: colorSwatch("#7c3aed", "Violet"), value: "#7c3aed" },
  { title: colorSwatch("#f59e0b", "Amber"), value: "#f59e0b" },
  { title: colorSwatch("#06b6d4", "Cyan"), value: "#06b6d4" },
  { title: "✎  Custom hex", value: "custom" },
];

export async function getUserInput(): Promise<UserInput | null> {
  const response = await prompts(
    [
      {
        type: "text",
        name: "projectName",
        message: "Project name:",
        initial: "my-blog",
        validate: (value: string) =>
          value.trim() ? true : "Project name is required",
      },
      {
        type: "text",
        name: "title",
        message: "Blog title:",
        initial: "My Blog",
      },
      {
        type: "text",
        name: "description",
        message: "Blog description:",
        initial: "A blog powered by next-log",
      },
      {
        type: "text",
        name: "authorName",
        message: "Author name:",
        initial: "Author",
      },
      {
        type: "select",
        name: "language",
        message: "Language:",
        choices: [
          { title: "English", value: "en" },
          { title: "한국어", value: "ko" },
          { title: "日本語", value: "ja" },
          { title: "中文", value: "zh" },
        ],
      },
      {
        type: "select",
        name: "colorChoice",
        message: "Primary color:",
        choices: COLOR_PRESETS,
        initial: 1,
      },
      {
        type: (prev: string) => (prev === "custom" ? "text" : null),
        name: "customColor",
        message: "Enter hex color (e.g. #ff6347):",
        validate: (value: string) =>
          /^#[0-9a-fA-F]{6}$/.test(value) ? true : "Invalid hex color",
      },
      {
        type: "select",
        name: "platform",
        message: "Deploy platform:",
        choices: [
          { title: "Vercel", value: "vercel" },
          { title: "Other", value: "other" },
        ],
      },
    ],
    { onCancel: () => process.exit(0) }
  );

  if (!response.projectName) return null;

  return {
    projectName: response.projectName,
    title: response.title,
    description: response.description,
    authorName: response.authorName,
    language: response.language,
    primaryColor:
      response.colorChoice === "custom"
        ? response.customColor
        : response.colorChoice,
    platform: response.platform,
  };
}
