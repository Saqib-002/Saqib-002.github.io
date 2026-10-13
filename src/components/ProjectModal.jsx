import FallbackImage from './FallbackImage';
import TechTag from './TechTag';
import { useRef, useState, useCallback } from 'react';
import ImageViewer from './ImageViewer';
import Carousel from './Carousel';
import ProjectLinks from './ProjectLinks';
import useModal from '../hooks/useModal';
import '../assets/styles/ProjectModal.css';
import { X } from 'lucide-react';
import ProjectVideo from './ProjectVideo';

function DetailBlock({ block, onEnlarge }) {
  switch (block.type) {
    case 'heading': return block.level === 3 ? <h4>{block.text}</h4> : <h3>{block.text}</h3>;
    case 'paragraph': return <p>{block.text}</p>;
    case 'list': {
      const List = block.ordered ? 'ol' : 'ul';
      return <List>{(block.items || []).map((item, index) => <li key={index}>{item}</li>)}</List>;
    }
    case 'image': return <figure className={`detail-image ${block.width === 'wide' ? 'detail-image-wide' : ''}`}>
      <button className="detail-image-enlarge" onClick={() => onEnlarge(block)} aria-label={`Enlarge ${block.alt || block.caption || 'project image'}`}>
        <FallbackImage src={block.previewSrc || block.src} alt={block.alt || block.caption || ''} loading="lazy" />
      </button>
      {block.caption && <figcaption>{block.caption}</figcaption>}
    </figure>;
    case 'gallery': return <Carousel images={block.images} projectName={block.caption || 'Project screenshots'} onEnlarge={onEnlarge} />;
    case 'video': return block.src ? <ProjectVideo video={block} /> : null;
    case 'videos': return (block.videos || []).filter(video => video.src).map((video, index) => <ProjectVideo key={index} video={video} />);
    default: return null;
  }
}

export default function ProjectModal({ isOpen, project, onClose, onOpenVideos, isVideoOpen }) {
  const ref = useRef(null);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const closeImage = useCallback(() => setEnlargedImage(null), []);
  useModal(isOpen && !!project, onClose, ref);
  if (!isOpen || !project) return null;
  const { name, techStack = [], details } = project;
  const blocks = details.blocks;
  return <><div className="modal active" id="project-modal" inert={!!enlargedImage || isVideoOpen}>
    <div className="modal-backdrop" onClick={onClose} />
    <div className="modal-content hud-panel" ref={ref} role="dialog" aria-modal="true" aria-labelledby="modal-title" tabIndex={-1}>
      <div className="project-modal-header">
        <div className="project-modal-heading">
          <span className="modal-eyebrow">PROJECT DETAILS</span>
          <h2 id="modal-title">{name}</h2>
        </div>
        <button className="modal-close" onClick={onClose} aria-label="Close project details"><X size={18} strokeWidth={4} aria-hidden="true" /></button>
      </div>
      <div className="project-modal-scroll">
        <div className="project-modal-meta">
          <div className="project-tech">{techStack.map(tag => <TechTag key={tag} name={tag} />)}</div>
          <ProjectLinks project={project} compact onOpenVideos={onOpenVideos} />
        </div>
        <div className="project-detail-blocks">{blocks.map((block, index) => <DetailBlock key={index} block={block} onEnlarge={setEnlargedImage} />)}</div>
      </div>
    </div>
  </div>
    {enlargedImage && <ImageViewer image={enlargedImage} onClose={closeImage} />}
  </>;
}
