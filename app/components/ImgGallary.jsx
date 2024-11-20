'use client'

import React, { useState } from 'react';
import Start from './Start';

const ImageGallery = () => {
  const images = [
    {
      src: 'https://i.pinimg.com/736x/ae/36/9a/ae369a3ea509bba244b73bb2d5233ff1.jpg',
      alt: 'Gallery Image 1',
    },
    {
      src: 'https://i.pinimg.com/474x/8c/70/01/8c7001f45703e518ced25a72be8697c5.jpg',
      alt: 'Gallery Image 2',
    },
    {
      src: 'https://i.pinimg.com/236x/30/b6/29/30b629fcfb3b2f0269db1ba1b3aaf591.jpg',
      alt: 'Gallery Image 3',
    },
    {
      src: 'https://i.pinimg.com/236x/65/53/9f/65539ff421f7bc14b5cba49c5232870a.jpg',
      alt: 'Gallery Image 4',
    },
    {
      src: 'https://i.pinimg.com/236x/be/87/97/be8797872fb254cf6903178150a59411.jpg',
      alt: 'Gallery Image 5',
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="relative flex flex-col justify-center items-center w-full h-screen overflow-hidden">
      <section className="container mx-auto py-4 px-4 sm:px-6 md:px-8 h-full flex items-center">
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

      
        <p className="absolute cursor-default text-gradient text-zinc-300 z-30 top-16 font-sour md:text-9xl font-extrabold text-4xl">
          Mode Arena
        </p>
        <p className='absolute bottom-10'>
            <Start/>
        </p>
      
    </div>
  );
};

export default ImageGallery;