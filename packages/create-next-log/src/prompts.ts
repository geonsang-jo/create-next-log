import prompts from "prompts";

export interface UserInput {
  projectName: string;
  title: string;
  description: string;
  authorName: string;
  primaryColor: string;
  platform: "vercel" | "other";
}

const COLOR_PRESETS = [
  { title: "Emerald       #1ed760", value: "#1ed760" },
  { title: "Cobalt        #2563eb", value: "#2563eb" },
  { title: "Rose          #ff0369", value: "#ff0369" },
  { title: "Crimson       #e50914", value: "#e50914" },
  { title: "Violet        #7c3aed", value: "#7c3aed" },
  { title: "Amber         #f59e0b", value: "#f59e0b" },
  { title: "Cyan          #06b6d4", value: "#06b6d4" },
  { title: "Custom", value: "custom" },
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
        name: "colorChoice",
        message: "Primary color:",
        choices: COLOR_PRESETS,
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
    primaryColor:
      response.colorChoice === "custom"
        ? response.customColor
        : response.colorChoice,
    platform: response.platform,
  };
}
