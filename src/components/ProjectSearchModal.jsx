import { useRef, useState } from 'react';
import { ArrowUpRight, Search, X } from 'lucide-react';
import useModal from '../hooks/useModal';
import FallbackImage from './FallbackImage';
import allProjects from '../data/projects';
import { searchProjects } from '../utils/searchProjects';
import '../assets/styles/ProjectSearchModal.css';

export default function ProjectSearchModal({ onClose, onOpenProject, isDetailOpen }) {
  const [query, setQuery] = useState('');
  const ref = useRef(null);
  const inputRef = useRef(null);
  useModal(true, onClose, ref);
  const results = searchProjects(allProjects, query);

  return (
    <div className="modal active project-search-modal" inert={isDetailOpen} aria-hidden={isDetailOpen}>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-content hud-panel project-search-content" ref={ref} role="dialog" aria-modal="true" aria-labelledby="project-search-title" tabIndex={-1}>
        <header className="project-search-header">
          <div>
            <span className="project-search-eyebrow">EXPLORE THE WORK</span>
            <h2 id="project-search-title">Find a project</h2>
            <p>Search by name, tech stack, or keyword.</p>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close project search"><X size={20} aria-hidden="true" /></button>
        </header>
        <div className="project-search-controls">
          <div className="project-search-input-wrap">
            <Search size={21} aria-hidden="true" />
            <input ref={inputRef} data-modal-autofocus type="search" aria-label="Search projects" aria-describedby="project-search-help" placeholder="Project name, React, Python…" value={query} onChange={event => setQuery(event.target.value)} />
            {query && <button onClick={() => { setQuery(''); inputRef.current.focus(); }} aria-label="Clear search"><X size={18} aria-hidden="true" /></button>}
          </div>
          <div className="project-search-meta">
            <span role="status" aria-live="polite" aria-atomic="true">{results.length} {results.length === 1 ? 'project' : 'projects'}{query.trim() ? ' found' : ' to explore'}</span>
            <span id="project-search-help">{query.trim() ? 'Matches across name, stack & keywords' : 'Start typing to filter the catalog'}</span>
          </div>
        </div>
        <div className="project-search-results">
          {results.length ? results.map((project, index) => (
            <button className="project-search-result" key={index} onClick={() => onOpenProject(project)}>
              <FallbackImage className="project-search-cover" src={project.coverImage} alt="" loading="lazy" width={112} height={84} />
              <span className="project-search-result-body">
                <span className="project-search-result-title">{project.name}</span>
                {project.description && <span className="project-search-description">{project.description}</span>}
                <span className="project-search-stack">{(project.techStack || []).map(tech => <span key={tech}>{tech}</span>)}</span>
              </span>
              <ArrowUpRight className="project-search-arrow" size={20} aria-hidden="true" />
            </button>
          )) : <div className="project-search-empty"><Search size={32} aria-hidden="true" /><h3>No matching projects</h3><p>Try another name, technology, or keyword.</p></div>}
        </div>
        <footer className="project-search-footer">Select a project to explore its details <span>Esc to close</span></footer>
      </div>
    </div>
  );
}
