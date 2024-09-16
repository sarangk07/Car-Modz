'use client';

// Import necessary React and GSAP libraries
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

const Demo2 = () => {
  useEffect(() => {
    // Parallax effect for background image
    gsap.to('.parallax-bg', {
      yPercent: 20, // Move the background image upwards
      ease: 'none',
      scrollTrigger: {
        trigger: '.parallax-section', // The section that triggers the parallax
        start: 'top bottom', // Start when the top of the section is at the bottom of the viewport
        end: 'bottom top', // End when the bottom of the section is at the top of the viewport
        scrub: true, // Smooth scrolling effect
      },
    });

    // Staggered text reveal animation
    gsap.from('.text-reveal', {
      scrollTrigger: {
        trigger: '.text-reveal-container', // The container that triggers the text reveal
        start: 'top 80%', // Start when the top of the container is 80% down the viewport
        end: 'bottom 20%', // End when the bottom of the container is 20% up the viewport
        toggleActions: 'play none none reverse', // Animation actions on enter, leave, enter back, and leave back
      },
      y: 50, // Move the text 50 pixels down at the start
      opacity: 0, // Start with the text fully transparent
      duration: 1.2, // Animation duration of 1.2 seconds
      ease: 'power4.out', // Smooth easing function
      stagger: 0.3, // Stagger the animation by 0.3 seconds for each element
    });
  }, []); // Empty dependency array means this effect runs only once after the component mounts

  return (
    <div>
      {/* Parallax background section */}
      <div className="parallax-section" style={{ height: '100vh', overflow: 'hidden', position: 'relative' }}>
        <div
          className="parallax-bg"
          style={{
            backgroundImage: 'url(https://via.placeholder.com/1920x1080)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        />
      </div>

      {/* Staggered text reveal section */}
      <div className="text-reveal-container" style={{ padding: '100px 20px', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
        <h1 className="text-reveal text-cyan-500" style={{ fontSize: '3rem', margin: '0' }}>
          Amazing Animations with GSAP & ScrollTrigger
        </h1>
        <h1 className="text-reveal text-cyan-500" style={{ fontSize: '3rem', margin: '0', marginTop: '1rem' }}>
          Experience Smooth Scrolling
        </h1>
      </div>

      {/* More content below */}
      <div style={{ height: '100vh', backgroundColor: '#f5f5f5' }}></div>
    </div>
  );
};

export default Demo2;
