const normalize = value => String(value).toLowerCase().replace(/[^\p{L}\p{N}+#]/gu, '');

export function searchProjects(projects, query) {
  const terms = query.trim().split(/\s+/u).map(normalize).filter(Boolean);
  if (!terms.length) return projects;

  return projects.filter(project => {
    const fields = [project.name, ...(project.techStack || []), ...(project.keywords || [])]
      .filter(value => typeof value === 'string').map(normalize);
    return terms.every(term => fields.some(field => field.includes(term)));
  });
}
