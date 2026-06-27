import { useState, useEffect } from 'react';
import aiProjects from '../data/ai-projects.json';
import fullstackProjects from '../data/fullstack-projects.json';
import desktopProjects from '../data/desktop-projects.json';
import ProjectCard from './ProjectCard';
import '../assets/styles/AllProjectsModal.css';

const CATEGORIES = [
  {
    id: 'all',
    label: 'All',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
      </svg>
    ),
  },
  {
    id: 'ai',
    label: 'AI & ML',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm1 14.93V17a1 1 0 0 1-2 0v-.07A8.001 8.001 0 0 1 4.07 11H5a1 1 0 0 1 0 2h-.93A8.001 8.001 0 0 1 11 19.93zm0-3.86A4 4 0 1 1 12 6a4 4 0 0 1 1 7.07zM12 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
      </svg>
    ),
  },
  {
    id: 'fullstack',
    label: 'Full Stack',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1 16H5V5h14v14zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7zm4-8h6v2h-6zm0 4h6v2h-6zm0 4h6v2h-6z" />
      </svg>
    ),
  },
  {
    id: 'desktop',
    label: 'Desktop',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 3H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h6v2H7v2h10v-2h-3v-2h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 13H4V5h16v11z" />
      </svg>
    ),
  },
];

const PROJECT_DATA = {
  all: [...aiProjects, ...fullstackProjects, ...desktopProjects],
  ai: aiProjects,
  fullstack: fullstackProjects,
  desktop: desktopProjects,
};

export default function AllProjectsModal({ isOpen, onClose, onOpenProject }) {
  const [activeCategory, setActiveCategory] = useState('all');

  // Lock body scroll when open
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

  // Reset category each time the modal opens
  useEffect(() => {
    if (isOpen) setActiveCategory('all');
  }, [isOpen]);

  const projects = PROJECT_DATA[activeCategory] || [];

  return (
    <div className={`modal all-projects-modal ${isOpen ? 'active' : ''}`}>
      <div className="modal-backdrop" onClick={onClose}></div>

      <div className="modal-content hud-panel all-projects-modal-content">
        {/* Header */}
        <div className="all-projects-modal-header">
          <h2 className="all-projects-modal-title">&gt; saqib/all-projects</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>

        {/* Category Tabs */}
        <div className="all-projects-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`all-projects-tab ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span className="tab-icon">{cat.icon}</span>
              <span>{cat.label}</span>
              <span className="tab-count">{PROJECT_DATA[cat.id].length}</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="all-projects-grid-container">

          <div className="all-projects-grid">
            {projects.length === 0 ? (
              <div className="all-projects-empty">
                <p>No projects in this category yet.</p>
              </div>
            ) : (
              projects.map((project, index) => (
                <ProjectCard
                  key={`${activeCategory}-${index}`}
                  project={project}
                  onOpenModal={onOpenProject}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
