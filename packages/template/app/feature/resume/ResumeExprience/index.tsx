import { resumeInfo } from "~metadata/resume";

function ResumeExprience() {
  return (
    <section className="flex flex-col">
      <h1>Exprience</h1>
      {resumeInfo.experience.map((exp, index) => (
        <ul className="list-none p-0" key={index}>
          <li className="flex flex-col md:flex-row p-0 gap-4">
            <div className="relative flex-none md:flex-[3_1_0%] pr-0 md:pr-4">
              <div className="md:sticky md:top-[80px]">
                <h3 className="mt-0">{exp.company}</h3>
                <h4 className="mt-0">{exp.period}</h4>
                <h4 className="mt-0">{exp.position}</h4>
                <p dangerouslySetInnerHTML={{ __html: exp.summary }} />
              </div>
            </div>
            <div className="relative flex-[7_1_0%]">
              {exp.projects.map((project, projIndex) => (
                <div key={projIndex} className="mb-8">
                  <h4 className="m-0">{project.name}</h4>
                  <p>{project.duration}</p>
                  <p
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />
                  <ul className="m-0 p-0">
                    {project.responsibilities?.map(
                      (responsibility, respIndex) => (
                        <li
                          key={respIndex}
                          className="ml-4"
                          dangerouslySetInnerHTML={{ __html: responsibility }}
                        />
                      )
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </li>
        </ul>
      ))}
    </section>
  );
}

export default ResumeExprience;
