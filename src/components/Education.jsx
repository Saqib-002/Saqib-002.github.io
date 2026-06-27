import '../assets/styles/Education.css';

export default function Education({ education }) {
  if (!education) return null;

  return (
    <section className="animate-slide-in-up" id="education" style={{ '--delay': '1s' }}>
      <div className="hud-panel education">
        <h3>&gt; saqib/education</h3>
        <div id="education-list" className="education-items">
          {education.map((edu, index) => (
            <div key={index} className="education-item">
              <h4 className="education-title">{edu.degree}</h4>
              <p className="education-institute">{edu.institute}</p>
              <p className="education-timeline">
                {edu.timeline}
                {edu.marks && (
                  <>
                    {' • '}
                    {edu.isGpa ? 'CGPA' : 'Marks'}:{' '}
                    <span className="education-metric-highlight">{edu.marks}</span>
                  </>
                )}
              </p>
              {edu.award && <div className="education-gold-badge">{edu.award}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
