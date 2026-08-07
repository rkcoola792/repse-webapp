import { Heart } from "lucide-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToFavorites, removeFromFavorites } from "../../store/favoritesSlice";
import { triggerFavoritesShake, showPopup, showLoginPrompt } from "../../store/uiSlice";

const ProductCard = ({
  images,
  name,
  price,
  originalPrice,
  category,
  newArrival,
  stock,
  _id,
  description,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);
  const user = useSelector((state) => state.user.user);
  const isFavorite = favorites.some((item) => item.id === _id);
  const [isProcessing, setIsProcessing] = useState(false);

  const userEmail = user?.user?.email || user?.email;
  const isSoldOut = stock === 0;
  const isLowStock = typeof stock === "number" && stock > 0 && stock <= 5;
  const hasDiscount = originalPrice > price;

  return (
    <div
      className={`group bg-white text-left pb-6 ${isSoldOut ? "" : "cursor-pointer"}`}
      onClick={() => !isSoldOut && navigate(`/product-details/${_id}`)}
    >
      {/* Image Container */}
      <div className="relative bg-gray-100 aspect-4/5 overflow-hidden">
        {(newArrival || isSoldOut || isLowStock) && (
          <span
            className={`absolute top-3 left-3 z-10 text-white text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 ${
              isSoldOut ? "bg-gray-500" : isLowStock ? "bg-red-600" : "bg-black"
            }`}
          >
            {isSoldOut ? "Sold Out" : isLowStock ? "Low Stock" : "New"}
          </span>
        )}

        <img
          src={images && images[0]}
          alt={name}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isSoldOut ? "opacity-50 grayscale" : "group-hover:scale-105"
          }`}
        />

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (isProcessing) return;
            if (!user || Object.keys(user).length === 0) {
              dispatch(showLoginPrompt());
              return;
            }
            setIsProcessing(true);
            if (isFavorite) {
              dispatch(removeFromFavorites({ id: _id, userEmail }));
              dispatch(showPopup({
                message: "Item removed from the wishlist",
                undoAction: 'add',
                itemData: { id: _id, name, price, images, description }
              }));
            } else {
              dispatch(addToFavorites({ id: _id, name, price, images, description, userEmail }));
              dispatch(triggerFavoritesShake());
              dispatch(showPopup({
                message: "Item added to wishlist",
                viewAction: 'favorites',
                itemData: { id: _id }
              }));
            }
            setTimeout(() => setIsProcessing(false), 500);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 shadow-sm flex items-center justify-center hover:bg-white transition-colors"
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorite ? "fill-red-500 stroke-red-500" : "stroke-gray-700"
            }`}
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="pt-3 px-3 sm:px-4">
        {category && (
          <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-1">
            {category}
          </p>
        )}
        <h3 className="text-gray-900 font-bold uppercase tracking-tight text-sm truncate group-hover:text-gray-600 transition-colors">
          {name}
        </h3>
        <p className="text-gray-900 font-semibold text-sm mt-1">
          ₹{price}
          {hasDiscount && (
            <span className="ml-2 text-gray-400 font-normal line-through">
              ₹{originalPrice}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
