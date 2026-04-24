# Resume Page

## Generate a resume page

```bash
npm run new-resume   # or: yarn new-resume
```

This generates two files:
- `app/resume/data.ts` — where you edit your resume content (experience, skills, projects, etc.)
- `app/resume/page.tsx` — the page component that renders your resume

## Auto-detection in navigation

The header navigation **automatically detects** the resume page — when `app/resume/page.tsx` exists, a "Resume" link appears. Delete the file to remove it.

## Customization

Edit `app/resume/data.ts` to update your resume content. The data file contains structured sections for experience, skills, and projects. The page component (`page.tsx`) reads from this data file, so you typically only need to modify `data.ts`.
