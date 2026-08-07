import React from 'react';
import ProductCard from './products/productCard';
import ProductCardSkeleton from './products/productCardSkeleton';
import { useNavigate } from 'react-router-dom';

const TopSelling = ({ products, loading }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50">
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-10">
        <div className="text-center mb-8 sm:mb-12">
          <p className="flex items-center justify-center gap-3 text-gray-400 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase mb-3">
            <span className="w-8 h-px bg-gray-300" />
            Fan Favorites
            <span className="w-8 h-px bg-gray-300" />
          </p>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            TOP SELLING
          </h1>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 mb-8">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            : products?.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
        </div>

        {!loading && products?.length === 0 && (
          <p className="text-center text-gray-500 mb-8">
            Top sellers will show up here once orders start coming in.
          </p>
        )}

        <div className="text-center" onClick={() => navigate("/products")}>
          <button className="px-6 py-2 sm:px-8 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-full cursor-pointer font-medium bg-white hover:bg-gray-100 transition-colors">
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopSelling;