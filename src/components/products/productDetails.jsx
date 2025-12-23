import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ShoppingCart,
  Heart,
  Star,
  ChevronDown,
  Minus,
  Plus,
  Loader,
} from "lucide-react";
import { addItem } from "../../store/cartSlice";
import { openCart, showPopup, setCartView } from "../../store/uiSlice";
import { addToFavorites, removeFromFavorites } from "../../store/favoritesSlice";
import { triggerFavoritesShake } from "../../store/uiSlice";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductCard from "./productCard";
import { triggerCartShake } from "../../store/uiSlice";


export default function ProductDetails() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);
  const favorites = useSelector((state) => state.favorites.favorites);
  const [selectedSize, setSelectedSize] = useState("Large");
  const [selectedColor, setSelectedColor] = useState("#2C3E50");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("reviews");
  const [selectedImage, setSelectedImage] = useState(0); // Track selected image index

  const sizes = ["Small", "Medium", "Large", "X-Large"];
  // const colors = ["#2C3E50", "#34495E", "#7F8C8D"];

  const [product, setProduct] = useState(null);
  const [suggestionProducts, setSuggestionProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const isFavorite = favorites.some(item => item.id === product?._id);

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
    dispatch(setCartView('cart'));
    dispatch(openCart());
    dispatch(triggerCartShake());
  };

  console.log("Product ID from URL:", id);

  const getProductDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/product/${id}`
      );
      setProduct(response.data);
      console.log("Product details fetched:", response.data);
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
      console.log("Products fetched:", response.data);
      setSuggestionProducts(
        response.data
          .filter((prod) => prod._id !== id)
          .filter((product) => product.topSelling === true)
      );
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  console.log("suggestion :", suggestionProducts);

  useEffect(() => {
    getProductDetails();
    getProducts();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="text-sm text-gray-500">
          Home / Shop / Men / T-shirts /{" "}
          <span className="text-black">{product.name}</span>
        </div>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-4">
              {product.images?.map((image, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 border-2 rounded-lg bg-gray-100 flex items-center justify-center cursor-pointer hover:border-gray-400 overflow-hidden transition ${
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
            <div className="flex-1 bg-gray-100 rounded-2xl flex items-center justify-center aspect-square overflow-hidden">
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
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold">${product.price}</span>
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Size Selection */}
            <div className="mb-6">
              <p className="text-sm mb-3">Choose Size</p>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-full border cursor-pointer ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex gap-4 mb-6">
              <div className="flex items-center gap-4 bg-gray-100 rounded-full px-6">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus className="w-4 h-4 cursor-pointer" />
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="w-4 h-4 cursor-pointer" />
                </button>
              </div>
              <button
                className="flex-1 bg-black text-white py-4 rounded-full font-medium hover:bg-gray-800 transition cursor-pointer flex items-center justify-center"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  if (isFavorite) {
                    dispatch(removeFromFavorites({ id: product._id }));
                    dispatch(showPopup({
                      message: "Item removed from the wishlist",
                      undoAction: 'add',
                      itemData: {
                        id: product._id,
                        name: product.name,
                        price: product.price,
                        images: product.images,
                        description: product.description,
                        selectedColor,
                        selectedSize
                      }
                    }));
                  } else {
                    dispatch(addToFavorites({
                      id: product._id,
                      name: product.name,
                      price: product.price,
                      images: product.images,
                      description: product.description,
                      selectedColor,
                      selectedSize
                    }));
                    dispatch(triggerFavoritesShake());
                    dispatch(showPopup({
                      message: "Item added to wishlist",
                      undoAction: 'remove',
                      itemData: { id: product._id }
                    }));
                  }
                }}
                className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition cursor-pointer"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isFavorite ? "fill-red-500 stroke-red-500" : "stroke-gray-600"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            YOU MIGHT ALSO LIKE
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {suggestionProducts?.slice(0, 4).map((item, i) => (
              <ProductCard key={i} {...item}></ProductCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
