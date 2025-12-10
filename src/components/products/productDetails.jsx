import React, { useState } from 'react';
import { Star, Minus, Plus } from 'lucide-react';

export default function ProductPage() {
  const [selectedColor, setSelectedColor] = useState('olive');
  const [selectedSize, setSelectedSize] = useState('Large');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const colors = [
    { name: 'olive', color: '#6B7245' },
    { name: 'forest', color: '#2F4538' },
    { name: 'navy', color: '#1E293B' }
  ];

  const sizes = ['Small', 'Medium', 'Large', 'X-Large'];

  const thumbnails = [
    '/api/placeholder/100/100',
    '/api/placeholder/100/100',
    '/api/placeholder/100/100'
  ];

  const handleQuantityChange = (type) => {
    if (type === 'increment') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center text-sm text-gray-500 space-x-2">
          <span>Home</span>
          <span>›</span>
          <span>Shop</span>
          <span>›</span>
          <span>Men</span>
          <span>›</span>
          <span className="text-gray-900">T-shirts</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Images */}
          <div className="flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-4 overflow-x-auto sm:overflow-visible">
              {thumbnails.map((thumb, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 border-2 rounded-lg overflow-hidden transition-all ${
                    selectedImage === index ? 'border-gray-900' : 'border-gray-200'
                  }`}
                >
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gray-600 rounded"></div>
                  </div>
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
              <div className="w-3/4 h-3/4 bg-gray-600 rounded-lg"></div>
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              ONE LIFE GRAPHIC T-SHIRT
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />
              </div>
              <span className="text-sm text-gray-600">4.5/5</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold text-gray-900">$260</span>
              <span className="text-2xl text-gray-400 line-through">$300</span>
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                -40%
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed">
              This graphic t-shirt which is perfect for any occasion. Crafted from a soft and
              breathable fabric, it offers superior comfort and style.
            </p>

            <hr className="mb-6" />

            {/* Colors */}
            <div className="mb-6">
              <h3 className="text-sm text-gray-600 mb-3">Select Colors</h3>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full transition-all ${
                      selectedColor === color.name
                        ? 'ring-2 ring-offset-2 ring-gray-900'
                        : 'hover:ring-2 hover:ring-offset-2 hover:ring-gray-300'
                    }`}
                    style={{ backgroundColor: color.color }}
                  />
                ))}
              </div>
            </div>

            <hr className="mb-6" />

            {/* Sizes */}
            <div className="mb-6">
              <h3 className="text-sm text-gray-600 mb-3">Choose Size</h3>
              <div className="grid grid-cols-4 gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-4 rounded-full text-sm font-medium transition-all ${
                      selectedSize === size
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <hr className="mb-6" />

            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center bg-gray-100 rounded-full px-5 py-3 gap-6">
                <button
                  onClick={() => handleQuantityChange('decrement')}
                  className="text-gray-700 hover:text-gray-900"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-lg font-medium min-w-[20px] text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange('increment')}
                  className="text-gray-700 hover:text-gray-900"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button className="flex-1 bg-black text-white py-4 px-8 rounded-full font-medium hover:bg-gray-800 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}