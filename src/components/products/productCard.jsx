"use client";
import { Heart } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../../store/favoritesSlice";
import { triggerFavoritesShake, showPopup, showLoginPrompt } from "../../store/uiSlice";

const ProductCard = ({
  images,
  primaryImage,
  name,
  price,
  originalPrice,
  category,
  newArrival,
  variants,
  _id,
  description,
}) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);
  const user = useSelector((state) => state.user.user);
  const isFavorite = favorites.some((item) => item.id === _id);
  const [isProcessing, setIsProcessing] = useState(false);

  const userEmail = user?.user?.email || user?.email || user?.user?.mobile;
  const stock = variants?.reduce((sum, v) => sum + v.stock, 0);
  const isSoldOut = stock === 0;
  const isLowStock = typeof stock === "number" && stock > 0 && stock <= 5;
  const hasDiscount = originalPrice > price;
  const coverImage = primaryImage || images?.[0];
  const hoverImage = images?.find((image) => image !== coverImage);

  return (
    <article className={`group bg-white pb-6 ${isSoldOut ? "opacity-60" : ""}`}>
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

        <Link
          href={`/product-details/${_id}`}
          aria-label={`View ${name}${isSoldOut ? ", sold out" : ""}`}
          className="absolute inset-0 h-full w-full cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-black"
        >
          <img
            src={coverImage}
            alt=""
            loading="lazy"
            className={`h-full w-full object-cover transition-transform duration-300 ${
              isSoldOut ? "grayscale" : "group-hover:scale-105"
            }`}
          />
          {hoverImage && !isSoldOut && (
            <img
              src={hoverImage}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          )}
        </Link>

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
                itemData: { id: _id, name, price, images, primaryImage: coverImage, description }
              }));
            } else {
              dispatch(addToFavorites({ id: _id, name, price, images, primaryImage: coverImage, description, userEmail }));
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
          aria-label={isFavorite ? `Remove ${name} from favourites` : `Add ${name} to favourites`}
          aria-pressed={isFavorite}
          type="button"
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
        <Link
          href={`/product-details/${_id}`}
          className="block max-w-full truncate text-left text-sm font-bold uppercase tracking-tight text-gray-900 transition-colors hover:text-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          {name}
        </Link>
        <p className="text-gray-900 font-semibold text-sm mt-1">
          ₹{price}
          {hasDiscount && (
            <span className="ml-2 text-gray-400 font-normal line-through">
              ₹{originalPrice}
            </span>
          )}
        </p>
      </div>
    </article>
  );
};

export default ProductCard;
