import React, { useState, useEffect } from 'react';

export default function CampaignSlider() {
  // Placeholders for camp. images
  const images = [
    'https://placehold.co/1200x400/lightgreen/black?text=Campaign+No1',
    'https://placehold.co/1200x400/lightblue/darkblue?text=Campaign+No2',
    'https://placehold.co/1200x400/dcfce7/16a34a?text=Campaign+No3',
    'https://placehold.co/1200x400/yellow/green?text=Campaign+No4',
  ];

  // Slide index
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide
  useEffect(() => {
    
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000);

    // Clear interval when components remove
    return () => clearInterval(interval);
  }, [images.length]); 

  //Next slide
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  // Previous slide
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-lg mb-8">
      {/* Slide images */}
      <div
        className="h-full flex transition-transform duration-700 ease-in-out"
      
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Campaing İmage ${index + 1}`}
            
            className="w-full h-64 md:h-96 lg:h-[500px] object-cover flex-shrink-0"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/1200x400/cccccc/333333?text=İmage+Not+Found'; }}
          />
        ))}
      </div>

      {/* Nav arrows */}
      <button
        onClick={prevSlide}
        className="absolute bottom-2 left-4 transform -translate-y-1/2  text-white text-[15px] font-black border border-white border-2 p-1 rounded-full
                   transition-all duration-500 focus:outline-none "
        aria-label="Previous"
      >
        &#10094; {/* Left */}
      </button>
      <button
        onClick={nextSlide}
        className="absolute bottom-2 left-30 transform -translate-y-1/2 text-white text-[15px] font-black border border-white border-2 p-1 rounded-full
                   transition-all duration-500 focus:outline-none "
        aria-label="Next"
      >
        &#10095; {/* Right */}
      </button>

      {/* Dot Nav */}
      <div className="absolute bottom-8 left-20 transform -translate-x-1/2 flex space-x-2 ">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? 'bg-gray-white border-white border-2' : 'bg-white bg-opacity-70 '
            } transition-colors duration-500 focus:outline-none`}
            aria-label={`Slayt ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
