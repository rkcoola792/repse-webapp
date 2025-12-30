import React from 'react';

const StyleCard = ({ title, imageUrl, size = 'default' }) => {
  return (
    <div className={`relative bg-white rounded-3xl overflow-hidden ${
      size === 'large' ? 'col-span-2' : 'col-span-1'
    }`}>
      <div className="relative h-48 sm:h-72">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 sm:top-6 left-4 sm:left-8">
          <h3 className="text-xl sm:text-3xl font-bold text-gray-900">{title}</h3>
        </div>
      </div>
    </div>
  );
};

const BrowseByDressStyle = () => {
  const styles = [
    {
      id: 1,
      title: 'Casual',
      imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=400&fit=crop',
      size: 'default'
    },
    {
      id: 2,
      title: 'Formal',
      imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop',
      size: 'large'
    },
    {
      id: 3,
      title: 'Party',
      imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=400&fit=crop',
      size: 'large'
    },
    {
      id: 4,
      title: 'Gym',
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
      size: 'default'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-8 sm:py-12 lg:py-6">
        {/* View All Button */}
        {/* <div className="text-center mb-8">
          <button className="px-8 py-3 border-2 border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-colors">
            View All
          </button>
        </div> */}

        {/* Main Section */}
        <div className="bg-gray-100 rounded-3xl p-6 sm:p-12">
          <h1 className="text-3xl sm:text-5xl font-black text-center mb-8 sm:mb-12 tracking-tight">
            BROWSE BY DRESS STYLE
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Casual */}
            <StyleCard 
              title={styles[0].title}
              imageUrl={styles[0].imageUrl}
              size={styles[0].size}
            />
            
            {/* Formal */}
            <StyleCard 
              title={styles[1].title}
              imageUrl={styles[1].imageUrl}
              size={styles[1].size}
            />
            
            {/* Party - spans 2 columns */}
            <StyleCard 
              title={styles[2].title}
              imageUrl={styles[2].imageUrl}
              size={styles[2].size}
            />
            
            {/* Gym */}
            <StyleCard 
              title={styles[3].title}
              imageUrl={styles[3].imageUrl}
              size={styles[3].size}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseByDressStyle;