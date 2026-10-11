import { useEffect, useRef } from 'react';

const FALLBACK_IMAGE = `${import.meta.env.BASE_URL}assets/no-image.png`;

export default function FallbackVideo({ poster, ...props }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!poster) return;
    const video = ref.current;
    const image = new Image();
    image.onerror = () => { video.poster = FALLBACK_IMAGE; };
    image.src = poster;
    return () => { image.onerror = null; };
  }, [poster]);
  return <video {...props} ref={ref} poster={poster} />;
}
