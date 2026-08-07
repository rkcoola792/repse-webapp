import React, { useEffect, useMemo, useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { clearCart } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

const ANTON = "'Anton', sans-serif";

export default function ThankYouPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Snapshot the cart + saved address once, before it gets cleared below.
  const [items] = useState(() => {
    try {
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

  const cartItemsLive = useSelector((state) => state.cart.cart);
  const orderItems = items.length > 0 ? items : cartItemsLive;

  const subtotal = useMemo(
    () => orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [orderItems]
  );
  const discount = subtotal > 0 ? subtotal * 0.2 : 0;
  const deliveryFee = subtotal > 0 ? 15 : 0;
  const totalPaid = subtotal - discount + deliveryFee;

  const estimatedDelivery = useMemo(() => {
    const fmt = (d) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const from = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
    const to = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    return `${fmt(from)} – ${fmt(to)}`;
  }, []);

  const orderId = searchParams.get("order_id");

  useEffect(() => {
    sessionStorage.removeItem("repse_last_order");
    dispatch(clearCart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Confirmation */}
      <section className="max-w-2xl mx-auto px-6 sm:px-8 pt-16 sm:pt-24 pb-14 text-center border-b border-white/10">
        <div className="w-20 h-20 mx-auto mb-7 rounded-full border-2 border-white flex items-center justify-center">
          <Check className="w-8 h-8 text-white" strokeWidth={2.5} />
        </div>

        <p className="text-white/50 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
          Order Confirmed
        </p>

        <h1
          className="text-white uppercase text-4xl sm:text-5xl mb-4"
          style={{ fontFamily: ANTON }}
        >
          You&apos;re All Set
        </h1>

        <p className="text-white/50 text-sm leading-relaxed max-w-md mx-auto mb-10">
          Your order has been placed. We&apos;ll send a shipping confirmation
          the moment it leaves the warehouse — usually within 2 business
          days.
        </p>

        <div className="flex flex-wrap justify-center gap-10 mb-10 text-left">
          <div>
            <p className="text-white/40 text-[11px] tracking-wide uppercase mb-1.5">
              Order Number
            </p>
            <p className="text-white text-lg" style={{ fontFamily: ANTON }}>
              {orderId ? `#${orderId.slice(-8).toUpperCase()}` : "—"}
            </p>
          </div>
          <div>
            <p className="text-white/40 text-[11px] tracking-wide uppercase mb-1.5">
              Estimated Delivery
            </p>
            <p className="text-white text-lg" style={{ fontFamily: ANTON }}>
              {estimatedDelivery}
            </p>
          </div>
          <div>
            <p className="text-white/40 text-[11px] tracking-wide uppercase mb-1.5">
              Payment
            </p>
            <p className="text-white text-lg" style={{ fontFamily: ANTON }}>
              Razorpay
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigate("/profile")}
            className="px-8 py-3.5 bg-white text-black rounded-full text-sm font-semibold uppercase tracking-wide hover:bg-gray-200 transition-colors cursor-pointer flex items-center gap-2"
          >
            Track Your Order <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate("/products")}
            className="px-8 py-3.5 border border-white/25 text-white rounded-full text-sm font-semibold uppercase tracking-wide hover:border-white/50 transition-colors cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      </section>

      {/* Order summary */}
      {orderItems.length > 0 && (
        <section className="max-w-2xl mx-auto px-6 sm:px-8 py-14">
          <h2
            className="text-white uppercase text-xl mb-6"
            style={{ fontFamily: ANTON }}
          >
            Order Summary
          </h2>

          <div>
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[64px_1fr_auto] gap-4 sm:gap-5 items-center py-4 border-b border-white/10"
              >
                <div className="w-16 h-[76px] bg-white/5 overflow-hidden shrink-0">
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
                    className="text-white uppercase text-sm mb-1 truncate"
                    style={{ fontFamily: ANTON }}
                  >
                    {item.name}
                  </p>
                  <p className="text-white/40 text-xs">
                    {[item.color, item.size, `Qty ${item.quantity}`]
                      .filter(Boolean)
                      .join(" — ")}
                  </p>
                </div>
                <p className="text-white text-sm" style={{ fontFamily: ANTON }}>
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-1">
            <div className="flex justify-between text-white/60 text-sm py-1.5">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(0)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-white/60 text-sm py-1.5">
                <span>Discount</span>
                <span>−₹{discount.toFixed(0)}</span>
              </div>
            )}
            <div className="flex justify-between text-white/60 text-sm py-1.5">
              <span>Shipping</span>
              <span>{deliveryFee > 0 ? `₹${deliveryFee}` : "Free"}</span>
            </div>
            <div className="flex justify-between items-center text-white text-sm pt-3.5 mt-2 border-t border-white/10">
              <span>Total Paid</span>
              <span className="text-lg" style={{ fontFamily: ANTON }}>
                ₹{totalPaid.toFixed(0)}
              </span>
            </div>
          </div>

          {address && (
            <div className="mt-9 p-5 border border-white/10">
              <p className="text-white/40 text-[11px] tracking-wide uppercase mb-2.5">
                Shipping To
              </p>
              <p className="text-white/60 text-sm leading-relaxed">
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
