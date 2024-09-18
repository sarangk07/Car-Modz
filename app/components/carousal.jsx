'use client'

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const imgRefs = useRef([]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.to(imgRefs.current[currentIndex], {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 0.8,
      ease: 'power2.out'
    });

    imgRefs.current.forEach((img, index) => {
      if (index !== currentIndex) {
        gsap.to(img, {
          opacity: 0,
          x: 100,
          scale: 1.2,
          duration: 0.8,
          ease: 'power2.out'
        });
      }
    });
  }, [currentIndex]);

  return (
    <div ref={carouselRef} className="relative w-full h-64 md:h-96 overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          ref={el => imgRefs.current[index] = el}
          className="absolute top-0 left-0 w-full h-full"
          style={{ opacity: index === 0 ? 1 : 0 }}
        >
          <img
            src={image}
            alt={`Slide ${index + 1} Shop-AD`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
