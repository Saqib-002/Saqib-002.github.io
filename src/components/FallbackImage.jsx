const FALLBACK_IMAGE = `${import.meta.env.BASE_URL}assets/no-image.png`;

export default function FallbackImage({ src, alt = '', fallbackSrc = FALLBACK_IMAGE, ...props }) {
  return <img {...props} key={src} src={src || fallbackSrc} alt={alt}
    onError={event => {
      const image = event.currentTarget;
      if (image.getAttribute('src') !== fallbackSrc) image.src = fallbackSrc;
    }} />;
}
