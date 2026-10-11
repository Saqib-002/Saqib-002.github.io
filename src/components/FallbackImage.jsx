const FALLBACK_IMAGE = `${import.meta.env.BASE_URL}assets/no-image.png`;

export default function FallbackImage({ src, alt = '', ...props }) {
  return <img {...props} key={src} src={src || FALLBACK_IMAGE} alt={alt}
    onError={event => {
      const image = event.currentTarget;
      if (image.getAttribute('src') !== FALLBACK_IMAGE) image.src = FALLBACK_IMAGE;
    }} />;
}
