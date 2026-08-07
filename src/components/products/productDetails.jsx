import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Heart,
  Star,
  ChevronDown,
  Minus,
  Plus,
  ArrowRight,
  Truck,
  Shirt,
  Info,
} from "lucide-react";
import { addItem } from "../../store/cartSlice";
import { openCart, showPopup, setCartView } from "../../store/uiSlice";
import { addToFavorites, removeFromFavorites } from "../../store/favoritesSlice";
import { triggerFavoritesShake, triggerCartShake } from "../../store/uiSlice";
import axios from "axios";
import ProductCard from "./productCard";

const SIZES = ["Small", "Medium", "Large", "X-Large"];

export default function ProductDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.favorites.favorites);
  const [selectedSize, setSelectedSize] = useState("Large");
  const [selectedColor] = useState("#2C3E50");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [openSection, setOpenSection] = useState("details");

  const [product, setProduct] = useState(null);
  const [suggestionProducts, setSuggestionProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const isFavorite = favorites.some((item) => item.id === product?._id);
  const hasDiscount = product?.originalPrice > product?.price;
  const discountPercent = hasDiscount
    ? Math.round(100 - (product.price / product.originalPrice) * 100)
    : 0;

  const toggleSection = (key) =>
    setOpenSection((prev) => (prev === key ? null : key));

  const handleAddToCart = () => {
    const cartItem = {
      id: `${product._id}-${selectedSize}-${selectedColor}`,
      productId: product._id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity,
      image: product.images?.[0],
    };

    dispatch(addItem(cartItem));
    dispatch(setCartView("cart"));
    dispatch(openCart());
    dispatch(triggerCartShake());
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites({ id: product._id }));
      dispatch(
        showPopup({
          message: "Item removed from the wishlist",
          undoAction: "add",
          itemData: {
            id: product._id,
            name: product.name,
            price: product.price,
            images: product.images,
            description: product.description,
            selectedColor,
            selectedSize,
          },
        })
      );
    } else {
      dispatch(
        addToFavorites({
          id: product._id,
          name: product.name,
          price: product.price,
          images: product.images,
          description: product.description,
          selectedColor,
          selectedSize,
        })
      );
      dispatch(triggerFavoritesShake());
      dispatch(
        showPopup({
          message: "Item added to wishlist",
          undoAction: "remove",
          itemData: { id: product._id },
        })
      );
    }
  };

  const getProductDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/product/${id}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };
  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/products?page=1&limit=20`,
        { withCredentials: true }
      );
      setSuggestionProducts(
        response.data
          .filter((prod) => prod._id !== id)
          .filter((product) => product.topSelling === true)
      );
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProductDetails();
    getProducts();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500">This product could not be found.</p>
        <button
          onClick={() => navigate("/products")}
          className="px-6 py-2.5 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-16 py-4">
        <div className="text-xs sm:text-sm text-gray-500 flex items-center gap-2 flex-wrap">
          <button onClick={() => navigate("/")} className="hover:text-black cursor-pointer">
            Home
          </button>
          <span>/</span>
          <button onClick={() => navigate("/products")} className="hover:text-black cursor-pointer">
            Shop
          </button>
          <span>/</span>
          <span className="text-black truncate">{product.name}</span>
        </div>
      </div>

      {/* Product Section */}
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-16 pb-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Image Gallery */}
          <div className="flex gap-2 sm:gap-4">
            <div className="flex flex-col gap-2 sm:gap-4">
              {product.images?.map((image, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 border-2 rounded-lg bg-gray-100 flex items-center justify-center cursor-pointer hover:border-gray-400 overflow-hidden transition ${
                    selectedImage === i ? "border-black" : "border-gray-200"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div
              className="relative bg-gray-100 rounded-2xl
              flex items-center justify-center
              aspect-square
              max-w-[360px] sm:max-w-[480px]
              mx-auto
              overflow-hidden"
            >
              {product.newArrival && (
                <span className="absolute top-4 left-4 z-10 bg-black text-white text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-md">
                  New
                </span>
              )}
              <img
                src={
                  product.images?.[selectedImage] ||
                  product.images?.[0] ||
                  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"
                }
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight mb-3">
              {product.name}
            </h1>

            {product.rating && (
              <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                <span className="flex items-center gap-0.5 text-yellow-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4"
                      fill={star <= Math.round(product.rating) ? "currentColor" : "none"}
                    />
                  ))}
                </span>
                {product.rating.toFixed?.(1) ?? product.rating}
                {product.reviewCount ? ` (${product.reviewCount} reviews)` : ""}
              </div>
            )}

            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="text-xl sm:text-3xl font-bold">
                ₹{product.price}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-base sm:text-lg text-gray-400 line-through">
                    ₹{product.originalPrice}
                  </span>
                  <span className="bg-gray-900 text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                    Save {discountPercent}%
                  </span>
                </>
              )}
            </div>

            <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-lg">
              {product.description}
            </p>

            {/* Size Selection */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-3">
                Size: <span className="text-gray-500">{selectedSize}</span>
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-12 px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-medium border rounded-lg cursor-pointer transition-colors ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 border-gray-300 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex gap-2 sm:gap-4 mb-6">
              <div className="flex items-center gap-4 bg-gray-100 rounded-full px-4 sm:px-6">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus className="w-4 h-4 cursor-pointer" />
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="w-4 h-4 cursor-pointer" />
                </button>
              </div>
              <button
                className="flex-1 bg-black text-white py-3 sm:py-4 rounded-full font-medium hover:bg-gray-800 transition cursor-pointer flex items-center justify-center gap-2 truncate"
                onClick={handleAddToCart}
              >
                Add to Cart — ₹{product.price * quantity}
              </button>
              <button
                onClick={handleToggleFavorite}
                className="w-12 h-12 shrink-0 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition cursor-pointer"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isFavorite
                      ? "fill-red-500 stroke-red-500"
                      : "stroke-gray-600"
                  }`}
                />
              </button>
            </div>

            {/* Details accordion */}
            <div className="border-t border-gray-200">
              {[
                { key: "details", icon: Info, title: "Product Details", body: product.description || "No additional details available for this product." },
                { key: "shipping", icon: Truck, title: "Shipping & Returns", body: "Ships in 2–5 business days. Free returns within 7 days of delivery for unworn items with tags attached. Full policy on our Shipping and Refunds pages." },
                { key: "care", icon: Shirt, title: "Care Instructions", body: "Machine wash cold with like colors. Do not bleach. Tumble dry low or hang dry to preserve fit and print." },
              ].map((section) => (
                <div key={section.key} className="border-b border-gray-200">
                  <button
                    onClick={() => toggleSection(section.key)}
                    className="w-full flex items-center justify-between py-4 text-left cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wide">
                      <section.icon className="w-4 h-4 text-gray-500" />
                      {section.title}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        openSection === section.key ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openSection === section.key && (
                    <p className="text-sm text-gray-600 leading-relaxed pb-4 max-w-lg">
                      {section.body}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendations */}
        {suggestionProducts?.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-3xl font-black uppercase tracking-tight">
                Complete The Fit
              </h2>
              <button
                onClick={() => navigate("/products")}
                className="hidden sm:flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide hover:text-gray-600 cursor-pointer"
              >
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200">
              {suggestionProducts.slice(0, 4).map((item, i) => (
                <ProductCard key={i} {...item}></ProductCard>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
