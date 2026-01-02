import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import Face5Icon from "@mui/icons-material/Face5";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  resetCartShake,
  resetFavoritesShake,
  setCartLoading,
  showLoginPrompt,
} from "../store/uiSlice";
import { useDispatch } from "react-redux";
import { Heart, User, Loader } from "lucide-react";

export default function Header({ onCartClick, isCartOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const cartItems = useSelector((state) => state.cart.cart); // Redux cart state
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0); // total items
  const favorites = useSelector((state) => state.favorites.favorites);
  const favoritesCount = favorites.length;
  const favoritesViewed = useSelector((state) => state.favorites.viewed);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const shakeCart = useSelector((state) => state.ui.shakeCart);

  const [shake, setShake] = useState(false);
  const [shakeFav, setShakeFav] = useState(false);
  const shakeFavorites = useSelector((state) => state.ui.shakeFavorites);
  const cartLoading = useSelector((state) => state.ui.cartLoading);
  console.log("user",user.user);
  const handleProfileClick = () => {
    if (user?.user) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
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

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="flex items-center justify-between h-16">
          {/* Left: logo + nav */}
          <div className="flex items-center space-x-6">
            <div
              className="text-2xl font-extrabold tracking-tight cursor-pointer"
              onClick={() => navigate("/")}
            >
              REPSE
            </div>
            <nav className="hidden md:flex items-center space-x-4 text-sm text-gray-600">
              <a className="hover:text-gray-900 cursor-pointer">Shop</a>
              <a className="hover:text-gray-900 cursor-pointer">On Sale</a>
              <a className="hover:text-gray-900 cursor-pointer">New Arrivals</a>
              {/* <a className="hover:text-gray-900">Brands</a> */}
            </nav>
          </div>

          <div className="flex-1 px-4 hidden sm:flex justify-center">
            <div className="w-full max-w-xl">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <input
                  id="search"
                  className="w-full border border-gray-200 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  placeholder="Search for products..."
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <CiSearch />
                </div>
              </div>
            </div>
          </div>

          {/* Right: icons */}
          <div className="flex items-center space-x-4">
            {/* <button className="hidden sm:inline-block text-sm px-3 py-1 border rounded-md cursor-pointer">
              Sign in
            </button> */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  if (!user || Object.keys(user).length === 0) {
                    dispatch(showLoginPrompt());
                  } else {
                    navigate('/favourites');
                  }
                }}
                className={`relative cursor-pointer ${
                  shakeFav ? "animate-cart-shake" : ""
                }hover:bg-gray-100 rounded-full p-2`}
              >
                {location.pathname === '/favourites' ? <Heart fill="black" /> : <Heart strokeWidth={1.7} />}
                {favoritesCount > 0 && !favoritesViewed && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-red-500 rounded-full w-1 h-1"></span>
                )}
              </button>
              <button
                className={`relative cursor-pointer ${
                  shake ? "animate-cart-shake" : ""
                }hover:bg-gray-100 rounded-full p-2`}
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
              <button
                className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
                onClick={handleProfileClick}
              >
                <User strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// File: src/components/Hero.jsx

// // File: src/App.jsx
// import React from 'react';
// import Banner from './components/Banner';
// import Header from './components/Header';
// import Hero from './components/Hero';

// export default function App() {
//   return (
//     <div className="min-h-screen bg-white">
//       <Banner />
//       <Header />
//       <main>
//         <Hero />
//       </main>
//     </div>
//   );
// }

// Notes:
// 1) This project expects Tailwind CSS to be configured in your React app (create-react-app or Vite).
// 2) Place an appropriate hero image at public/hero-placeholder.jpg or import a local image and set <img src={hero} /> instead.
// 3) The layout is responsive: Header nav collapses on small screens; hero stacks vertically on small devices.
// 4) Copy each component into separate files as named above (src/components/...).
