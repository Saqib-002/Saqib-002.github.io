import '../assets/styles/Skills.css';

export default function Skills({ skills }) {
  if (!skills) return null;

  return (
    <section
      className="animate-slide-in-up"
      style={{ '--delay': '0.8s' }}
      id="skills-matrix-section"
    >
      <div className="hud-panel skills-matrix">
        <h3>&gt; saqib/skills</h3>
        <div className="skills" id="skills-matrix">
          {skills.map((skillCat, catIndex) => (
            <div key={catIndex} className="skills-cat">
              <h4>[{skillCat.category}]</h4>
              <div className="skill-item">
                {skillCat.items.map((skill, skillIndex) => {
                  const delay = 0.8 + catIndex * 0.1 + skillIndex * 0.05;
                  return (
                    <div
                      key={skillIndex}
                      className="skill-tag animate-slide-in-up"
                      style={{ '--delay': `${delay}s` }}
                    >
                      {skill}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
