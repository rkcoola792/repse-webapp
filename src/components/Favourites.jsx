import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Heart, ChevronDown, LayoutGrid, Package, Settings } from "lucide-react";

import { addItem } from "../store/cartSlice";
import {
  removeFromFavorites,
  setFavoritesViewed,
} from "../store/favoritesSlice";
import { triggerCartShake, showLoginPrompt } from "../store/uiSlice";

const SIDEBAR_ITEMS = [
  { label: "Overview", icon: LayoutGrid, to: "/profile" },
  { label: "Orders", icon: Package, to: "/profile" },
  { label: "Account Settings", icon: Settings, to: "/profile" },
];

export default function Favourites() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const favorites = useSelector((state) => state.favorites.favorites);

  const userEmail = user?.user?.email || user?.email;

  const [favoriteSizes, setFavoriteSizes] = useState({});

  useEffect(() => {
    if (userEmail) {
      dispatch(setFavoritesViewed(userEmail));
    }
  }, [dispatch, userEmail]);

  if (!user || Object.keys(user).length === 0) {
    dispatch(showLoginPrompt());
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">
            Please log in to view your liked products.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page banner */}
      <div className="bg-black py-10 sm:py-14">
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-16">
          <p className="flex items-center gap-3 text-white/60 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase mb-3">
            <span className="w-8 h-px bg-white/60" />
            Saved Items
          </p>
          <h1 className="text-white font-black uppercase tracking-tight text-3xl sm:text-5xl">
            Your Favourites
          </h1>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-16 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-4 space-y-1">
              {SIDEBAR_ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => navigate(item.to)}
                  className="w-full flex items-center gap-3 text-left px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
              <button
                className="w-full flex items-center gap-3 text-left px-4 py-3 rounded-lg bg-gray-100 text-gray-900 font-medium cursor-default"
              >
                <Heart className="w-4 h-4" />
                Favourites
              </button>
            </div>
          </div>

          {/* Main */}
          <div className="col-span-12 lg:col-span-9">
            <p className="text-sm text-gray-600 mb-6">
              {favorites.length} {favorites.length === 1 ? "item" : "items"} saved
            </p>

            {/* Empty State */}
            {favorites.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm text-center py-16 sm:py-20">
                <Heart className="w-12 h-12 sm:w-14 sm:h-14 mx-auto text-gray-300 mb-4" />
                <h2 className="font-semibold text-gray-900 mb-1">No favourites yet</h2>
                <p className="text-gray-500 mb-6">
                  Save items you love and they'll show up here.
                </p>
                <button
                  onClick={() => navigate("/products")}
                  className="px-6 py-3 sm:px-8 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  Browse The Shop
                </button>
              </div>
            ) : (
              /* Grid */
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-px bg-gray-200">
                {favorites.map((item) => {
                  const selectedSize = favoriteSizes[item.id] || item.selectedSize;

                  return (
                    <div key={item.id} className="bg-white pb-6">
                      {/* Image */}
                      <div
                        className="relative bg-gray-100 aspect-4/5 overflow-hidden cursor-pointer"
                        onClick={() => navigate(`/product-details/${item.id}`)}
                      >
                        <img
                          src={item.images?.[0]}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />

                        {item.originalPrice > item.price && (
                          <span className="absolute bottom-3 left-3 bg-black text-white text-[11px] font-bold uppercase tracking-wide px-2.5 py-1">
                            Sale
                          </span>
                        )}

                        {/* Remove from favourites */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(
                              removeFromFavorites({ id: item.id, userEmail })
                            );
                          }}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 shadow-sm flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
                          aria-label="Remove from favourites"
                        >
                          <Heart className="w-4 h-4 fill-red-500 stroke-red-500" />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="pt-3 px-3 sm:px-4">
                        <h3
                          className="text-sm font-bold uppercase tracking-tight truncate cursor-pointer"
                          onClick={() => navigate(`/product-details/${item.id}`)}
                        >
                          {item.name}
                        </h3>

                        {item.selectedColor && (
                          <p className="text-xs text-gray-500 mt-1">
                            {item.selectedColor}
                          </p>
                        )}

                        {/* Price */}
                        <p className="text-sm font-semibold mt-1">
                          ₹{item.price}
                          {item.originalPrice > item.price && (
                            <span className="ml-2 text-xs text-gray-400 font-normal line-through">
                              ₹{item.originalPrice}
                            </span>
                          )}
                        </p>

                        {/* Size */}
                        <div className="relative mt-3">
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
                            className="appearance-none w-full border border-gray-300 rounded-md px-3 pr-10 py-2 text-sm bg-white outline-none focus:outline-none focus:ring-0 focus:border-gray-500 cursor-pointer"
                          >
                            <option value="" disabled>
                              Select size
                            </option>
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Large">Large</option>
                            <option value="X-Large">X-Large</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
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
                          className="w-full h-10 mt-3 rounded-full bg-black text-white text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer hover:bg-gray-800 transition-colors"
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
      </div>
    </div>
  );
}
