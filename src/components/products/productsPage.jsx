import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { X, ChevronDown, Check } from "lucide-react";
import ProductCard from "./productCard";
import ProductCardSkeleton from "./productCardSkeleton";
import { CATEGORIES } from "../../constants/categories";

const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export default function ProductPage() {
  const [page] = useState(1);
  const limit = 20;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("popular");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const categorySlug = searchParams.get("category");
  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  const activeSort = SORT_OPTIONS.find((opt) => opt.value === sortBy);

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/products?page=${page}&limit=${limit}`,
        { withCredentials: true },
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (!category) return products;
    const keyword = category.label.toLowerCase();
    return products.filter((p) =>
      `${p.name || ""} ${p.description || ""} ${p.category || ""}`
        .toLowerCase()
        .includes(keyword),
    );
  }, [products, category]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === "popular") {
      list.sort((a, b) => (b.topSelling === true) - (a.topSelling === true));
    }
    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [filteredProducts, sortBy]);

  const clearCategory = () => {
    const next = new URLSearchParams(searchParams);
    next.delete("category");
    setSearchParams(next);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page banner */}
      <div className="bg-black py-10 sm:py-14">
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-16">
          <p className="flex items-center gap-3 text-white/60 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase mb-3">
            <span className="w-8 h-px bg-white/60" />
            Shop
          </p>
          <h1 className="text-white font-black uppercase tracking-tight text-3xl sm:text-5xl">
            {category ? category.label : "All Products"}
          </h1>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-16 py-8 sm:py-12">
        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map((c) => (
            <button
              key={c.slug}
              onClick={() =>
                setSearchParams(
                  categorySlug === c.slug ? {} : { category: c.slug },
                )
              }
              className={`px-4 py-2 rounded-full text-sm font-medium border cursor-pointer transition-colors ${
                categorySlug === c.slug
                  ? "bg-black text-white border-black"
                  : "border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between mb-6 gap-3">
          <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
            <span>
              {loading
                ? "Loading products..."
                : `Showing ${sortedProducts.length} ${
                    sortedProducts.length === 1 ? "product" : "products"
                  }${category ? ` in "${category.label}"` : ""}`}
            </span>
            {category && (
              <button
                onClick={clearCategory}
                className="flex items-center gap-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full px-2 py-1 cursor-pointer transition-colors"
              >
                Clear <X className="w-3 h-3" />
              </button>
            )}
          </div>
          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setIsSortOpen((open) => !open)}
              aria-expanded={isSortOpen}
              className="flex items-center gap-2 border border-gray-300 rounded-lg px-3.5 py-2 text-sm font-medium text-gray-700 cursor-pointer hover:border-gray-400 transition-colors"
            >
              {activeSort?.label}
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform ${
                  isSortOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isSortOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-20">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSortBy(opt.value);
                      setIsSortOpen(false);
                    }}
                    className="w-full flex items-center justify-between gap-2 px-4 py-2 text-sm text-left hover:bg-gray-50 cursor-pointer"
                  >
                    <span
                      className={
                        opt.value === sortBy
                          ? "text-black font-medium"
                          : "text-gray-600"
                      }
                    >
                      {opt.label}
                    </span>
                    {opt.value === sortBy && (
                      <Check className="w-4 h-4 text-black" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {!loading && sortedProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-4">
              {category
                ? `No products found in "${category.label}" yet.`
                : "No products available right now."}
            </p>
            {category && (
              <button
                onClick={clearCategory}
                className="px-6 py-2 border-2 border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
              >
                View all products
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-px bg-gray-200">
            {loading
              ? Array.from({ length: limit }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))
              : sortedProducts.map((product) => (
                  <ProductCard key={product.id || product._id} {...product} />
                ))}
          </div>
        )}
      </div>
    </div>
  );
}
