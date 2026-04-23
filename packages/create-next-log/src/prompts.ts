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
  { title: "Green", value: "#1db954" },
  { title: "Blue", value: "#2563eb" },
  { title: "Purple", value: "#7c3aed" },
  { title: "Orange", value: "#ea580c" },
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
