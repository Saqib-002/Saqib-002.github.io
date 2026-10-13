import { useState } from 'react';
import { Minus } from 'lucide-react';
import '../assets/styles/Skills.css';
import TechTag from './TechTag';

export default function Skills({ skills }) {
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  if (!skills) return null;

  const toggleCategory = (category) => {
    setExpandedCategories(previous => {
      const next = new Set(previous);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  };

  return (
    <section
      className="animate-slide-in-up"
      style={{ '--delay': '0.8s' }}
      id="skills-matrix-section"
    >
      <div className="hud-panel skills-matrix skills-container">
        <h3>&gt; saqib/skills</h3>
        <div className="skills" id="skills-matrix">
          {skills.map((skillCat, catIndex) => {
            const expanded = expandedCategories.has(skillCat.category);
            const previewCount = 5;
            const hiddenCount = Math.max(0, skillCat.items.length - previewCount);
            const visibleSkills = expanded ? skillCat.items : skillCat.items.slice(0, previewCount);
            const listId = `skill-category-${catIndex}`;

            return (
              <div key={skillCat.category} className="skills-cat">
                <h4 id={`${listId}-heading`}>{skillCat.category}</h4>
                <div className="skill-item" id={listId} role="group" aria-labelledby={`${listId}-heading`}>
                  {visibleSkills.map(skill => <TechTag key={skill} name={skill} />)}
                  {hiddenCount > 0 && (
                    <button
                      type="button"
                      className="skills-toggle"
                      aria-expanded={expanded}
                      aria-controls={listId}
                      aria-label={`${expanded ? 'Show fewer' : 'Show all'} ${skillCat.category.toLowerCase()} skills`}
                      onClick={() => toggleCategory(skillCat.category)}
                    >
                      {expanded ? <Minus size={16} aria-hidden="true" style={{ display: 'block' }} /> : `+${hiddenCount}`}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
