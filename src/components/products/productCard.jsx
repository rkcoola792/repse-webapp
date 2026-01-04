import { Heart } from "lucide-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToFavorites, removeFromFavorites } from "../../store/favoritesSlice";
import { triggerFavoritesShake, showPopup, showLoginPrompt } from "../../store/uiSlice";

const ProductCard = ({ images, name, price, _id ,description}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);
  const user = useSelector((state) => state.user.user);
  const isFavorite = favorites.some(item => item.id === _id);
  const [isProcessing, setIsProcessing] = useState(false);

  const userEmail = user?.user?.email || user?.email;

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-sm  transition-shadow max-w-xs cursor-pointer"
      onClick={() => navigate(`/product-details/${_id}`)}
    >
      {/* Image Container */}
      <div className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-950 aspect-square">
        <img
          src={images && images[0]}
          alt={name}
          className="w-full h-full object-cover"
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
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorite ? "fill-red-500 stroke-red-500" : "stroke-white"
            }`}
          />
        </button>

        {/* Badge */}
        {/* <div className="absolute top-4 left-4 bg-purple-600/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded">
          OVERSIZED FIT
        </div> */}

        {/* Bottom Badge */}
        {/* <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded">
          PREMIUM HEAVY FLEECE
        </div> */}
      </div>

      {/* Product Info */}
      <div className="p-3">
        <h3 className="text-gray-900 font-medium mb-1">{name}</h3>
        {/* <p className="text-gray-500 text-sm mb-2">{description}</p> */}
        <p className="text-gray-900 font-semibold text-base">₹ {price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
