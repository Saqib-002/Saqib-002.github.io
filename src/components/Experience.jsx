import React from 'react';
import './Experience.css';

export default function Experience({ experience }) {
  if (!experience) return null;

  return (
    <section className="animate-slide-in-up" id="experience" style={{ '--delay': '0.4s' }}>
      <div className="hud-panel experiences">
        <h3>&gt; saqib/experience</h3>
        <div className="experience-items" id="experience-list">
          {experience.map((exp, index) => {
            const delay = 0.4 + index * 0.2;
            return (
              <div
                key={index}
                className="experience-item hud-panel animate-slide-in-up"
                style={{ '--delay': `${delay}s` }}
              >
                <div className="experience-title">
                  <h4>{exp.title}</h4>
                </div>
                <p className="experience-institute">{exp.company}</p>
                <p className="experience-timeline">{exp.timeline}</p>
                <p className="experience-description">{exp.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
