import './ProjectCard.css';

/**
 * Unified project card.
 *
 * Props:
 *   project     – project data object
 *   onOpenModal – called when the card (or Details button) is clicked
 *   index       – (optional) used for stagger animation delay in the main section
 */
export default function ProjectCard({ project, onOpenModal, index }) {
  const { name, description, techStack, images, liveLink, githubLink, appLink, iosLink } = project;
  const delay = index !== undefined ? 0.6 + index * 0.2 : undefined;

  return (
    <div
      className={`hud-panel project-card${index !== undefined ? ' animate-slide-in-up' : ''}`}
      style={delay !== undefined ? { '--delay': `${delay}s` } : undefined}
      onClick={() => onOpenModal(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpenModal(project)}
    >
      {/* Thumbnail + hover overlay */}
      <div className="project-card-img-wrap">
        {images && images.length > 0 ? (
          <img src={images[0]} alt={name} className="project-card-img" />
        ) : (
          <div className="project-img-placeholder">
            <img src="assets/media/no_image.png" alt={name} />
            <span>No Image</span>
          </div>
        )}

        {/* Link buttons revealed on hover — stop propagation so card click doesn't also fire */}
        <div className="project-card-overlay" onClick={(e) => e.stopPropagation()}>
          <div class="project-access-buttons">
            <a
              href={liveLink || '#'}
              className={`overlay-btn${!liveLink ? ' disabled' : ''}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Live Demo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4.5C7 4.5 2.73 7.61 0 12c2.73 4.39 7 7.5 12 7.5s9.27-3.11 12-7.5c-2.73-4.39-7-7.5-12-7.5zm0 13a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0-9a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
              </svg>
              <span>Live</span>
            </a>
            <a
              href={githubLink || '#'}
              className={`overlay-btn${!githubLink ? ' disabled' : ''}`}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
            >
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.372.79 1.102.79 2.222v3.293c0 .317.22.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              <span>GitHub</span>
            </a>
          </div>
          <div class="project-access-buttons">
            <a
              href={appLink || '#'}
              className={`overlay-btn${!appLink ? ' disabled' : ''}`}
              target="_blank"
              rel="noopener noreferrer"
              title="App URL"
            >
              <svg fill="currentColor" viewBox="0 0 1024 1024">
                <path d="M270.1 741.7c0 23.4 19.1 42.5 42.6 42.5h48.7v120.4c0 30.5 24.5 55.4 54.6 55.4 30.2 0 54.6-24.8 54.6-55.4V784.1h85v120.4c0 30.5 24.5 55.4 54.6 55.4 30.2 0 54.6-24.8 54.6-55.4V784.1h48.7c23.5 0 42.6-19.1 42.6-42.5V346.4h-486v395.3zm357.1-600.1l44.9-65c2.6-3.8 2-8.9-1.5-11.4-3.5-2.4-8.5-1.2-11.1 2.6l-46.6 67.6c-30.7-12.1-64.9-18.8-100.8-18.8-35.9 0-70.1 6.7-100.8 18.8l-46.6-67.5c-2.6-3.8-7.6-5.1-11.1-2.6-3.5 2.4-4.1 7.4-1.5 11.4l44.9 65c-71.4 33.2-121.4 96.1-127.8 169.6h486c-6.6-73.6-56.7-136.5-128-169.7zM409.5 244.1a26.9 26.9 0 1 1 26.9-26.9 26.97 26.97 0 0 1-26.9 26.9zm208.4 0a26.9 26.9 0 1 1 26.9-26.9 26.97 26.97 0 0 1-26.9 26.9zm223.4 100.7c-30.2 0-54.6 24.8-54.6 55.4v216.4c0 30.5 24.5 55.4 54.6 55.4 30.2 0 54.6-24.8 54.6-55.4V400.1c.1-30.6-24.3-55.3-54.6-55.3zm-658.6 0c-30.2 0-54.6 24.8-54.6 55.4v216.4c0 30.5 24.5 55.4 54.6 55.4 30.2 0 54.6-24.8 54.6-55.4V400.1c0-30.6-24.5-55.3-54.6-55.3z" />
              </svg>
            </a>
            <a
              href={appLink || '#'}
              className={`overlay-btn${!appLink ? ' disabled' : ''}`}
              target="_blank"
              rel="noopener noreferrer"
              title="App URL"
            >
              <svg fill="currentColor" width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <title>ios</title>
                <path d="M1.119 12.633v10.576h2.49v-10.576h-2.49zM11.882 10.768c2.553 0 4.193 2.040 4.193 5.232 0 3.217-1.64 5.257-4.193 5.257-2.578 0-4.206-2.040-4.206-5.257 0-3.192 1.627-5.232 4.206-5.232zM25.45 8.578c-3.129 0-5.357 1.727-5.357 4.293 0 2.040 1.264 3.317 3.918 3.93l1.865 0.451c1.815 0.413 2.553 1.014 2.553 2.053 0 1.202-1.214 2.053-2.941 2.053-1.765 0-3.092-0.864-3.229-2.19h-2.503c0.1 2.654 2.278 4.281 5.582 4.281 3.492 0 5.683-1.715 5.683-4.443 0-2.14-1.252-3.354-4.155-4.018l-1.665-0.376c-1.765-0.426-2.491-0.989-2.491-1.94 0-1.202 1.101-2.003 2.729-2.003 1.64 0 2.766 0.814 2.891 2.153h2.453c-0.063-2.528-2.153-4.243-5.332-4.243zM11.882 8.578c-4.205-0-6.834 2.866-6.834 7.422 0 4.594 2.628 7.447 6.834 7.447 4.181 0 6.821-2.854 6.821-7.447 0-4.556-2.641-7.422-6.822-7.422zM2.357 8.553c-0.007-0-0.016-0-0.024-0-0.747 0-1.352 0.605-1.352 1.352s0.605 1.352 1.352 1.352c0.009 0 0.017-0 0.026-0l-0.001 0c0.011 0 0.024 0.001 0.037 0.001 0.747 0 1.352-0.605 1.352-1.352s-0.605-1.352-1.352-1.352c-0.013 0-0.026 0-0.039 0.001l0.002-0z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="project-card-body">
        <h4 className="project-card-title">{name}</h4>
        <p className="project-card-desc">{description}</p>
        <div className="project-tech">
          {techStack.slice(0, 4).map((tag, i) => (
            <span key={i} className="skill-tag">{tag}</span>
          ))}
          {techStack.length > 4 && (
            <span className="skill-tag tech-more">+{techStack.length - 4}</span>
          )}
        </div>
      </div>

      {/* Footer hint */}
      <div className="project-card-footer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
        Click to view details
      </div>
    </div>
  );
}
