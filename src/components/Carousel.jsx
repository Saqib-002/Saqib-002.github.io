import { useState, useEffect } from 'react';
import '../assets/styles/Carousel.css';

export default function Carousel({ images, projectName }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Reset to first slide when project images change
  useEffect(() => {
    setCurrentSlide(0);
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="carousel-container">
        <div className="carousel-track">
          <div className="carousel-slide project-img-placeholder">
            <img src="assets/media/no_image.png" alt={projectName} />
            <span>No Image</span>
          </div>
        </div>
        <div className="carousel-indicators">
          <div className="indicator active"></div>
        </div>
      </div>
    );
  }

  const formatImageName = (imgUrl) => {
    try {
      const filename = imgUrl.split('/').pop().split('.')[0];
      return filename
        .replace(/_/g, ' ')
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    } catch (e) {
      return projectName;
    }
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const handleIndicatorClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="carousel-container">
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((img, index) => {
          const caption = formatImageName(img);
          return (
            <div key={index} className="carousel-slide">
              <img src={img} alt={caption} />
              <div className="carousel-caption">{caption}</div>
            </div>
          );
        })}
      </div>

      {images.length > 1 && (
        <>
          <button className="carousel-btn prev" id="prev-btn" onClick={handlePrev}>
            &#10094;
          </button>
          <button className="carousel-btn next" id="next-btn" onClick={handleNext}>
            &#10095;
          </button>
        </>
      )}

      <div className="carousel-indicators" id="carousel-indicators">
        {images.map((_, index) => (
          <div
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => handleIndicatorClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}
