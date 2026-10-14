import React, { useEffect, useMemo, useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { clearCart } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/axios";

const ANTON = "'Anton', sans-serif";

export default function ThankYouPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Snapshot the cart + saved address once, before it gets cleared below.
  const [items] = useState(() => {
    try {
      const checkout = JSON.parse(sessionStorage.getItem("repse_last_order") || "{}");
      if (Array.isArray(checkout.items) && checkout.items.length > 0) return checkout.items;
      const raw = localStorage.getItem("persist:cart");
      if (!raw) return [];
      const persistedCart = JSON.parse(raw); // { cart: "[...]", _persist: "..." }
      return JSON.parse(persistedCart.cart);
    } catch {
      return [];
    }
  });
  const [address] = useState(() => {
    try {
      const raw = sessionStorage.getItem("repse_last_order");
      return raw ? JSON.parse(raw).address : null;
    } catch {
      return null;
    }
  });
  const [confirmedAmount] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("repse_last_order") || "{}").amount ?? null;
    } catch {
      return null;
    }
  });

  const cartItemsLive = useSelector((state) => state.cart.cart);
  const orderItems = items.length > 0 ? items : cartItemsLive;
  const [paymentState, setPaymentState] = useState("checking");

  const subtotal = useMemo(
    () => orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [orderItems]
  );
  const configuredDiscountPercent = Number(import.meta.env.VITE_ORDER_DISCOUNT_PERCENT);
  const discountPercent = Number.isFinite(configuredDiscountPercent) ? configuredDiscountPercent : 20;
  const configuredDeliveryFee = Number(import.meta.env.VITE_ORDER_DELIVERY_FEE);
  const discount = subtotal > 0 ? subtotal * (discountPercent / 100) : 0;
  const deliveryFee = subtotal > 0 ? (Number.isFinite(configuredDeliveryFee) ? configuredDeliveryFee : 15) : 0;
  const totalPaid = confirmedAmount !== null && Number.isFinite(Number(confirmedAmount))
    ? Number(confirmedAmount)
    : subtotal - discount + deliveryFee;

  const estimatedDelivery = useMemo(() => {
    const fmt = (d) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const from = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
    const to = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    return `${fmt(from)} – ${fmt(to)}`;
  }, []);

  const orderId = searchParams.get("order_id");

  useEffect(() => {
    let verification;
    try {
      verification = JSON.parse(sessionStorage.getItem("repse_payment_verification") || "null");
    } catch {
      verification = null;
    }
    // Accept older success links once, then immediately remove payment tokens from history.
    verification ||= {
      orderId,
      paymentId: searchParams.get("payment_id"),
      signature: searchParams.get("signature"),
    };
    window.history.replaceState({}, "", `${window.location.pathname}${orderId ? `?order_id=${encodeURIComponent(orderId)}` : ""}`);

    if (!verification?.orderId || !verification?.paymentId || !verification?.signature) {
      setPaymentState("unverified");
      return;
    }

    let active = true;
    api.post("/verify-payment", verification).then(() => {
      if (!active) return;
      setPaymentState("confirmed");
      sessionStorage.removeItem("repse_payment_verification");
      sessionStorage.removeItem("repse_last_order");
      dispatch(clearCart());
    }).catch((error) => {
      if (!active) return;
      if (error.response?.status === 409) {
        setPaymentState("stock_issue");
        sessionStorage.removeItem("repse_payment_verification");
        sessionStorage.removeItem("repse_last_order");
        dispatch(clearCart());
      } else {
        console.error("Payment verification failed:", error);
        setPaymentState("failed");
      }
    });

    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const paymentHeading = paymentState === "confirmed"
    ? "Order Confirmed"
    : paymentState === "stock_issue"
      ? "Payment Received — Order Review Needed"
      : paymentState === "checking"
        ? "Verifying Payment"
        : paymentState === "failed"
          ? "Payment Verification Pending"
          : "Order Status Unverified";

  return (
    <div className="min-h-screen bg-white">
      {/* Confirmation */}
      <section className="max-w-2xl mx-auto px-6 sm:px-8 pt-16 sm:pt-24 pb-14 text-center border-b border-gray-200">
        <div className="w-20 h-20 mx-auto mb-7 rounded-full border-2 border-black flex items-center justify-center">
          <Check className="w-8 h-8 text-black" strokeWidth={2.5} />
        </div>

        <p className="text-gray-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
          {paymentHeading}
        </p>

        <h1
          className="text-gray-900 uppercase text-4xl sm:text-5xl mb-4"
          style={{ fontFamily: ANTON }}
        >
          {paymentState === "confirmed" ? "You're All Set" : paymentState === "checking" ? "Checking Your Payment" : "We're Checking It"}
        </h1>

        <p className="text-gray-500 text-sm leading-relaxed max-w-md mx-auto mb-10">
          {paymentState === "confirmed"
            ? "Your payment is confirmed. We'll send a shipping confirmation when your order leaves the warehouse."
            : paymentState === "stock_issue"
              ? "Your payment was received, but an item needs manual stock review. Our team has been notified."
              : "We haven't confirmed this payment yet. Your cart is still saved; refresh this page to check again."}
        </p>

        <div className="flex flex-wrap justify-center gap-10 mb-10 text-left">
          <div>
            <p className="text-gray-400 text-[11px] tracking-wide uppercase mb-1.5">
              Order Number
            </p>
            <p className="text-gray-900 text-lg" style={{ fontFamily: ANTON }}>
              {orderId ? `#${orderId.slice(-8).toUpperCase()}` : "—"}
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-[11px] tracking-wide uppercase mb-1.5">
              Estimated Delivery
            </p>
            <p className="text-gray-900 text-lg" style={{ fontFamily: ANTON }}>
              {estimatedDelivery}
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-[11px] tracking-wide uppercase mb-1.5">
              Payment
            </p>
            <p className="text-gray-900 text-lg" style={{ fontFamily: ANTON }}>
              Razorpay
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigate("/profile")}
            className="px-8 py-3.5 bg-black text-white rounded-full text-sm font-semibold uppercase tracking-wide hover:bg-gray-800 transition-colors cursor-pointer flex items-center gap-2"
          >
            Track Your Order <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate("/products")}
            className="px-8 py-3.5 border border-gray-300 text-gray-900 rounded-full text-sm font-semibold uppercase tracking-wide hover:border-gray-500 transition-colors cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      </section>

      {/* Order summary */}
      {orderItems.length > 0 && (
        <section className="max-w-2xl mx-auto px-6 sm:px-8 py-14">
          <h2
            className="text-gray-900 uppercase text-xl mb-6"
            style={{ fontFamily: ANTON }}
          >
            Order Summary
          </h2>

          <div>
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[64px_1fr_auto] gap-4 sm:gap-5 items-center py-4 border-b border-gray-200"
              >
                <div className="w-16 h-[76px] bg-gray-100 overflow-hidden shrink-0">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <p
                    className="text-gray-900 uppercase text-sm mb-1 truncate"
                    style={{ fontFamily: ANTON }}
                  >
                    {item.name}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {[item.color, item.size, `Qty ${item.quantity}`]
                      .filter(Boolean)
                      .join(" — ")}
                  </p>
                </div>
                <p className="text-gray-900 text-sm" style={{ fontFamily: ANTON }}>
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-1">
            <div className="flex justify-between text-gray-600 text-sm py-1.5">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(0)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-gray-600 text-sm py-1.5">
                <span>Discount</span>
                <span>−₹{discount.toFixed(0)}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-600 text-sm py-1.5">
              <span>Shipping</span>
              <span>{deliveryFee > 0 ? `₹${deliveryFee}` : "Free"}</span>
            </div>
            <div className="flex justify-between items-center text-gray-900 text-sm pt-3.5 mt-2 border-t border-gray-200">
              <span>Total Paid</span>
              <span className="text-lg" style={{ fontFamily: ANTON }}>
                ₹{totalPaid.toFixed(0)}
              </span>
            </div>
          </div>

          {address && (
            <div className="mt-9 p-5 border border-gray-200">
              <p className="text-gray-400 text-[11px] tracking-wide uppercase mb-2.5">
                Shipping To
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                {address.fullName}
                <br />
                {address.street}
                <br />
                {address.city}, {address.state} {address.pincode}
                <br />
                {address.phone}
              </p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
