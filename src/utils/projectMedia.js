export function getProjectVideos(project) {
  return (Array.isArray(project.videos) ? project.videos : [])
    .filter(video => video && typeof video.src === 'string' && video.src.trim());
}


