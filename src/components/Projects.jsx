import ProjectCard from './ProjectCard';
import '../assets/styles/Projects.css';

export default function Projects({ projects, onOpenModal, onViewAll }) {
  if (!projects) return null;

  return (
    <section className="animate-slide-in-up" id="projects" style={{ '--delay': '0.6s' }}>
      <div className="hud-panel projects">
        <h3>&gt; saqib/projects</h3>
        <div className="projects-list" id="projects-list">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              onOpenModal={onOpenModal}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="projects-view-all-wrap">
          <button className="projects-view-all-btn" onClick={onViewAll}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z" />
            </svg>
            View All Projects
            <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
