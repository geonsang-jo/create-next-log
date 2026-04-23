#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const resumeDir = path.join(process.cwd(), "app", "resume");
const resumePath = path.join(resumeDir, "page.tsx");

if (fs.existsSync(resumePath)) {
  console.error("Error: Resume page already exists at app/resume/page.tsx");
  process.exit(1);
}

fs.mkdirSync(resumeDir, { recursive: true });

const template = `export default function ResumePage() {
  return (
    <section className="flex flex-col gap-12 pt-12 pb-14 w-full md:w-[900px] m-auto px-4 md:px-0">
      <header>
        <h1 className="text-3xl font-bold">Your Name</h1>
        <p className="text-muted-foreground mt-2">Your title or tagline</p>
      </header>

      {/* Experience */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Experience</h2>
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="font-medium">Company Name</h3>
            <p className="text-sm text-muted-foreground">Role &middot; 2023 - Present</p>
            <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground">
              <li>Achievement or responsibility</li>
              <li>Achievement or responsibility</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {["React", "TypeScript", "Next.js", "Tailwind CSS"].map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 text-sm rounded-full bg-muted text-muted-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Projects</h2>
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="font-medium">Project Name</h3>
            <p className="text-sm text-muted-foreground">
              Brief description of the project and your role.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
`;

fs.writeFileSync(resumePath, template);

console.log("Created: app/resume/page.tsx");
console.log("Resume link will automatically appear in the header navigation.");
console.log("Edit app/resume/page.tsx to add your information.");
