import React from 'react';
import ProductCard from './products/productCard';
import { useNavigate } from 'react-router-dom';
const TopSelling = ({products}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-8">
        <h1 className="text-3xl sm:text-5xl font-black text-center mb-8 sm:mb-12 tracking-tight">
          TOP SELLING
        </h1>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {products?.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="text-center" onClick={() => navigate("/products")}>
          <button className="px-6 py-2 sm:px-8 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-full cursor-pointer font-medium hover:bg-gray-50 transition-colors">
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopSelling;