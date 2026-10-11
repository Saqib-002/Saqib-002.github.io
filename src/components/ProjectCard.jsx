import ProjectLinks from './ProjectLinks';
import '../assets/styles/ProjectCard.css';
import { ArrowRight } from 'lucide-react';
export default function ProjectCard({ project, onOpenModal, onOpenVideos }) {
  const { name, description, techStack = [], coverImage } = project;
  return <article className="hud-panel project-card">
    <div className="project-card-media">
    <button className="project-card-preview" onClick={() => onOpenModal(project)} aria-label={`View ${name}`}>
      {coverImage ? <img src={coverImage} alt={name} className="project-card-img" loading="lazy" />
        : <div className="project-img-placeholder"><span aria-hidden="true">&lt;/&gt;</span><span>{name}</span></div>}
    </button>
      <div className="project-card-links"><ProjectLinks project={project} compact onOpenVideos={onOpenVideos} /></div>
    </div>
    <div className="project-card-body">
      <h4 className="project-card-title"><button onClick={() => onOpenModal(project)}>{name}</button></h4>
      <p className="project-card-desc">{description}</p>
      <div className="project-tech">{techStack.slice(0, 4).map(tag => <span key={tag} className="skill-tag">{tag}</span>)}
        {techStack.length > 4 && <span className="skill-tag tech-more">+{techStack.length - 4}</span>}
      </div>
    </div>
    <button className="project-card-footer" onClick={() => onOpenModal(project)}>View project <ArrowRight size={18} strokeWidth={2} aria-hidden="true"/></button>
  </article>;
}
