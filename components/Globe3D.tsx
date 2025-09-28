'use client';

import { useEffect, useRef } from 'react';

export default function Globe3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation variables
    let rotation = 0;
    const floatPoints: { lat: number; lon: number; active: boolean }[] = [];

    // Generate random float points
    for (let i = 0; i < 150; i++) {
      floatPoints.push({
        lat: (Math.random() - 0.5) * 180,
        lon: (Math.random() - 0.5) * 360,
        active: Math.random() > 0.3
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
      );
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0.8)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.9)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw globe outline
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.3;

      // Globe sphere
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw latitude lines
      for (let lat = -60; lat <= 60; lat += 30) {
        const y = centerY + (lat / 90) * radius * 0.8;
        const width = Math.cos((lat * Math.PI) / 180) * radius * 0.9;
        
        ctx.beginPath();
        ctx.ellipse(centerX, y, width, radius * 0.1, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw longitude lines
      for (let lon = 0; lon < 360; lon += 30) {
        const angle = ((lon + rotation) * Math.PI) / 180;
        const x1 = centerX + Math.sin(angle) * radius;
        const x2 = centerX - Math.sin(angle) * radius;
        
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, Math.abs(x1 - centerX), radius, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw float points
      floatPoints.forEach(point => {
        const lonRad = ((point.lon + rotation) * Math.PI) / 180;
        const latRad = (point.lat * Math.PI) / 180;
        
        // 3D projection
        const x = centerX + Math.cos(latRad) * Math.sin(lonRad) * radius * 0.9;
        const y = centerY + Math.sin(latRad) * radius * 0.9;
        const z = Math.cos(latRad) * Math.cos(lonRad);
        
        // Only draw points on the visible hemisphere
        if (z > 0) {
          ctx.beginPath();
          ctx.arc(x, y, point.active ? 3 : 2, 0, Math.PI * 2);
          ctx.fillStyle = point.active 
            ? `rgba(34, 197, 94, ${0.8 + Math.sin(Date.now() * 0.003) * 0.2})` 
            : 'rgba(156, 163, 175, 0.6)';
          ctx.fill();
          
          // Add glow effect for active floats
          if (point.active) {
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(34, 197, 94, 0.1)';
            ctx.fill();
          }
        }
      });

      // Add subtle rotation
      rotation += 0.2;
      if (rotation >= 360) rotation = 0;

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}
    />
  );
}