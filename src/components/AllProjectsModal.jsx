import { useState, useRef } from 'react';
import useModal from '../hooks/useModal';
import aiProjects from '../data/ai-projects.json';
import fullstackProjects from '../data/fullstack-projects.json';
import desktopProjects from '../data/desktop-projects.json';
import appProjects from '../data/app-projects.json';
import landingProjects from '../data/landing-pages.json';
import ProjectCard from './ProjectCard';
import '../assets/styles/AllProjectsModal.css';
import { Bot, Layers, Menu, Monitor, Palette, Smartphone, X } from 'lucide-react';

const CATEGORIES = [
  {
    id: 'all',
    label: 'All',
    icon: (
      <Menu />
    ),
  },
  {
    id: 'ai',
    label: 'AI & ML',
    icon: (
      <Bot />
    ),
  },
  {
    id: 'fullstack',
    label: 'Full Stack',
    icon: (
      <Layers />
    ),
  },
  {
    id: 'desktop',
    label: 'Desktop',
    icon: (
      <Monitor />
    ),
  },
  {
    id: 'app',
    label: 'Apps',
    icon: (
      <Smartphone />
    ),
  },
  {
    id: 'landing',
    label: 'Langin Pages',
    icon: (
      <Palette />
    ),
  },
];

const seenProjectNames = new Set();
const allProjects = [...aiProjects, ...fullstackProjects, ...desktopProjects].filter((project) => {
  const name = project.name.trim().toLowerCase();
  if (seenProjectNames.has(name)) return false;
  seenProjectNames.add(name);
  return true;
});

const PROJECT_DATA = {
  all: allProjects,
  ai: aiProjects,
  fullstack: fullstackProjects,
  desktop: desktopProjects,
  app: appProjects,
  landing: landingProjects
};

export default function AllProjectsModal({ isOpen, onClose, onOpenProject, isDetailOpen, onOpenVideos }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const ref = useRef(null);
  useModal(isOpen, onClose, ref);

  const projects = PROJECT_DATA[activeCategory] || [];

  return (
    <div className={`modal all-projects-modal ${isOpen ? 'active' : ''}`} inert={!isOpen || isDetailOpen} aria-hidden={!isOpen || isDetailOpen}>
      <div className="modal-backdrop" onClick={onClose}></div>

      <div className="modal-content hud-panel all-projects-modal-content" ref={ref} role="dialog" aria-modal="true" aria-labelledby="all-projects-title" tabIndex={-1}>
        {/* Header */}
        <div className="all-projects-modal-header">
          <h2 className="all-projects-modal-title" id="all-projects-title">All projects</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close all projects"><X size={18} strokeWidth={4} aria-hidden="true"/></button>
        </div>

        {/* Category Tabs */}
        <div className="all-projects-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`all-projects-tab ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
              aria-pressed={activeCategory === cat.id}
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
                  onOpenVideos={onOpenVideos}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
