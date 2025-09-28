import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

// GSAP-powered SVG ripple effect on mouse move
export default function WaveEffect() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Set SVG size to match parent
    const resize = () => {
      if (!svg.parentElement) return;
      const rect = svg.parentElement.getBoundingClientRect();
      svg.setAttribute('width', rect.width.toString());
      svg.setAttribute('height', rect.height.toString());
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!svg.parentElement) return;
      const rect = svg.parentElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Only trigger if inside the parent bounds
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
      // Create a new SVG circle
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', x.toString());
      circle.setAttribute('cy', y.toString());
      circle.setAttribute('r', '0');
      circle.setAttribute('stroke', '#1AC3D9');
      circle.setAttribute('stroke-width', '2');
      circle.setAttribute('fill', 'none');
      circle.setAttribute('opacity', '0.25');
      svg.appendChild(circle);
      // Animate with GSAP
      gsap.to(circle, {
        attr: { r: 120 },
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
        onComplete: () => {
          svg.removeChild(circle);
        }
      });
    };
    // Attach to parent for correct event bubbling
    const parent = svg.parentElement;
    parent?.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', resize);
      parent?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
        zIndex: 2,
        overflow: 'visible',
      }}
    />
  );
}
