import ResumeExprience from "~feature/resume/ResumeExprience";
import ResumeSkills from "~feature/resume/ResumeSkkils";
import { resumeInfo } from "~metadata/resume";

function Resume() {
  return (
    <div className="prose dark:prose-invert flex flex-col gap-12 md:gap-20 pt-12 w-full md:w-[900px] m-auto px-4 md:px-0">
      <section className="flex flex-col">
        <h1 className="mb-4">{resumeInfo.name}</h1>
        <h2 className="mt-0">{resumeInfo.job}</h2>
        <p
          className="m-0"
          dangerouslySetInnerHTML={{ __html: resumeInfo.summary }}
        />
      </section>
      <ResumeExprience />
      <ResumeSkills />
    </div>
  );
}

export default Resume;
