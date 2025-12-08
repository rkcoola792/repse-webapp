import React from "react";
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import Face5Icon from "@mui/icons-material/Face5";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: logo + nav */}
          <div className="flex items-center space-x-6">
            <div className="text-2xl font-extrabold tracking-tight">REPSE</div>
            <nav className="hidden md:flex items-center space-x-4 text-sm text-gray-600">
              <a className="hover:text-gray-900">Shop</a>
              <a className="hover:text-gray-900">On Sale</a>
              <a className="hover:text-gray-900">New Arrivals</a>
              <a className="hover:text-gray-900">Brands</a>
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
            <button className="hidden sm:inline-block text-sm px-3 py-1 border rounded-md">
              Sign in
            </button>
            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <CiShoppingCart />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Face5Icon />
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
