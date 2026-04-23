import { skills } from "~metadata/resume";

function ResumeSkills() {
  return (
    <section className="flex flex-col">
      <h1>Skills</h1>
      {skills.map((skill, index) => (
        <div key={index} className="flex flex-col">
          <h3>{skill.name}</h3>
          <ul>
            {skill.detail.map((item, index) => (
              <li
                key={index}
                className="p-0 m-0"
                dangerouslySetInnerHTML={{ __html: item }}
              />
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

export default ResumeSkills;
