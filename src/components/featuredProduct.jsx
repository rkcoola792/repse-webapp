import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function FeaturedProduct({ product, loading }) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <section className="bg-black py-16 sm:py-20">
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-16 grid md:grid-cols-2 gap-10 md:gap-16 items-center animate-pulse">
          <div className="aspect-4/5 bg-white/10" />
          <div className="space-y-4">
            <div className="h-3 w-24 bg-white/10" />
            <div className="h-10 w-3/4 bg-white/10" />
            <div className="h-4 w-full bg-white/10" />
            <div className="h-4 w-2/3 bg-white/10" />
          </div>
        </div>
      </section>
    );
  }

  if (!product) return null;

  const hasDiscount = product.originalPrice > product.price;

  return (
    <section className="bg-black py-16 sm:py-20">
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-16 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div
          className="relative aspect-4/5 bg-white/5 overflow-hidden cursor-pointer group"
          onClick={() => navigate(`/product-details/${product._id}`)}
        >
          {product.newArrival && (
            <span className="absolute top-5 left-5 z-10 bg-white text-black text-xs font-bold uppercase tracking-wide px-3 py-1.5">
              New Drop
            </span>
          )}
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div>
          <p className="flex items-center gap-3 text-white/50 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase mb-5">
            <span className="w-8 h-px bg-white/50" />
            Featured
          </p>

          <h2 className="text-white font-black uppercase tracking-tight leading-[0.95] text-3xl sm:text-5xl mb-5">
            {product.name}
          </h2>

          {product.description && (
            <p className="text-white/60 max-w-md text-sm sm:text-base leading-relaxed mb-7">
              {product.description}
            </p>
          )}

          <div className="flex items-center gap-3 mb-8">
            <span className="text-white font-bold text-2xl sm:text-3xl">
              ₹{product.price}
            </span>
            {hasDiscount && (
              <span className="text-white/40 line-through text-lg">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={() => navigate(`/product-details/${product._id}`)}
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-3.5 rounded-full text-sm font-semibold uppercase tracking-wide cursor-pointer hover:bg-gray-200 transition-colors"
          >
            View Product
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
