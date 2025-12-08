import React from 'react';
import ProductCard from './products/productCard';
const TopSelling = () => {
  const products = [
    {
      id: 1,
      title: 'T-shirt with Tape Details',
      rating: 4.5,
      reviews: '4.5',
      price: 120,
      imageUrl: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop',
    },
    {
      id: 2,
      title: 'Skinny Fit Jeans',
      rating: 3.5,
      reviews: '3.5',
      price: 240,
      originalPrice: 260,
      discount: 20,
      imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop',
    },
    {
      id: 3,
      title: 'Checkered Shirt',
      rating: 4.5,
      reviews: '4.5',
      price: 180,
      imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop',
    },
    {
      id: 4,
      title: 'Sleeve Striped T-shirt',
      rating: 4.5,
      reviews: '4.5',
      price: 130,
      originalPrice: 160,
      discount: 30,
      imageUrl: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=400&h=400&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-black text-center mb-12 tracking-tight">
          TOP SELLING 
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="text-center">
          <button className="px-8 py-3 border-2 border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-colors">
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopSelling;