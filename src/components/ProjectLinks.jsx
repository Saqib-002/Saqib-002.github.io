import { Globe, Video } from 'lucide-react';
import { getProjectVideos } from '../utils/projectMedia';

function GitHubIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297C5.37.297 0 5.67 0 12.297c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.04c-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 6-.0c2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.37.81 1.1.81 2.22v3.3c0 .32.22.7.825.58A12.01 12.01 0 0 0 24 12.297C24 5.67 18.627.297 12 .297Z" /></svg>;
}

function AndroidIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M6 8a6 6 0 0 1 12 0H6Zm3-3L7.5 2.5M15 5l1.5-2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="9.5" cy="6.5" r=".65" fill="#111b26" />
    <circle cx="14.5" cy="6.5" r=".65" fill="#111b26" />
    <path d="M6 9h12v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9Z" />
    <rect x="2.5" y="9" width="2.5" height="8" rx="1.25" />
    <rect x="19" y="9" width="2.5" height="8" rx="1.25" />
    <rect x="8" y="17" width="2.5" height="6" rx="1.25" />
    <rect x="13.5" y="17" width="2.5" height="6" rx="1.25" />
  </svg>;
}

function AppleIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.05 12.54c.03 3.22 2.83 4.29 2.86 4.3-.02.08-.45 1.53-1.48 3.03-.9 1.3-1.83 2.6-3.3 2.63-1.44.03-1.9-.85-3.55-.85-1.65 0-2.16.82-3.52.88-1.42.05-2.5-1.42-3.4-2.72C2.82 17.16 1.4 12.33 3.3 9.07a5.28 5.28 0 0 1 4.48-2.71c1.4-.03 2.72.94 3.57.94.85 0 2.45-1.16 4.13-.99.7.03 2.67.28 3.94 2.14-.1.06-2.37 1.38-2.37 4.09ZM14.34 4.56c.75-.9 1.25-2.15 1.11-3.4-1.08.04-2.39.72-3.16 1.62-.7.8-1.32 2.08-1.15 3.3 1.2.09 2.43-.61 3.2-1.52Z" /></svg>;
}

export default function ProjectLinks({ project, compact = false, onOpenVideos }) {
  const links = [[project.liveLink, 'Live demo', <Globe key="live" size={18} aria-hidden="true" />],
    [project.githubLink, 'GitHub', <GitHubIcon key="github" />],
    [project.appLink, 'Android app', <AndroidIcon key="android" />],
    [project.iosLink, 'iOS app', <AppleIcon key="ios" />]];
  const availableLinks = links.filter(([url]) => url && url !== '#');
  const videos = getProjectVideos(project);
  if (!availableLinks.length && !videos.length) return null;
  return <div className="project-links-row">
    {!compact && <span className="project-links-label">Project links</span>}
    <div className="project-actions" role="group" aria-label={`Links for ${project.name}`}>{availableLinks.map(([url, label, icon]) =>
    <a key={label} href={url} target="_blank" rel="noopener noreferrer"
      aria-label={`Open ${label} for ${project.name}`}
      title={label}
      className="project-action-icon">
      {icon}
    </a>
  )}{videos.length > 0 && <button type="button" className="project-video-button" onClick={() => onOpenVideos(project)} aria-label={`View ${videos.length} videos for ${project.name}`} title="Project videos"><Video size={18} aria-hidden="true" /></button>}</div></div>;
}


