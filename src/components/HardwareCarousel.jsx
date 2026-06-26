import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

function getCircularOffset(index, activeIndex, length) {
  let offset = index - activeIndex;
  const half = length / 2;

  if (offset > half) offset -= length;
  if (offset < -half) offset += length;

  return offset;
}

function getCardTransform(offset) {
  const absOffset = Math.abs(offset);

  if (absOffset > 4) {
    return {
      transform: "translate(-50%, -50%) translateX(0) translateZ(-420px) rotateY(0deg) scale(0.55)",
      opacity: 0,
      zIndex: 0,
      pointerEvents: "none",
    };
  }

  const x = offset * 260;
  const z = absOffset === 0 ? 90 : -absOffset * 130;
  const rotateY = offset * -32;
  const scale = absOffset === 0 ? 1.08 : Math.max(0.74, 1 - absOffset * 0.13);
  const opacity = absOffset === 0 ? 1 : Math.max(0.38, 1 - absOffset * 0.24);

  return {
    transform: `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`,
    opacity,
    zIndex: 40 - absOffset,
    pointerEvents: absOffset <= 2 ? "auto" : "none",
  };
}

function ComponentDetailModal({ module, onClose }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div className="hardware-detail-overlay" onClick={onClose} role="presentation">
      <div
        className="hardware-detail-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="hardware-detail-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="hardware-detail-close" onClick={onClose} aria-label="Close details">
          ×
        </button>

        <div className="hardware-detail-media">
          {module.image ? (
            <img src={module.image} alt={module.imageAlt ?? module.name} className="hardware-detail-image" />
          ) : (
            <div className="hardware-detail-placeholder">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--primary)]">Image</p>
              <p className="mt-1 text-sm font-bold text-[var(--muted)]">Coming soon</p>
            </div>
          )}
        </div>

        <div className="hardware-detail-content">
          <span className="hardware-detail-tag">{module.category}</span>
          <h3 id="hardware-detail-title" className="hardware-detail-title">
            {module.name}
          </h3>

          <div className="hardware-detail-block">
            <p className="hardware-detail-label">Purpose</p>
            <p className="hardware-detail-copy">{module.purpose}</p>
          </div>

          <div className="hardware-detail-block">
            <p className="hardware-detail-label">Specifications</p>
            <ul className="hardware-detail-list">
              {module.specifications.map((spec) => (
                <li key={spec} className="hardware-detail-list-item">
                  <span className="hardware-detail-bullet" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hardware-detail-block">
            <p className="hardware-detail-label">Role in system</p>
            <p className="hardware-detail-copy">{module.role}</p>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function HardwareCarouselCard({ module, offset, isActive, onSelect, onOpenDetail }) {
  const style = getCardTransform(offset);

  return (
    <div
      className={`hardware-carousel-card ${isActive ? "is-active" : ""}`}
      style={style}
      aria-current={isActive ? "true" : undefined}
    >
      <div className="hardware-carousel-card-inner">
        <button type="button" className="hardware-carousel-card-select" onClick={onSelect} aria-label={`Select ${module.name}`}>
          <span className="hardware-carousel-tag">{module.category}</span>

          <div className="hardware-carousel-media">
            {module.image ? (
              <img src={module.image} alt={module.imageAlt ?? module.name} className="hardware-carousel-image" />
            ) : (
              <div className="hardware-carousel-placeholder">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--primary)]">Image</p>
                <p className="mt-1 text-sm font-bold text-[var(--muted)]">Coming soon</p>
              </div>
            )}
          </div>

          <div className="hardware-carousel-footer">
            <h3 className="hardware-carousel-title">{module.name}</h3>
            <p className="hardware-carousel-caption">{module.specifications[0]}</p>
          </div>
        </button>

        {isActive && (
          <button type="button" className="hardware-carousel-detail-btn" onClick={onOpenDetail}>
            View details
          </button>
        )}
      </div>
    </div>
  );
}

export default function HardwareCarousel({ modules }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [detailOpen, setDetailOpen] = useState(false);
  const touchStartX = useRef(null);
  const activeModule = modules[activeIndex];

  const goTo = useCallback(
    (index) => {
      setActiveIndex((index + modules.length) % modules.length);
    },
    [modules.length],
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const openDetail = useCallback(() => setDetailOpen(true), []);
  const closeDetail = useCallback(() => setDetailOpen(false), []);

  useEffect(() => {
    if (detailOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [detailOpen, goNext, goPrev]);

  useEffect(() => {
    setDetailOpen(false);
  }, [activeIndex]);

  const handleTouchStart = (event) => {
    if (detailOpen) return;
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    if (detailOpen || touchStartX.current === null) return;

    const delta = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(delta) < 40) return;
    if (delta > 0) goPrev();
    else goNext();
  };

  return (
    <div className="hardware-carousel">
      <div
        className="hardware-carousel-stage"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="hardware-carousel-track" aria-live="polite">
          {modules.map((module, index) => {
            const offset = getCircularOffset(index, activeIndex, modules.length);
            return (
              <HardwareCarouselCard
                key={module.name}
                module={module}
                offset={offset}
                isActive={index === activeIndex}
                onSelect={() => goTo(index)}
                onOpenDetail={openDetail}
              />
            );
          })}
        </div>
      </div>

      <div className="hardware-carousel-controls">
        <button type="button" className="hardware-carousel-nav" onClick={goPrev} aria-label="Previous component">
          ←
        </button>

        <div className="hardware-carousel-dots" role="tablist" aria-label="Hardware components">
          {modules.map((module, index) => (
            <button
              key={module.name}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={module.name}
              className={`hardware-carousel-dot ${index === activeIndex ? "is-active" : ""}`}
              onClick={() => goTo(index)}
            />
          ))}
        </div>

        <button type="button" className="hardware-carousel-nav" onClick={goNext} aria-label="Next component">
          →
        </button>
      </div>

      <div className="hardware-carousel-actions">
        <button type="button" className="btn-secondary hardware-carousel-detail-action" onClick={openDetail}>
          View component details
        </button>
        <p className="hardware-carousel-active-label">
          {activeIndex + 1} / {modules.length} · {activeModule.name}
        </p>
      </div>

      {detailOpen && <ComponentDetailModal module={activeModule} onClose={closeDetail} />}
    </div>
  );
}
