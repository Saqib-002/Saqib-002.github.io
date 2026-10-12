import FallbackVideo from './FallbackVideo';
import FallbackImage from './FallbackImage';
import { useRef, useState } from 'react';
import { X, Play, Film } from 'lucide-react';
import useModal from '../hooks/useModal';
import { getProjectVideos } from '../utils/projectMedia';
import '../assets/styles/VideoModal.css';

export default function VideoModal({ project, onClose }) {
  const ref = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  useModal(!!project, onClose, ref);
  if (!project) return null;
  const videos = getProjectVideos(project);
  const selected = videos[selectedIndex];
  return <div className="modal active video-modal">
    <div className="modal-backdrop" onClick={onClose} />
    <div className="modal-content hud-panel" ref={ref} role="dialog" aria-modal="true" aria-labelledby="video-modal-title" tabIndex={-1}>
      <div className="project-modal-header">
        <div className="project-modal-heading"><span className="modal-eyebrow">PROJECT VIDEOS</span><h2 id="video-modal-title">{project.name}</h2></div>
        <button className="modal-close" onClick={onClose} aria-label="Close project videos"><X size={18} aria-hidden="true" /></button>
      </div>
      <div className="video-library">
        <section className="video-stage" aria-label="Selected video">
          <div className="video-screen">
            {selected && <FallbackVideo key={selectedIndex} controls playsInline preload="metadata" src={selected.src} poster={selected.poster}
              aria-label={selected.title || `Video ${selectedIndex + 1}`} onError={() => setFailed(true)} />}
            {!selected && <p>No videos available.</p>}
          </div>
          {failed && <p className="video-error" role="status">This video could not be loaded. Check its file path and format.</p>}
          <div className="video-stage-info"><span className="modal-eyebrow">VIDEO {selectedIndex + 1} / {videos.length}</span>
            <h3>{selected?.title || 'Project walkthrough'}</h3>
            {selected?.caption && <p>{selected.caption}</p>}
          </div>
        </section>
        <aside className="video-playlist" aria-label="Project video playlist">
          <div className="video-playlist-heading"><Film size={16} aria-hidden="true" /><h3>Video collection</h3><span>{videos.length}</span></div>
          <div className="video-playlist-items">{videos.map((video, index) => <button key={index} type="button"
            className={`video-playlist-item ${selectedIndex === index ? 'is-selected' : ''}`} aria-pressed={selectedIndex === index}
            onClick={() => { if (index !== selectedIndex) { setSelectedIndex(index); setFailed(false); } }}>
            <span className="video-thumbnail"><FallbackImage src={video.poster} fallbackSrc={`${import.meta.env.BASE_URL}assets/no-video.png`} alt="" loading="lazy" /><span className="video-thumbnail-play"><Play size={12} aria-hidden="true" /></span></span>
            <span className="video-item-info"><span className="video-item-number">{selectedIndex === index ? 'SELECTED' : `VIDEO ${String(index + 1).padStart(2, '0')}`}</span><span className="video-item-title">{video.title || `Video ${index + 1}`}</span></span>
          </button>)}</div>
        </aside>
      </div>
    </div>
  </div>;
}

