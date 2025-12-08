import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

const TestimonialCard = ({ name, verified, rating, review }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 min-w-[350px] max-w-[400px] flex-shrink-0">
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      
      <div className="flex items-center gap-2 mb-3">
        <h3 className="font-bold text-lg">{name}</h3>
        {verified && (
          <CheckCircle className="w-5 h-5 text-green-500 fill-green-500" />
        )}
      </div>
      
      <p className="text-gray-600 text-sm leading-relaxed">
        "{review}"
      </p>
    </div>
  );
};

const OurHappyCustomers = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      name: 'Sarah M.',
      verified: true,
      rating: 5,
      review: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."
    },
    {
      id: 2,
      name: 'Alex K.',
      verified: true,
      rating: 5,
      review: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."
    },
    {
      id: 3,
      name: 'James L.',
      verified: true,
      rating: 5,
      review: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."
    },
    {
      id: 4,
      name: 'Mooen',
      verified: true,
      rating: 5,
      review: "The customer service at Shop.co is exceptional. They helped me find the perfect outfit for my event and the quality exceeded my expectations. Highly recommend!"
    }
  ];

  const handleScroll = (direction) => {
    const container = document.getElementById('testimonials-container');
    if (container) {
      const scrollAmount = 370;
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="bg-white py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-5xl font-black tracking-tight">
            OUR HAPPY CUSTOMERS
          </h2>
          
          <div className="flex gap-3">
            <button
              onClick={() => handleScroll('left')}
              className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div 
          id="testimonials-container"
          className="flex gap-5 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurHappyCustomers;