import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import useModal from '../hooks/useModal';
import '../assets/styles/ImageViewer.css';

export default function ImageViewer({ image, onClose }) {
  const ref = useRef(null);
  const stageRef = useRef(null);
  const dragRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setViewport({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, []);
  const fitScale = naturalSize.width && naturalSize.height
    ? Math.min(Math.max(1, viewport.width - 32) / naturalSize.width, Math.max(1, viewport.height - 32) / naturalSize.height, 1)
    : 1;
  const width = naturalSize.width * fitScale * zoom;
  const height = naturalSize.height * fitScale * zoom;
  const startDrag = event => {
    if (zoom === 1 || event.button !== 0 || !event.isPrimary || !event.target.closest('.image-viewer-canvas')) return;
    event.preventDefault();
    const stage = event.currentTarget;
    dragRef.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, left: stage.scrollLeft, top: stage.scrollTop };
    stage.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };
  const moveDrag = event => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.currentTarget.scrollLeft = drag.left - (event.clientX - drag.x);
    event.currentTarget.scrollTop = drag.top - (event.clientY - drag.y);
  };
  const endDrag = event => {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  useModal(true, onClose, ref);
  return createPortal(
    <div className="image-viewer-overlay" onClick={onClose}>
      <div className="image-viewer" ref={ref} role="dialog" aria-modal="true" aria-label="Enlarged project image" tabIndex={-1} onClick={event => event.stopPropagation()}>
        <div className="image-viewer-toolbar">
          <p>{image.caption || image.alt || 'Project screenshot'}</p>
          <button onClick={() => setZoom(value => Math.max(1, value - .5))} disabled={zoom === 1} aria-label="Zoom out" title="Zoom out"><ZoomOut size={20} /></button>
          <span className="image-viewer-zoom" aria-live="polite">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(value => Math.min(4, value + .5))} disabled={zoom === 4} aria-label="Zoom in" title="Zoom in"><ZoomIn size={20} /></button>
          <button className="image-viewer-fit" onClick={() => setZoom(1)} aria-label="Fit image to screen" title="Fit to screen">Fit</button>
          <button onClick={onClose} aria-label="Close enlarged image" title="Close"><X size={22} /></button>
        </div>
        <div className={`image-viewer-stage ${zoom > 1 ? 'is-zoomed' : ''} ${isDragging ? 'is-dragging' : ''}`} ref={stageRef}
          onPointerDown={startDrag} onPointerMove={moveDrag}
          onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={endDrag}>
          <div className="image-viewer-canvas" style={{ width: Math.max(viewport.width, width + 32), height: Math.max(viewport.height, height + 32) }}>
            <img src={image.src} alt={image.alt || image.caption || 'Project screenshot'}
              draggable={false}
              onLoad={event => setNaturalSize({ width: event.currentTarget.naturalWidth, height: event.currentTarget.naturalHeight })}
              style={naturalSize.width ? { width, height } : undefined} />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
