import React, { useState, useEffect } from 'react';

export default function CampaignSlider() {
  // Placeholders for camp. images
  const images = [
    'https://placehold.co/1200x400/e0f2fe/0369a1?text=Campaign+No1',
    'https://placehold.co/1200x400/fecaca/dc2626?text=Campaign+No2',
    'https://placehold.co/1200x400/dcfce7/16a34a?text=Campaign+No3',
    'https://placehold.co/1200x400/ffedd5/f97316?text=Campaign+No4',
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
        className="flex transition-transform duration-700 ease-in-out"
      
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
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full
                   hover:bg-opacity-75 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Önceki Slayt"
      >
        &#10094; {/* Left */}
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full
                   hover:bg-opacity-75 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Next"
      >
        &#10095; {/* Right */}
      </button>

      {/* Dot Nav */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? 'bg-white' : 'bg-gray-400 bg-opacity-70'
            } transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-white`}
            aria-label={`Slayt ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
