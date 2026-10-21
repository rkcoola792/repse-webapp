import React, { useEffect, useRef, useState } from "react";
import api from "../api/axios";
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

const SEARCH_ENABLED = true;

export default function Header({ onCartClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = Boolean(user?.user?.email || user?.user?.mobile);
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
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
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
  const lastScrollY = useRef(0);

  useEffect(() => {
    const mobileViewport = window.matchMedia("(max-width: 767px)");
    lastScrollY.current = window.scrollY;

    const updateHeaderVisibility = () => {
      const currentScrollY = Math.max(0, window.scrollY);
      const movement = currentScrollY - lastScrollY.current;

      if (!mobileViewport.matches || isMenuOpen || isSearchOpen || isAccountOpen) {
        setIsHeaderHidden(false);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY < 80) {
        setIsHeaderHidden(false);
        lastScrollY.current = currentScrollY;
      } else if (Math.abs(movement) >= 8) {
        setIsHeaderHidden(movement > 0);
        lastScrollY.current = currentScrollY;
      }
    };

    const handleViewportChange = () => {
      if (!mobileViewport.matches) setIsHeaderHidden(false);
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", updateHeaderVisibility, { passive: true });
    mobileViewport.addEventListener("change", handleViewportChange);
    return () => {
      window.removeEventListener("scroll", updateHeaderVisibility);
      mobileViewport.removeEventListener("change", handleViewportChange);
    };
  }, [isMenuOpen, isSearchOpen, isAccountOpen]);

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

  const handleLogout = async () => {
    const userEmail = user?.user?.email || user?.email || user?.user?.mobile;
    if (userEmail) dispatch(saveFavoritesForUser(userEmail));
    try {
      await api.post("/signout");
    } catch (error) {
      console.error("Signout failed:", error);
    }
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
  }, [shakeCart, dispatch]);

  useEffect(() => {
    if (shakeFavorites) {
      setShakeFav(true);

      const timer = setTimeout(() => {
        setShakeFav(false);
        dispatch(resetFavoritesShake());
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [shakeFavorites, dispatch]);

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
        const res = await api.get("/products/search-suggestions", {
          params: { q: trimmed },
        });
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
    <header className={`sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm transition-transform duration-300 ease-out will-change-transform ${isHeaderHidden ? "-translate-y-full md:translate-y-0" : "translate-y-0"}`}>
      <div className="max-w-screen-2xl mx-auto px-3 sm:px-8 lg:px-16">
        <div className="flex items-center justify-between h-16">
          {/* Left: logo + nav */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-6">
            <button
              type="button"
              className="md:hidden shrink-0 p-2 -ml-1 rounded-full hover:bg-gray-100 cursor-pointer"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
            <div
              className="flex min-w-0 items-center gap-1.5 cursor-pointer"
              aria-label="REPSE home"
              onClick={() => navigate("/")}
            >
              <img src="/REPSE_logo.svg" alt="" className="h-6 w-auto shrink-0 sm:h-7 max-[360px]:hidden" />
              <span className="whitespace-nowrap text-xl font-extrabold tracking-tight min-[400px]:text-2xl">
                REPSE
              </span>
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
          <div className="ml-1 flex shrink-0 items-center sm:space-x-4">
            <div className="flex items-center gap-0 sm:gap-3">
              {/* Search */}
              {SEARCH_ENABLED && (
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
                  <div className="absolute right-0 top-full mt-3 w-[min(20rem,calc(100vw-1.5rem))] sm:w-96 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
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
                                  {(product.primaryImage || product.images?.[0]) && (
                                    <img
                                      src={product.primaryImage || product.images[0]}
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
              )}

              <button
                type="button"
                aria-label={`Open favourites${favoritesCount ? `, ${favoritesCount} saved` : ""}`}
                aria-pressed={location.pathname === "/favourites"}
                onClick={() => {
                  if (!user || Object.keys(user).length === 0) {
                    dispatch(showLoginPrompt());
                  } else {
                    navigate('/favourites');
                  }
                }}
                className={`relative hidden cursor-pointer hover:bg-gray-100 rounded-full p-2 md:flex ${
                  shakeFav ? "animate-cart-shake" : ""
                }`}
              >
                {location.pathname === '/favourites' ? <Heart fill="black" /> : <Heart strokeWidth={1.7} />}
                {favoritesCount > 0 && !favoritesViewed && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-red-500 rounded-full w-1 h-1"></span>
                )}
              </button>
              <button
                type="button"
                aria-label={`Open shopping bag${cartCount ? `, ${cartCount} items` : ""}`}
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
                  type="button"
                className="hidden p-2 rounded-full hover:bg-gray-100 cursor-pointer md:flex"
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
                            {user.user.name || user.user.email || user.user.mobile}
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
        className={`md:hidden overflow-y-auto transition-[max-height] duration-300 ease-in-out border-t border-gray-200 ${
          isMenuOpen ? "max-h-[80vh]" : "max-h-0 border-t-0"
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

          <div className="my-2 border-t border-gray-200" />
          <button
            type="button"
            onClick={() => {
              setIsMenuOpen(false);
              if (!isLoggedIn) dispatch(showLoginPrompt());
              else navigate("/favourites");
            }}
            className="flex min-h-11 items-center gap-3 py-2 text-left hover:text-gray-900"
          >
            <Heart className="h-4 w-4" />
            <span>Favourites</span>
            {favoritesCount > 0 && <span className="ml-auto text-xs text-gray-500">{favoritesCount}</span>}
          </button>
          {isLoggedIn ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/profile");
                }}
                className="flex min-h-11 items-center gap-3 py-2 text-left hover:text-gray-900"
              >
                <User className="h-4 w-4" /> Profile &amp; Orders
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                className="flex min-h-11 items-center gap-3 py-2 text-left text-red-600 hover:text-red-700"
              >
                <LogOut className="h-4 w-4" /> Log out
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/login");
                }}
                className="flex min-h-11 items-center gap-3 py-2 text-left hover:text-gray-900"
              >
                <User className="h-4 w-4" /> Log in or create an account
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
