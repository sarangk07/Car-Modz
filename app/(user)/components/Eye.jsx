
'use client'

// components/Eye.js
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const Eye = () => {
  const eyeRef = useRef(null);
  const pupilRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const eye = eyeRef.current;
      const pupil = pupilRef.current;
      const eyeRect = eye.getBoundingClientRect();

      const eyeCenterX = eyeRect.left + eyeRect.width / 2;
      const eyeCenterY = eyeRect.top + eyeRect.height / 2;

      const angle = Math.atan2(event.clientY - eyeCenterY, event.clientX - eyeCenterX);
      const distance = Math.min(eyeRect.width / 4, Math.hypot(event.clientX - eyeCenterX, event.clientY - eyeCenterY) / 10);

      const pupilX = distance * Math.cos(angle);
      const pupilY = distance * Math.sin(angle);

      gsap.to(pupil, {
        x: pupilX,
        y: pupilY,
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="eye z-20" ref={eyeRef}>
      <div className="pupil" ref={pupilRef}></div>
      <style jsx>{`
        .eye {
          width: 100px;
          height: 100px;
          background-color: white;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .pupil {
          width: 30px;
          height: 30px;
          background-color: black;
          border-radius: 50%;
          position: absolute;
        }
      `}</style>
    </div>
  );
};

export default Eye;
