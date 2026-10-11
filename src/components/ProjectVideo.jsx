export default function ProjectVideo({ video }) {
  return <figure className="detail-video">
    {video.title && <h4>{video.title}</h4>}
    <video controls playsInline preload="metadata" src={video.src} poster={video.poster}
      aria-label={video.title || video.caption || 'Project video'}>
      Your browser does not support video playback. <a href={video.src}>Download video</a>
    </video>
    {video.caption && <figcaption>{video.caption}</figcaption>}
  </figure>;
}

