import { useState } from 'react';
import '../assets/styles/Carousel.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
export default function Carousel({ images = [], projectName, onEnlarge }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  if (!images.length) return null;
  const slide = Math.min(currentSlide, images.length - 1), item = images[slide];
  const { src, previewSrc, caption, alt } = item;
  return <figure className="project-gallery" aria-label={`${projectName} gallery`}>
    <div className="carousel-container">
      <button className="gallery-image-button" onClick={() => onEnlarge(item)} aria-label="Enlarge screenshot">
        <img src={previewSrc || src} alt={alt || caption || projectName} />
      </button>
      {images.length > 1 && <>
        <button className="carousel-btn prev" aria-label="Previous screenshot" onClick={() => setCurrentSlide((slide - 1 + images.length) % images.length)}><ChevronLeft size={24} strokeWidth={3} aria-hidden="true"/></button>
        <button className="carousel-btn next" aria-label="Next screenshot" onClick={() => setCurrentSlide((slide + 1) % images.length)}><ChevronRight size={24} strokeWidth={3} aria-hidden="true"/></button>
      </>}
    </div>
    <figcaption><span>{caption}</span><span aria-live="polite">{slide + 1} / {images.length}</span></figcaption>
    {images.length > 1 && <div className="gallery-thumbnails">{images.map((image, index) => <button key={index} aria-label={`Show screenshot ${index + 1}`} aria-pressed={slide === index} onClick={() => setCurrentSlide(index)}>
      <img src={image.previewSrc || image.src} alt="" loading="lazy" />
    </button>)}</div>}
  </figure>;
}
