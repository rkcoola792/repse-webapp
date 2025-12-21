import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  Tag,
  ArrowRight,
  X,
  Heart,
} from "lucide-react";
import { removeItem, updateQuantity, clearCart } from "../../store/cartSlice";
import CartLikeToggle from "./CartToggle";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CartSidebar({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);
  const [promoCode, setPromoCode] = useState("");

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemoveItem = (id) => {
     dispatch(removeItem({ id }));
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCart());
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discount = subtotal > 0 ? subtotal * 0.2 : 0;
  const deliveryFee = subtotal > 0 ? 15 : 0;
  const totalAmount = subtotal - discount + deliveryFee;
  const handleCheckout = async () => {
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
      const { keyId, currency, amount, notes, order_id } = order.data;
      const options = {
        key: keyId, // Replace with your Razorpay key_id
        amount,
        currency,
        name: "Repse",
        description: "Payment for your order",
        order_id, // This is the order_id created in the backend
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

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`
    fixed inset-0 z-40
    transition-all duration-300
    ${
      isOpen
        ? "bg-black/40 backdrop-blur-xs opacity-100"
        : "opacity-0 pointer-events-none"
    }
  `}
      />

      {/* Sidebar */}
      <div
        className={`
    fixed top-0 right-0 h-full w-full max-w-md bg-white z-50
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "translate-x-full"}
  `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-6 shadow z-50">
            <h1 className="text-md font-bold tracking-tight">YOUR BAG</h1>
            <div className="flex items-center gap-2">
              <CartLikeToggle />
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            {cartItems.length === 0 ? (
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
                    <div className="flex gap-4">
                      <div className="bg-gray-100 rounded-xl w-20 h-20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-sm truncate">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-700 cursor-pointer ml-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="text-xs text-gray-500 mb-1">
                          Size: <span className="text-black">{item.size}</span>
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
                                handleUpdateQuantity(item.id, item.quantity - 1)
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
                                handleUpdateQuantity(item.id, item.quantity + 1)
                              }
                              className="cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          {cartItems.length > 0 && (
            <div className="p-6">
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
