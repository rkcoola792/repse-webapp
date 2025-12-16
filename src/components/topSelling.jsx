import React from 'react';
import ProductCard from './products/productCard';
import { useNavigate } from 'react-router-dom';
const TopSelling = ({products}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-black text-center mb-12 tracking-tight">
          TOP SELLING 
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {products?.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="text-center" onClick={() => navigate("/products")}>
          <button className="px-8 py-3 border-2 border-gray-200 rounded-full cursor-pointer font-medium hover:bg-gray-50 transition-colors">
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopSelling;