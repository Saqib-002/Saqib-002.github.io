import { useState, useEffect } from 'react';
import Carousel from './Carousel';
import '../assets/styles/ProjectModal.css';

export default function ProjectModal({ isOpen, project, onClose }) {
  // Store the active project to allow fade-out animations to complete with visible data
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    if (project) {
      setActiveProject(project);
    }
  }, [project]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!activeProject) return null;

  const { name, techStack, images, details, description } = activeProject;

  return (
    <div className={`modal ${isOpen ? 'active' : ''}`} id="project-modal">
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal-content hud-panel">
        <button className="modal-close" id="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-body">
          <Carousel images={images} projectName={name} />
          
          <div className="modal-text-content">
            <h2 id="modal-title">{name}</h2>
            <div className="project-tech" id="modal-tech">
              {techStack &&
                techStack.map((tag, i) => (
                  <div key={i} className="skill-tag">
                    {tag}
                  </div>
                ))}
            </div>
            
            <div id="modal-description">
              {details ? (
                <div className="modal-description">
                  <p>{details.description}</p>
                  <ul>
                    {details.points &&
                      details.points.map((point, i) => <li key={i}>{point}</li>)}
                  </ul>
                </div>
              ) : (
                <p>{description}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
