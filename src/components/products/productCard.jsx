import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ imageUrl, title, rating, reviews, price, originalPrice, discount }) => {
  const navigate=useNavigate()
  return (
    <div className="bg-gray-100 rounded-lg p-6 flex flex-col" onClick={()=>navigate('/product-details/1')}>
      <div className="bg-white rounded-lg mb-4 flex items-center justify-center h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-contain"
        />
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <div className="flex items-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">{reviews}/5</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-bold text-xl text-gray-900">${price}</span>
        {originalPrice && (
          <>
            <span className="text-gray-400 line-through">${originalPrice}</span>
            <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">
              -{discount}%
            </span>
          </>
        )}
      </div>
    </div>
  );
};
export default ProductCard;