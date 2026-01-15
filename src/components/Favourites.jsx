import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Trash2,
  Heart,
  MoreVertical,
  ChevronDown,
} from "lucide-react";

import { addItem } from "../store/cartSlice";
import {
  removeFromFavorites,
  setFavoritesViewed,
} from "../store/favoritesSlice";
import {
  triggerCartShake,
  setCartLoading,
  showLoginPrompt,
} from "../store/uiSlice";

export default function Favourites() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const favorites = useSelector((state) => state.favorites.favorites);

  const userEmail = user?.user?.email || user?.email;

  const [menuOpen, setMenuOpen] = useState(null);
  const [favoriteSizes, setFavoriteSizes] = useState({});

  const menuRef = useRef(null);

  useEffect(() => {
    if (userEmail) {
      dispatch(setFavoritesViewed(userEmail));
    }
  }, [dispatch, userEmail]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user || Object.keys(user).length === 0) {
    dispatch(showLoginPrompt());
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">
            Please log in to view your liked products.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8 flex items-baseline gap-2 sm:gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Your Favourites
          </h1>

          <p className="text-sm text-gray-600">
            ({favorites.length} {favorites.length === 1 ? "item" : "items"})
          </p>
        </div>

        {/* Empty State */}
        {favorites.length === 0 ? (
          <div className="text-center py-12 sm:py-20">
            <Heart className="w-12 h-12 sm:w-14 sm:h-14 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 mb-6">Your favourites list is empty</p>
            <button
              onClick={() => navigate("/products")}
              className="px-6 py-3 sm:px-8 bg-black text-white rounded-full"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          /* Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {favorites.map((item) => {
              const selectedSize = favoriteSizes[item.id] || item.selectedSize;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-lg overflow-hidden"
                >
                  {/* Image */}
                  <div
                    className="relative bg-gray-100 aspect-[5/4] sm:aspect-[1/1] overflow-hidden cursor-pointer"
                    onClick={() => navigate(`/product-details/${item.id}`)}
                  >
                    <img
                      src={item.images?.[0]}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />

                    {/* Discount */}
                    {item.discount && (
                      <span className="absolute bottom-3 left-3 bg-white text-xs font-semibold px-3 py-1 rounded-md shadow">
                        {item.discount}% OFF
                      </span>
                    )}

                    {/* Menu */}
                    <div className="absolute top-3 right-3">
                      <button
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenuOpen(menuOpen === item.id ? null : item.id);
                        }}
                        className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow cursor-pointer"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {menuOpen === item.id && (
                        <div
                          ref={menuRef}
                          className="
                        absolute right-0 mt-2 w-40
                        bg-white rounded-lg shadow-lg z-10
                        p-1 box-border
                      "
                          onMouseDown={(e) => e.stopPropagation()}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* Add to Cart */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(setCartLoading(true));

                              const size = selectedSize || "Large";

                              dispatch(
                                addItem({
                                  id: `${item.id}-${size}-${item.selectedColor}`,
                                  productId: item.id,
                                  name: item.name,
                                  price: item.price,
                                  size,
                                  color: item.selectedColor,
                                  quantity: 1,
                                  image: item.images?.[0],
                                })
                              );

                              setMenuOpen(null);
                              setTimeout(
                                () => dispatch(setCartLoading(false)),
                                400
                              );
                            }}
                            className="
                             w-full box-border
                             flex items-center gap-2
                             px-3 py-2
                             text-sm text-left
                             rounded-md
                             hover:bg-zinc-900
                            hover:text-zinc-100
                             transition-colors
                             cursor-pointer
                           "
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Add to Cart
                          </button>

                          {/* Remove */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(
                                removeFromFavorites({
                                  id: item.id,
                                  userEmail,
                                })
                              );
                              setMenuOpen(null);
                            }}
                            className="
                            w-full box-border
                            flex items-center gap-2
                            px-3 py-2
                            text-sm text-left
                            rounded-md
                            text-red-600
                            hover:bg-red-600
                            hover:text-white
                            transition-colors
                            cursor-pointer
                          "
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-2 sm:p-3 space-y-2">
                    <h3
                      className="text-sm font-semibold leading-snug cursor-pointer inline-block"
                      onClick={() => navigate(`/product-details/${item.id}`)}
                    >
                      {item.name}
                    </h3>

                    {item.fit && (
                      <p className="text-xs text-gray-500">{item.fit}</p>
                    )}

                    {item.selectedColor && (
                      <p className="text-xs text-gray-500">
                        {item.selectedColor}
                      </p>
                    )}

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">
                        €{item.price}
                      </span>
                      {item.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          €{item.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* Size */}
                    <div className="relative pt-2">
                      <select
                        value={
                          favoriteSizes[item.id] || item.selectedSize || ""
                        }
                        onChange={(e) =>
                          setFavoriteSizes((prev) => ({
                            ...prev,
                            [item.id]: e.target.value,
                          }))
                        }
                        className="
                        appearance-none w-full
                        border border-gray-300 rounded-md
                        px-3 pr-10 py-2
                        text-sm bg-white     outline-none focus:outline-none
                        focus:ring-0 focus:border-gray-500
                      "
                      >
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                        <option value="X-Large">X-Large</option>
                      </select>

                      {/* Controlled arrow */}
                      <ChevronDown
                        className="absolute right-3 top-1/2 -translate-y-1/2
                        w-4 h-4 text-gray-500 pointer-events-none"
                      />
                    </div>

                    {/* Add to cart */}
                    <button
                      disabled={!selectedSize}
                      onClick={() => {
                        dispatch(
                          addItem({
                            id: `${item.id}-${selectedSize}-${item.selectedColor}`,
                            productId: item.id,
                            name: item.name,
                            price: item.price,
                            size: selectedSize,
                            color: item.selectedColor,
                            quantity: 1,
                            image: item.images?.[0],
                          })
                        );
                        dispatch(triggerCartShake());
                      }}
                      className="w-full h-10 mt-3 rounded-md bg-black text-white text-sm font-medium disabled:bg-gray-300 cursor-pointer hover:bg-gray-800"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
