import { useState, useRef, useEffect } from 'react';
import useModal from '../hooks/useModal';
import allProjects from '../data/projects';
import ProjectCard from './ProjectCard';
import '../assets/styles/AllProjectsModal.css';
import { Bot, ChevronLeft, ChevronRight, Code, Layers, Menu, Monitor, Palette, Search, Server, Smartphone, X } from 'lucide-react';

const CATEGORIES = [
  {
    id: 'all',
    label: 'All',
    icon: (
      <Menu />
    ),
  },
  {
    id: 'technical-showcase',
    label: 'Technical Showcase',
    icon: <Code />,
  },
  {
    id: 'ai',
    label: 'AI & ML / Data Science',
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
    id: 'app',
    label: 'Apps',
    icon: (
      <Smartphone />
    ),
  },
  {
    id: 'landing',
    label: 'Landing Pages',
    icon: (
      <Palette />
    ),
  },
  {
    id: 'cloud',
    label: 'Cloud / Automation',
    icon: (
      <Server />
    ),
  },
  {
    id: 'desktop',
    label: 'Desktop',
    icon: (
      <Monitor />
    ),
  }
];

const PROJECT_DATA = Object.fromEntries(CATEGORIES.map(({ id }) => [
  id,
  allProjects.filter(project => id === 'all'
    ? !project.categories.includes('technical-showcase')
    : project.categories.includes(id)),
]));

export default function AllProjectsModal({ isOpen, onClose, onOpenProject, isDetailOpen, onOpenVideos, onSearch }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const ref = useRef(null);
  const tabsRef = useRef(null);
  const [scrollEdges, setScrollEdges] = useState({ left: false, right: false });
  useModal(isOpen, onClose, ref);

  useEffect(() => {
    const tabs = tabsRef.current;
    if (!tabs || !isOpen) return;
    const updateEdges = () => setScrollEdges({
      left: tabs.scrollLeft > 1,
      right: tabs.scrollWidth - tabs.clientWidth - tabs.scrollLeft > 1,
    });
    const observer = new ResizeObserver(updateEdges);
    observer.observe(tabs);
    tabs.addEventListener('scroll', updateEdges, { passive: true });
    updateEdges();
    return () => {
      observer.disconnect();
      tabs.removeEventListener('scroll', updateEdges);
    };
  }, [isOpen]);

  const scrollCategories = (direction) => {
    const tabs = tabsRef.current;
    tabs?.scrollBy({
      left: direction * tabs.clientWidth * 0.65,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  };

  const projects = PROJECT_DATA[activeCategory] || [];

  return (
    <div className={`modal all-projects-modal ${isOpen ? 'active' : ''}`} inert={!isOpen || isDetailOpen} aria-hidden={!isOpen || isDetailOpen}>
      <div className="modal-backdrop" onClick={onClose}></div>

      <div className="modal-content hud-panel all-projects-modal-content" ref={ref} role="dialog" aria-modal="true" aria-labelledby="all-projects-title" tabIndex={-1}>
        {/* Header */}
        <div className="all-projects-modal-header">
          <h2 className="all-projects-modal-title" id="all-projects-title">All projects</h2>
          <button className="all-projects-search-btn" onClick={onSearch}>
            <Search size={16} aria-hidden="true" />
            <span>Search Projects</span>
          </button>
          <button className="modal-close" onClick={onClose} aria-label="Close all projects"><X size={18} strokeWidth={4} aria-hidden="true" /></button>
        </div>

        {/* Category Tabs */}
        <div className="all-projects-tabs-wrapper">
        <div className="all-projects-tabs" ref={tabsRef}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`all-projects-tab ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
              onFocus={(event) => event.currentTarget.scrollIntoView({ block: 'nearest', inline: 'nearest' })}
              aria-pressed={activeCategory === cat.id}
            >
              <span className="tab-icon">{cat.icon}</span>
              <span>{cat.label}</span>
              <span className="tab-count">{PROJECT_DATA[cat.id].length}</span>
            </button>
          ))}
        </div>
        {scrollEdges.left && <div className="all-projects-tabs-edge left">
          <button className="all-projects-tabs-arrow" aria-label="Scroll categories left" onClick={() => scrollCategories(-1)}><ChevronLeft size={14} aria-hidden="true" /></button>
        </div>}
        {scrollEdges.right && <div className="all-projects-tabs-edge right">
          <button className="all-projects-tabs-arrow" aria-label="Scroll categories right" onClick={() => scrollCategories(1)}><ChevronRight size={14} aria-hidden="true" /></button>
        </div>}
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
