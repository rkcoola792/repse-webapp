import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  Tag,
  ArrowRight,
  X,
  Heart,
  MoreVertical,
  ChevronDown,
} from "lucide-react";
import { removeItem, updateQuantity, addItem } from "../../store/cartSlice";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../store/favoritesSlice";
import {
  triggerCartShake,
  setCartLoading,
  setCartView,
  showLoginPrompt,
} from "../../store/uiSlice";
import CartLikeToggle from "./CartToggle";
import axios from "axios";

export default function CartSidebar({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const cartItems = useSelector((state) => state.cart.cart);
  const favorites = useSelector((state) => state.favorites.favorites);
  const cartView = useSelector((state) => state.ui.cartView);
  const [promoCode, setPromoCode] = useState("");
  const [menuOpen, setMenuOpen] = useState(null);
  const [favoriteSizes, setFavoriteSizes] = useState({});

  const userEmail = user?.user?.email || user?.email;

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem({ id }));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discount = subtotal > 0 ? subtotal * 0.2 : 0;
  const deliveryFee = subtotal > 0 ? 15 : 0;
  const totalAmount = subtotal - discount + deliveryFee;
  const handleCheckout = async () => {
    if (!user || Object.keys(user).length === 0) {
      navigate("/login");
      return;
    }
    // Checkout logic to be implemented
    try {
      const createOrderOptions = {
        amount: Math.round(totalAmount * 100), // Converts rupees to paise (e.g., 123.45 → 12345)
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        payment_capture: 1,
        notes: {
          first_name: "John Doe",
          email: "user@gmail.com",
        },
      };
      const order = await axios.post(
        import.meta.env.VITE_APP_BASE_URL + "/create-order",
        createOrderOptions,
        { withCredentials: true }
      );
      console.log("Order created:", order.data);
      const { keyId, currency, amount, notes, orderId } = order.data;
      const options = {
        key: keyId, // Replace with your Razorpay key_id
        amount,
        currency,
        name: "Repse",
        description: "Payment for your order",
        order_id: orderId, // This is the order_id created in the backend
        // callback_url: "http://localhost:3000/payment-success", // Your success URL
        prefill: {
          name: notes.first_name,
          email: notes.email,
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
      };
      console.log("Options:", options);
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`
    fixed inset-0 z-60
    transition-all duration-300
    ${
      isOpen
        ? "bg-black/80 opacity-100"
        : "opacity-0 pointer-events-none"
    }
  `}
      />

      {/* Sidebar */}
      <div
        className={`
    fixed top-0 right-0 h-full w-full bg-white z-70
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "translate-x-full pointer-events-none"}
    md:max-w-md
  `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-4 sm:p-6 shadow z-50">
            <h1 className="text-md font-bold tracking-tight">
              {cartView === "wishlist" ? "YOUR WISHLIST" : "YOUR BAG"}
            </h1>
            <div className="flex items-center gap-2">
              <CartLikeToggle
                isWishlist={cartView === "wishlist"}
                onToggle={(value) =>
                  dispatch(setCartView(value ? "wishlist" : "cart"))
                }
              />
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
            {cartView === "wishlist" ? (
              (!user || Object.keys(user).length === 0) ? (
                <div className="text-center py-12 px-4">
                  <h2 className="text-lg font-semibold mb-4"> <Heart className="w-6 h-6 inline-block mr-2 fill-black" /> Save to wishlist</h2>
                  <p className="text-gray-700 text-base leading-relaxed mb-8">
                    Ever wish you could save all your fave fits & accessories in one
                    place to come back to later? Almost like a ✨ wishlist ✨.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => navigate("/register")}
                      className="px-8 py-3 rounded-full bg-black text-white font-medium hover:bg-zinc-800 transition cursor-pointer"
                    >
                      Create account
                    </button>
                    <button
                      onClick={() => navigate("/login")}
                      className="px-8 py-3 rounded-full bg-gray-200 text-black font-medium hover:bg-gray-300 transition cursor-pointer"
                    >
                      Log In
                    </button>
                  </div>
                </div>
              ) : favorites.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-xl text-gray-500">
                    Your wishlist is empty
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-4 px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {favorites.map((item) => (
                    <div key={item.id} className="p-4 bg-white rounded-lg">
                      <div className="flex gap-4">
                        <div
                          className="bg-gray-100 rounded-xl w-20 h-20 sm:w-26 sm:h-28 flex items-center justify-center flex-shrink-0 overflow-hidden cursor-pointer"
                          onClick={() => navigate(`/product-details/${item.id}`)}
                        >
                          <img
                            src={item.images && item.images[0]}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h3
                              className="font-semibold text-sm truncate cursor-pointer inline-block"
                              onClick={() => navigate(`/product-details/${item.id}`)}
                            >
                              {item.name}
                            </h3>
                            <div className="relative">
                              <button
                                onMouseDown={(e) => e.stopPropagation()}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setMenuOpen(
                                    menuOpen === item.id ? null : item.id
                                  );
                                }}
                                className="w-9 h-9 bg-transparent rounded-full flex items-center justify-center cursor-pointer"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>
                              {menuOpen === item.id && (
                                <div
                                  ref={menuRef}
                                  className="absolute right-0  w-40 bg-white rounded-lg shadow z-10 p-1 box-border"
                                  onMouseDown={(e) => e.stopPropagation()}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      dispatch(setCartLoading(true));
                                      const selectedSize =
                                        favoriteSizes[item.id] ||
                                        item.selectedSize ||
                                        "Large";
                                      const cartItem = {
                                        id: `${item.id}-${selectedSize}-${item.selectedColor}`,
                                        productId: item.id,
                                        name: item.name,
                                        price: item.price,
                                        size: selectedSize,
                                        color: item.selectedColor,
                                        quantity: 1,
                                        image: item.images?.[0],
                                      };
                                      dispatch(addItem(cartItem));
                                      dispatch(setCartView("cart"));
                                      setMenuOpen(null);
                                      setTimeout(
                                        () => dispatch(setCartLoading(false)),
                                        500
                                      );
                                    }}
                                    className="w-full box-border flex items-center gap-2 px-3 py-2 text-sm text-left rounded-md hover:bg-zinc-900 hover:text-zinc-100 transition-colors cursor-pointer"
                                  >
                                    <ShoppingCart className="w-4 h-4" />
                                    Add to Cart
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      dispatch(
                                        removeFromFavorites({ id: item.id, userEmail })
                                      );
                                      setMenuOpen(null);
                                    }}
                                    className="w-full box-border flex items-center gap-2 px-3 py-2 text-sm text-left rounded-md text-red-600 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    Remove
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>

                          <p className="text-xs text-gray-500 mb-1">
                            Color:{" "}
                            <span className="text-black">
                              {item.selectedColor}
                            </span>
                          </p>

                          {/* Price */}
                          <p className="text-md font-bold mb-2">
                            US${item.price}
                          </p>

                          {/* Size + Cart */}
                          <div className="flex items-center gap-3">
                            <div className="relative flex-1">
                              <select
                                value={
                                  favoriteSizes[item.id] ||
                                  item.selectedSize ||
                                  ""
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

                            <button
                              onClick={() => {
                                const selectedSize =
                                  favoriteSizes[item.id] || item.selectedSize;

                                if (!selectedSize) return;

                                const cartItem = {
                                  id: `${item.id}-${selectedSize}-${item.selectedColor}`,
                                  productId: item.id,
                                  name: item.name,
                                  price: item.price,
                                  size: selectedSize,
                                  color: item.selectedColor,
                                  quantity: 1,
                                  image: item.images?.[0],
                                };

                                dispatch(addItem(cartItem));
                                dispatch(setCartView("cart"));
                                dispatch(triggerCartShake());
                              }}
                              className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center disabled:bg-gray-300 cursor-pointer"
                              disabled={
                                !(favoriteSizes[item.id] || item.selectedSize)
                              }
                            >
                              <ShoppingCart className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-xl text-gray-500">Your cart is empty</p>
                <button
                  onClick={onClose}
                  className="mt-4 px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-4 bg-white">
                    {(() => {
                      const isLiked = favorites.some(
                        (fav) => fav.id === item.productId
                      );
                      const handleToggleLike = () => {
                        if (!user || Object.keys(user).length === 0) {
                          dispatch(showLoginPrompt());
                          return;
                        }
                        if (isLiked) {
                          dispatch(removeFromFavorites({ id: item.productId, userId }));
                        } else {
                          const favItem = {
                            id: item.productId,
                            name: item.name,
                            price: item.price,
                            images: [item.image],
                            selectedColor: item.color,
                            selectedSize: item.size,
                          };
                          dispatch(addToFavorites({ ...favItem, userEmail }));
                        }
                      };

                      return (
                        <>
                          <div className="flex gap-4">
                            <div
                              className="bg-gray-100 rounded-xl w-16 h-16 sm:w-22 sm:h-22 flex items-center justify-center flex-shrink-0 overflow-hidden cursor-pointer"
                              onClick={() => navigate(`/product-details/${item.productId}`)}
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start">
                                <h3
                                  className="font-semibold text-sm truncate cursor-pointer inline-block"
                                  onClick={() => navigate(`/product-details/${item.productId}`)}
                                >
                                  {item.name}
                                </h3>
                                <div className="flex items-center gap-1 ml-2">
                                  <button
                                    onClick={handleToggleLike}
                                    className={`p-1 rounded-full cursor-pointer ${
                                      isLiked ? "text-red-500" : "text-gray-400"
                                    } hover:bg-gray-100`}
                                  >
                                    <Heart
                                      className={`w-4 h-4 ${
                                        isLiked ? "fill-current" : ""
                                      }`}
                                    />
                                  </button>
                                  <div className="relative">
                                    <button
                                      onMouseDown={(e) => e.stopPropagation()}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setMenuOpen(
                                          menuOpen === `cart-${item.id}` ? null : `cart-${item.id}`
                                        );
                                      }}
                                      className="w-9 h-9 bg-transparent rounded-full flex items-center justify-center cursor-pointer"
                                    >
                                      <MoreVertical className="w-4 h-4" />
                                    </button>
                                    {menuOpen === `cart-${item.id}` && (
                                      <div
                                        ref={menuRef}
                                        className="absolute right-0 w-40 bg-white rounded-lg shadow-lg z-10 p-1 box-border"
                                        onMouseDown={(e) => e.stopPropagation()}
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemoveItem(item.id);
                                            setMenuOpen(null);
                                          }}
                                          className="w-full box-border flex items-center gap-2 px-3 py-2 text-sm text-left rounded-md text-red-600 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                          Remove
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <p className="text-xs text-gray-500 mb-1">
                                Size:{" "}
                                <span className="text-black">{item.size}</span>
                              </p>
                              <p className="text-xs text-gray-500 mb-2">
                                Color:{" "}
                                <span className="text-black">{item.color}</span>
                              </p>

                              <div className="flex justify-between items-center">
                                <span className="text-lg font-bold">
                                  ${item.price}
                                </span>

                                <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                                  <button
                                    onClick={() =>
                                      handleUpdateQuantity(
                                        item.id,
                                        item.quantity - 1
                                      )
                                    }
                                    disabled={item.quantity <= 1}
                                    className="cursor-pointer"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="w-6 text-center font-medium text-sm">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() =>
                                      handleUpdateQuantity(
                                        item.id,
                                        item.quantity + 1
                                      )
                                    }
                                    className="cursor-pointer"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          {cartItems.length > 0 && cartView === "cart" && (
            <div className="p-4 sm:p-6">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-black">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Discount (-20%)</span>
                  <span className="font-semibold text-red-500">
                    -${discount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-black">
                    ${deliveryFee}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4 mb-4">
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-2xl">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-4">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Add promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-black/5"
                    />
                  </div>
                  <button className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 text-sm whitespace-nowrap">
                    Apply
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 flex items-center justify-center gap-2 cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={cartItems.length === 0}
                onClick={handleCheckout}
              >
                Go to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
