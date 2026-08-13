import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { CiShoppingCart } from "react-icons/ci";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  resetCartShake,
  resetFavoritesShake,
  setCartLoading,
  showLoginPrompt,
} from "../store/uiSlice";
import { removeUser } from "../store/userSlice";
import { clearFavorites, saveFavoritesForUser } from "../store/favoritesSlice";
import { useDispatch } from "react-redux";
import { Heart, User, Loader, Menu, X, ChevronDown, LogOut, Search } from "lucide-react";
import { CATEGORIES } from "../constants/categories";

export default function Header({ onCartClick, isCartOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = Boolean(user?.user?.email);
  const cartItems = useSelector((state) => state.cart.cart); // Redux cart state
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0); // total items
  const favorites = useSelector((state) => state.favorites.favorites);
  const favoritesCount = favorites.length;
  const favoritesViewed = useSelector((state) => state.favorites.viewed);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isMobileShopOpen, setIsMobileShopOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const shakeCart = useSelector((state) => state.ui.shakeCart);

  const [shake, setShake] = useState(false);
  const [shakeFav, setShakeFav] = useState(false);
  const shakeFavorites = useSelector((state) => state.ui.shakeFavorites);
  const cartLoading = useSelector((state) => state.ui.cartLoading);

  const shopRef = useRef(null);
  const accountRef = useRef(null);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  const runSearch = (query) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setIsSearchOpen(false);
    navigate(`/products?search=${encodeURIComponent(trimmed)}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    runSearch(searchQuery);
  };

  const handleLogout = () => {
    const userEmail = user?.user?.email || user?.email;
    if (userEmail) dispatch(saveFavoritesForUser(userEmail));
    dispatch(removeUser());
    dispatch(clearFavorites());
    setIsAccountOpen(false);
    navigate("/");
  };

  useEffect(() => {
    if (shakeCart) {
      setShake(true);

      const timer = setTimeout(() => {
        setShake(false);
        dispatch(resetCartShake());
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [shakeCart]);

  useEffect(() => {
    if (shakeFavorites) {
      setShakeFav(true);

      const timer = setTimeout(() => {
        setShakeFav(false);
        dispatch(resetFavoritesShake());
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [shakeFavorites]);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsMobileShopOpen(false);
    setIsShopOpen(false);
    setIsAccountOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (shopRef.current && !shopRef.current.contains(e.target)) {
        setIsShopOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setIsAccountOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      setSuggestions([]);
      setSuggestionsLoading(false);
      return;
    }
    setSuggestionsLoading(true);
    const timeout = setTimeout(async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/products/search-suggestions`,
          { params: { q: trimmed } },
        );
        setSuggestions(res.data);
      } catch (error) {
        console.error("Error fetching search suggestions:", error);
      } finally {
        setSuggestionsLoading(false);
      }
    }, 250);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 w-full">
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="flex items-center justify-between h-16">
          {/* Left: logo + nav */}
          <div className="flex items-center space-x-6">
            <button
              type="button"
              className="md:hidden p-2 -ml-2 rounded-full hover:bg-gray-100 cursor-pointer"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
            <div
              className="text-2xl font-extrabold tracking-tight cursor-pointer"
              onClick={() => navigate("/")}
            >
              REPSE
            </div>
            <nav className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
              <a
                onClick={() => navigate("/")}
                className={`cursor-pointer hover:text-gray-900 transition-colors ${
                  location.pathname === "/" ? "text-gray-900 font-medium" : ""
                }`}
              >
                Home
              </a>

              {/* Shop dropdown */}
              <div className="relative" ref={shopRef}>
                <button
                  onClick={() => setIsShopOpen((open) => !open)}
                  className={`flex items-center gap-1 cursor-pointer hover:text-gray-900 transition-colors ${
                    location.pathname === "/products" ? "text-gray-900 font-medium" : ""
                  }`}
                  aria-expanded={isShopOpen}
                >
                  Shop
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${isShopOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isShopOpen && (
                  <div className="absolute left-0 top-full mt-3 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    <a
                      onClick={() => navigate("/products")}
                      className="block px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 cursor-pointer"
                    >
                      All Products
                    </a>
                    <div className="my-1 border-t border-gray-100" />
                    {CATEGORIES.map((c) => (
                      <a
                        key={c.slug}
                        onClick={() => navigate(`/products?category=${c.slug}`)}
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 cursor-pointer"
                      >
                        {c.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>

          <div className="flex-1" />

          {/* Right: icons */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              {/* Search */}
              <div className="relative" ref={searchRef}>
                <button
                  onClick={() => setIsSearchOpen((open) => !open)}
                  className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
                  aria-label="Search"
                  aria-expanded={isSearchOpen}
                >
                  <Search strokeWidth={1.7} className="w-[22px] h-[22px]" />
                </button>

                {isSearchOpen && (
                  <div className="absolute right-0 top-full mt-3 w-80 sm:w-96 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
                    <form onSubmit={handleSearchSubmit} className="p-3 border-b border-gray-100">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          ref={searchInputRef}
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search products..."
                          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </div>
                    </form>

                    {searchQuery.trim() && (
                      <div className="max-h-80 overflow-y-auto py-2">
                        {suggestionsLoading ? (
                          <p className="px-4 py-3 text-sm text-gray-400">Searching...</p>
                        ) : suggestions.length === 0 ? (
                          <p className="px-4 py-3 text-sm text-gray-400">
                            No products found for "{searchQuery.trim()}"
                          </p>
                        ) : (
                          <>
                            {suggestions.map((product) => (
                              <a
                                key={product._id}
                                onClick={() => {
                                  setIsSearchOpen(false);
                                  navigate(`/product-details/${product._id}`);
                                }}
                                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer"
                              >
                                <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                  {product.images?.[0] && (
                                    <img
                                      src={product.images[0]}
                                      alt={product.name}
                                      className="w-full h-full object-cover"
                                    />
                                  )}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    {product.name}
                                  </p>
                                  <p className="text-xs text-gray-400">{product.category}</p>
                                </div>
                                <p className="text-sm font-semibold text-gray-900">
                                  ₹{product.price}
                                </p>
                              </a>
                            ))}
                            <div className="my-1 border-t border-gray-100" />
                            <button
                              onClick={() => runSearch(searchQuery)}
                              className="w-full text-left px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 cursor-pointer"
                            >
                              See all results for "{searchQuery.trim()}"
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  if (!user || Object.keys(user).length === 0) {
                    dispatch(showLoginPrompt());
                  } else {
                    navigate('/favourites');
                  }
                }}
                className={`relative cursor-pointer hover:bg-gray-100 rounded-full p-2 ${
                  shakeFav ? "animate-cart-shake" : ""
                }`}
              >
                {location.pathname === '/favourites' ? <Heart fill="black" /> : <Heart strokeWidth={1.7} />}
                {favoritesCount > 0 && !favoritesViewed && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-red-500 rounded-full w-1 h-1"></span>
                )}
              </button>
              <button
                className={`relative cursor-pointer hover:bg-gray-100 rounded-full p-2 ${
                  shake ? "animate-cart-shake" : ""
                }`}
                onClick={() => {
                  dispatch(setCartLoading(true));
                  onCartClick();
                  setTimeout(() => dispatch(setCartLoading(false)), 500);
                }}
              >
                {cartLoading ? (
                  <Loader className="animate-spin w-7 h-7" />
                ) : (
                  <CiShoppingCart size={28} strokeWidth={0.18} />
                )}
                {cartCount > 0 && (
                  <span
                    className="absolute top-4 right-2 transform translate-x-1/2 -translate-y-1/2
                     bg-black text-white rounded-full w-4 h-4 text-xs flex items-center justify-center
                     pointer-events-none"
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Account dropdown */}
              <div className="relative" ref={accountRef}>
                <button
                  className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
                  onClick={() => setIsAccountOpen((open) => !open)}
                  aria-expanded={isAccountOpen}
                  aria-label="Account menu"
                >
                  <User strokeWidth={1.5} />
                </button>

                {isAccountOpen && (
                  <div className="absolute right-0 top-full mt-3 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    {isLoggedIn ? (
                      <>
                        <div className="px-4 py-2 border-b border-gray-100 mb-1">
                          <p className="text-xs text-gray-400">Signed in as</p>
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {user.user.name || user.user.email}
                          </p>
                        </div>
                        <a
                          onClick={() => navigate("/profile")}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                        >
                          <User className="w-4 h-4" /> Profile & Orders
                        </a>
                        <a
                          onClick={() => navigate("/favourites")}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                        >
                          <Heart className="w-4 h-4" /> Favourites
                        </a>
                        <div className="my-1 border-t border-gray-100" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer text-left"
                        >
                          <LogOut className="w-4 h-4" /> Log out
                        </button>
                      </>
                    ) : (
                      <>
                        <a
                          onClick={() => navigate("/login")}
                          className="block px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 cursor-pointer"
                        >
                          Log in
                        </a>
                        <a
                          onClick={() => navigate("/register")}
                          className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 cursor-pointer"
                        >
                          Create account
                        </a>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile nav panel */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-200 ease-in-out border-t border-gray-200 ${
          isMenuOpen ? "max-h-96" : "max-h-0 border-t-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-3 text-sm text-gray-700">
          <a
            onClick={() => navigate("/")}
            className={`py-2 cursor-pointer hover:text-gray-900 ${
              location.pathname === "/" ? "text-gray-900 font-medium" : ""
            }`}
          >
            Home
          </a>

          <button
            onClick={() => setIsMobileShopOpen((open) => !open)}
            className="flex items-center justify-between py-2 cursor-pointer hover:text-gray-900"
            aria-expanded={isMobileShopOpen}
          >
            Shop
            <ChevronDown
              className={`w-4 h-4 transition-transform ${isMobileShopOpen ? "rotate-180" : ""}`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-200 ${
              isMobileShopOpen ? "max-h-72" : "max-h-0"
            }`}
          >
            <div className="flex flex-col pl-4 border-l border-gray-200 ml-1 mb-2">
              <a
                onClick={() => navigate("/products")}
                className="py-1.5 cursor-pointer text-gray-900 font-medium"
              >
                All Products
              </a>
              {CATEGORIES.map((c) => (
                <a
                  key={c.slug}
                  onClick={() => navigate(`/products?category=${c.slug}`)}
                  className="py-1.5 cursor-pointer text-gray-600 hover:text-gray-900"
                >
                  {c.label}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
