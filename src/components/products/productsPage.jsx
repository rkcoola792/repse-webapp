import React, { useState } from 'react';
import { ChevronRight, ChevronDown, SlidersHorizontal } from 'lucide-react';

const products = [
  { id: 1, name: 'Gradient Graphic T-shirt', price: 145, rating: 3.5, reviews: 4.5, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop' },
  { id: 2, name: 'Polo with Tipping Details', price: 180, rating: 4.5, reviews: 4.5, image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop' },
  { id: 3, name: 'Black Striped T-shirt', price: 120, originalPrice: 160, discount: 30, rating: 5.0, reviews: 5.0, image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop' },
  { id: 4, name: 'Skinny Fit Jeans', price: 240, originalPrice: 260, discount: 20, rating: 3.5, reviews: 3.5, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop' },
  { id: 5, name: 'Checkered Shirt', price: 180, rating: 4.5, reviews: 4.5, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop' },
  { id: 6, name: 'Sleeve Striped T-shirt', price: 130, originalPrice: 160, discount: 30, rating: 4.5, reviews: 4.5, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop' },
  { id: 7, name: 'Vertical Striped Shirt', price: 212, originalPrice: 232, discount: 20, rating: 5.0, reviews: 5.0, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop' },
  { id: 8, name: 'Courage Graphic T-shirt', price: 145, rating: 4.0, reviews: 4.0, image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop' },
  { id: 9, name: 'Loose Fit Bermuda Shorts', price: 80, rating: 3.0, reviews: 3.0, image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop' }
];

export default function ProductPage() {
  const [priceRange, setPriceRange] = useState([50, 200]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    colors: true,
    size: true,
    dressStyle: true
  });

  const colors = [
    { name: 'green', class: 'bg-green-500' },
    { name: 'red', class: 'bg-red-500' },
    { name: 'yellow', class: 'bg-yellow-400' },
    { name: 'orange', class: 'bg-orange-500' },
    { name: 'cyan', class: 'bg-cyan-400' },
    { name: 'blue', class: 'bg-blue-600' },
    { name: 'purple', class: 'bg-purple-500' },
    { name: 'pink', class: 'bg-pink-500' },
    { name: 'white', class: 'bg-white border border-gray-300' },
    { name: 'black', class: 'bg-black' }
  ];

  const sizes = ['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large', '4X-Large'];
  const dressStyles = ['Casual', 'Formal', 'Party', 'Gym'];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleColor = (color) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const toggleSize = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <span key={star} className={star <= Math.floor(rating) ? 'text-yellow-400' : star - 0.5 <= rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
        ))}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <div className="w-72 border-r border-gray-200 p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Filters</h2>
          <SlidersHorizontal className="w-5 h-5 text-gray-400" />
        </div>

        {/* Filter Sections */}
        <div className="space-y-6">
          {/* Categories */}
          <div>
            {['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'].map(cat => (
              <div key={cat} className="flex items-center justify-between py-2 text-gray-600 hover:text-black cursor-pointer">
                <span>{cat}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => toggleSection('price')}>
              <h3 className="font-bold">Price</h3>
              {expandedSections.price ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </div>
            {expandedSections.price && (
              <div className="space-y-4">
                <div className="relative pt-2">
                  <input
                    type="range"
                    min="0"
                    max="300"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Colors */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => toggleSection('colors')}>
              <h3 className="font-bold">Colors</h3>
              {expandedSections.colors ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </div>
            {expandedSections.colors && (
              <div className="grid grid-cols-5 gap-3">
                {colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => toggleColor(color.name)}
                    className={`w-9 h-9 rounded-full ${color.class} ${selectedColors.includes(color.name) ? 'ring-2 ring-black ring-offset-2' : ''}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Size */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => toggleSection('size')}>
              <h3 className="font-bold">Size</h3>
              {expandedSections.size ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </div>
            {expandedSections.size && (
              <div className="grid grid-cols-2 gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`px-4 py-2 text-sm rounded-full ${selectedSizes.includes(size) ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dress Style */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => toggleSection('dressStyle')}>
              <h3 className="font-bold">Dress Style</h3>
              {expandedSections.dressStyle ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </div>
            {expandedSections.dressStyle && (
              <div>
                {dressStyles.map(style => (
                  <div key={style} className="flex items-center justify-between py-2 text-gray-600 hover:text-black cursor-pointer">
                    <span>{style}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800">
            Apply Filter
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span>Home</span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-black">Casual</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">Casual</h1>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">Showing 1-10 of 100 Products</p>
            <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm">
              <option>Most Popular</option>
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="group cursor-pointer">
              <div className="bg-gray-100 rounded-xl overflow-hidden mb-3 aspect-square">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <h3 className="font-bold text-lg mb-2">{product.name}</h3>
              <div className="flex items-center gap-2 mb-2">
                {renderStars(product.rating)}
                <span className="text-sm text-gray-600">{product.reviews}/5</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-gray-400 line-through">${product.originalPrice}</span>
                    <span className="text-red-500 text-sm bg-red-100 px-2 py-1 rounded-full">-{product.discount}%</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <span>← Previous</span>
          </button>
          <div className="flex gap-2">
            {[1, 2, 3, '...', 8, 9, 10].map((page, idx) => (
              <button
                key={idx}
                className={`w-10 h-10 rounded-lg ${page === 1 ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
              >
                {page}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <span>Next →</span>
          </button>
        </div>
      </div>
    </div>
  );
}