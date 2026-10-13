import { useState } from 'react';
import { techIcons } from '../data/techIcons';

export default function TechTag({ name, className = '', style }) {
  const iconPath = Object.hasOwn(techIcons, name) ? techIcons[name] : null;
  const iconSrc = iconPath
    ? `${import.meta.env.BASE_URL}${iconPath.replace(/^\/+/, '')}`
    : null;
  const [failedSrc, setFailedSrc] = useState(null);

  return (
    <span className={`skill-tag tech-tag ${className}`.trim()} style={style}>
      {iconSrc && failedSrc !== iconSrc && (
        <img
          className="tech-tag-icon"
          src={iconSrc}
          alt=""
          width="18"
          height="18"
          onError={() => setFailedSrc(iconSrc)}
        />
      )}
      <span className="tech-tag-label">{name}</span>
    </span>
  );
}
