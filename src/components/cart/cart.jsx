import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  Tag,
  ArrowRight,
} from "lucide-react";
import { removeItem, updateQuantity, clearCart } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);
  const [promoCode, setPromoCode] = useState("");
  const navigate = useNavigate();

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
  const discount = subtotal * 0.2;
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="text-sm text-gray-500">
          Home / <span className="text-black">Cart</span>
        </div>
      </div>

      {/* Cart Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">YOUR CART</h1>
          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              className="text-red-500 hover:text-red-700 text-sm font-medium cursor-pointer"
            >
              Clear Cart
            </button>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12 border rounded-2xl">
                <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-xl text-gray-500">Your cart is empty</p>
                <button
                  onClick={() => navigate("/")}
                  className="mt-4 px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="border rounded-2xl p-6">
                  <div className="flex gap-6">
                    <div className="bg-gray-100 rounded-xl w-32 h-32 flex items-center justify-center text-6xl flex-shrink-0 overflow-hidden">
                      <img src={item.image} alt={item.name} />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700 cursor-pointer"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <p className="text-sm text-gray-500 mb-1">
                        Size: <span className="text-black">{item.size}</span>
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        Color: <span className="text-black">{item.color}</span>
                      </p>

                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold">${item.price}</span>

                        <div className="flex items-center gap-4 bg-gray-100 rounded-full px-4 py-2">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4 cursor-pointer" />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="w-4 h-4 cursor-pointer" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border rounded-2xl p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-black">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Discount (-20%)</span>
                  <span className="font-semibold text-red-500">
                    -${discount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-black">${deliveryFee}</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-2xl">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Add promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <button className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 whitespace-nowrap">
                    Apply
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                className="w-full bg-black text-white py-4 rounded-full font-medium hover:bg-gray-800 flex items-center justify-center gap-2 cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={cartItems.length === 0}
              >
                Go to Checkout
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
