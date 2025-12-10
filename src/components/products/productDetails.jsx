import React, { useState } from 'react';
import { ShoppingCart, Heart, Star, ChevronDown, Minus, Plus } from 'lucide-react';

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState('Large');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('reviews');

  const sizes = ['Small', 'Medium', 'Large', 'X-Large'];
  const colors = ['#2C3E50', '#34495E', '#7F8C8D'];

  const reviews = [
    {
      name: 'Samantha D.',
      verified: true,
      rating: 5,
      date: 'August 14, 2023',
      text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt."
    },
    {
      name: 'Olivia P.',
      verified: true,
      rating: 4,
      date: 'August 15, 2023',
      text: "One t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt."
    },
    {
      name: 'Liam K.',
      verified: true,
      rating: 5,
      date: 'August 16, 2023',
      text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for design."
    },
    {
      name: 'Ava H.',
      verified: true,
      rating: 4,
      date: 'August 17, 2023',
      text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter."
    }
  ];

  const recommendations = [
    { name: 'Polo with Contrast Trims', price: 212, oldPrice: 242, discount: 20, image: '🔵' },
    { name: 'Gradient Graphic T-shirt', price: 145, image: '🎨' },
    { name: 'Polo with Tipping Details', price: 180, image: '🔴' },
    { name: 'Black Striped T-shirt', price: 120, oldPrice: 160, discount: 30, image: '⚫' }
  ];

  return (
    <div className="min-h-screen bg-white">
    

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="text-sm text-gray-500">
          Home / Shop / Men / T-shirts / <span className="text-black">One Life Graphic T-shirt</span>
        </div>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-20 h-20 border rounded-lg bg-gray-100 flex items-center justify-center cursor-pointer hover:border-gray-400">
                  <span className="text-3xl">👕</span>
                </div>
              ))}
            </div>
            <div className="flex-1 bg-gray-100 rounded-2xl flex items-center justify-center p-12">
              <span className="text-9xl">👕</span>
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-bold mb-4">ONE LIFE GRAPHIC T-SHIRT</h1>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />
              </div>
              <span className="text-sm">4.5/5</span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold">$260</span>
              <span className="text-2xl text-gray-400 line-through">$300</span>
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">-40%</span>
            </div>

            <p className="text-gray-600 mb-6">
              This graphic t-shirt is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.
            </p>

            {/* Color Selection */}
            <div className="mb-6">
              <p className="text-sm mb-3">Select Colors</p>
              <div className="flex gap-3">
                {colors.map((color, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 cursor-pointer hover:border-gray-400"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <p className="text-sm mb-3">Choose Size</p>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-full border ${
                      selectedSize === size
                        ? 'bg-black text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex gap-4 mb-6">
              <div className="flex items-center gap-4 bg-gray-100 rounded-full px-6">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button className="flex-1 bg-black text-white py-4 rounded-full font-medium hover:bg-gray-800">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <div className="border-b flex gap-8">
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-4 ${activeTab === 'details' ? 'border-b-2 border-black' : 'text-gray-500'}`}
            >
              Product Details
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 ${activeTab === 'reviews' ? 'border-b-2 border-black' : 'text-gray-500'}`}
            >
              Rating & Reviews
            </button>
            <button
              onClick={() => setActiveTab('faqs')}
              className={`pb-4 ${activeTab === 'faqs' ? 'border-b-2 border-black' : 'text-gray-500'}`}
            >
              FAQs
            </button>
          </div>

          {/* Reviews Section */}
          {activeTab === 'reviews' && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">All Reviews <span className="text-gray-500">(451)</span></h2>
                <div className="flex gap-3">
                  <button className="px-4 py-2 border rounded-full text-sm">Latest</button>
                  <button className="px-6 py-2 bg-black text-white rounded-full text-sm">Write a Review</button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {reviews.map((review, i) => (
                  <div key={i} className="border rounded-2xl p-6">
                    <div className="flex mb-3">
                      {[...Array(review.rating)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-semibold">{review.name}</span>
                      {review.verified && (
                        <span className="text-green-600 text-xs">✓</span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{review.text}</p>
                    <p className="text-gray-400 text-xs">Posted on {review.date}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <button className="px-12 py-3 border rounded-full hover:bg-gray-50">Load More Reviews</button>
              </div>
            </div>
          )}
        </div>

        {/* Recommendations */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">YOU MIGHT ALSO LIKE</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {recommendations.map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="bg-gray-100 rounded-2xl mb-4 aspect-square flex items-center justify-center text-6xl group-hover:bg-gray-200 transition">
                  {item.image}
                </div>
                <h3 className="font-semibold mb-2">{item.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="font-bold">${item.price}</span>
                  {item.oldPrice && (
                    <>
                      <span className="text-gray-400 line-through">${item.oldPrice}</span>
                      <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs">
                        -{item.discount}%
                      </span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}