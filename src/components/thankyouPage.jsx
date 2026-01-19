import React from "react";
import { CheckCircle, Package, Mail, Home, ArrowRight } from "lucide-react";
import { clearCart } from "../store/cartSlice";
import { useDispatch } from "react-redux";

export default function ThankYouPage() {
  const orderNumber =
    "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  const estimatedDelivery = new Date(
    Date.now() + 5 * 24 * 60 * 60 * 1000,
  ).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const dispatch = useDispatch();
  dispatch(clearCart());

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-black-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Icon */}
        <div className="text-center mb-8 animate-bounce">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
            Thank You for Your Order!
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Your order has been confirmed and will be shipped soon.
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Order Number</span>
              <span className="font-semibold text-gray-900">{orderNumber}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Estimated Delivery</span>
              <span className="font-semibold text-gray-900">
                {estimatedDelivery}
              </span>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="border border-gray-200 rounded-lg p-4 flex items-start space-x-3">
              <Package className="w-6 h-6 text-black-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Track Your Order
                </h3>
                <p className="text-sm text-gray-600">
                  You'll receive tracking information via email once shipped.
                </p>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 flex items-start space-x-3">
              <Mail className="w-6 h-6 text-black-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Order Confirmation
                </h3>
                <p className="text-sm text-gray-600">
                  Check your inbox for order details and receipt.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold cursor-pointer hover:border-gray-400 transition-colors flex items-center justify-center space-x-2">
              <span>View Order Details</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="flex-1 bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold cursor-pointer hover:border-gray-400 transition-colors flex items-center justify-center space-x-2">
              <Home className="w-5 h-5" />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-gray-600 text-sm">
          <p>Need help? Contact our support team at support@store.com</p>
        </div>
      </div>
    </div>
  );
}
