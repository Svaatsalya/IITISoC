import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const shapes = [
  { size: 40, color: '#c084fc' },
  { size: 30, color: '#a78bfa' },
  { size: 50, color: '#d8b4fe' },
  { size: 35, color: '#e879f9' },
  { size: 45, color: '#a855f7' },
];

export default function FloatingShapes() {
  const containerRef = useRef(null);

  useEffect(() => {
    const targets = containerRef.current.querySelectorAll('.float-shape');
    targets.forEach((shape, index) => {
      gsap.to(shape, {
        y: 'random(-60, 60)',
        x: 'random(-60, 60)',
        scale: 'random(0.8, 1.2)',
        duration: 6 + Math.random() * 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.5,
      });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {shapes.map((shape, index) => (
        <div
          key={index}
          className="float-shape absolute rounded-full opacity-30"
          style={{
            width: shape.size,
            height: shape.size,
            backgroundColor: shape.color,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        ></div>
      ))}
    </div>
  );
}
