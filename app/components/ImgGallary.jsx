'use client'

import React, { useState } from 'react';
import Start from './Start';

const ImageGallery = () => {
  const images = [
    {
      src: '/landingImg/li1.jpg',
      alt: 'Gallery Image 1',
    },
    {
      src: '/landingImg/li2.jpg',
      alt: 'Gallery Image 2',
    },
    {
      src: '/landingImg/li3.jpg',
      alt: 'Gallery Image 3',
    },
    {
      src: '/landingImg/li4.jpg',
      alt: 'Gallery Image 4',
    },
    {
      src: '/landingImg/li5.jpg',
      alt: 'Gallery Image 5',
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="relative flex flex-col justify-center items-center w-screen h-full overflow-hidden">
      <section className="container mx-auto  px-4 sm:px-6 md:px-8 h-screen flex items-center">
        <div className="flex gap-2 w-full mx-auto max-w-5xl h-[420px]">
          {images.map((image, index) => (
            <figure
              key={index}
              className={`relative overflow-hidden rounded-2xl cursor-pointer
                         transition-[flex-grow,transform] duration-[600ms] ease-in-out
                         ${hoveredIndex === index ? 'flex-grow' : 'flex-grow-0'}
                         ${hoveredIndex === null ? 'flex-grow-[0.2]' : 'flex-grow-[0.1]'}
                         ${hoveredIndex === index ? 'shadow-2xl' : 'shadow-md'}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={`object-cover w-full h-full
                           transition-all duration-[600ms] ease-in-out
                           ${hoveredIndex === index ? 
                             'scale-100 grayscale-0 opacity-100 saturate-100' : 
                             'scale-105 grayscale opacity-70 saturate-50'}`}
              />
            </figure>
          ))}
        </div>
      </section>

      
        <p className="absolute cursor-default text-gradient text-zinc-300 z-30 top-48 lg:top-16 font-sour md:text-9xl font-extrabold text-5xl">
        Torque Tribe
        </p>
        <p className=' absolute bottom-20 lg:bottom-10'>
            <Start/>
        </p>
      
    </div>
  );
};

export default ImageGallery;