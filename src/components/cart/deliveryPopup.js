import { useState } from "react";
import { MapPin, X, ArrowRight } from "lucide-react";

/* ─────────────────────────────────────────────
   Validation helpers
   ───────────────────────────────────────────── */
const validators = {
  fullName: (v) => (!v.trim() ? "Full name is required" : ""),
  street: (v) => (!v.trim() ? "Street address is required" : ""),
  city: (v) => (!v.trim() ? "City is required" : ""),
  state: (v) => (!v.trim() ? "State is required" : ""),
  pincode: (v) =>
    !v.trim()
      ? "Pincode is required"
      : !/^\d{6}$/.test(v)
      ? "Must be a valid 6-digit pincode"
      : "",
  phone: (v) =>
    !v.trim()
      ? "Phone number is required"
      : !/^\d{10}$/.test(v)
      ? "Must be a valid 10-digit number"
      : "",
};

const initialForm = {
  fullName: "",
  street: "",
  city: "",
  state: "",
  pincode: "",
  phone: "",
};

/* ─────────────────────────────────────────────
   Reusable labelled input
   ───────────────────────────────────────────── */
function Field({ label, name, value, onChange, error, placeholder, maxLength }) {
  return (
    <div className="flex-1">
      <label className="block text-xs font-semibold text-gray-500 mb-1">
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full border ${
          error ? "border-red-400" : "border-gray-300"
        } rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10 transition`}
      />
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main modal component
   ───────────────────────────────────────────── */
export default function DeliveryAddressModal() {
  /* visibility toggle (demo: starts open) */
  const [showModal, setShowModal] = useState(true);

  /* form & validation state */
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  /* payment UX state */
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  /* mock total */
  const totalAmount = 1249.0;

  /* ── handlers ── */
  const handleChange = (e) => {
    const { name, value } = e.target;

    // only digits for pincode / phone
    if ((name === "pincode" || name === "phone") && !/^\d*$/.test(value)) return;

    setForm((prev) => ({ ...prev, [name]: value }));
    // clear error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(validators).forEach((key) => {
      const msg = validators[key](form[key]);
      if (msg) newErrors[key] = msg;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceedToPayment = () => {
    setPaymentError("");
    if (!validate()) return;

    setIsPaymentLoading(true);

    // simulate network delay
    setTimeout(() => {
      setIsPaymentLoading(false);
      alert("✅ Payment successful! (demo)");
    }, 1800);
  };

  /* ── if modal is closed, show a trigger button ── */
  if (!showModal) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <button
          onClick={() => setShowModal(true)}
          className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-zinc-800 transition flex items-center gap-2"
        >
          <MapPin size={18} /> Set Delivery Address
        </button>
      </div>
    );
  }

  /* ── modal markup ── */
  return (
    <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => setShowModal(false)}
      />

      {/* modal card */}
      <div className="relative w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-xl z-10 max-h-[90vh] overflow-y-auto">
        {/* sticky header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b sticky top-0 bg-white rounded-t-2xl sm:rounded-t-2xl">
          <div className="flex items-center gap-2">
            <MapPin size={20} />
            <h3 className="text-base font-bold tracking-wide">
              Delivery Address
            </h3>
          </div>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-400 hover:text-black transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* body */}
        <div className="px-5 py-5 flex flex-col gap-4">
          {/* Full Name */}
          <Field
            label="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            error={errors.fullName}
            placeholder="John Doe"
          />

          {/* Street */}
          <Field
            label="Street Address"
            name="street"
            value={form.street}
            onChange={handleChange}
            error={errors.street}
            placeholder="123 Main St, Apt 4B"
          />

          {/* City + State row */}
          <div className="flex gap-3">
            <Field
              label="City"
              name="city"
              value={form.city}
              onChange={handleChange}
              error={errors.city}
              placeholder="Delhi"
            />
            <Field
              label="State"
              name="state"
              value={form.state}
              onChange={handleChange}
              error={errors.state}
              placeholder="Delhi"
            />
          </div>

          {/* Pincode + Phone row */}
          <div className="flex gap-3">
            <Field
              label="Pincode"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              error={errors.pincode}
              placeholder="110001"
              maxLength={6}
            />
            <Field
              label="Phone No."
              name="phone"
              value={form.phone}
              onChange={handleChange}
              error={errors.phone}
              placeholder="9876543210"
              maxLength={10}
            />
          </div>

          {/* Total reminder */}
          <div className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-2 mt-2">
            <span className="text-xs text-gray-500">You will be charged</span>
            <span className="text-sm font-bold">₹{totalAmount.toFixed(2)}</span>
          </div>

          {/* Payment error */}
          {paymentError && (
            <p className="text-xs text-red-500 text-center -mb-2">
              {paymentError}
            </p>
          )}

          {/* CTA */}
          <button
            onClick={handleProceedToPayment}
            disabled={isPaymentLoading}
            className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-zinc-800 transition cursor-pointer flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isPaymentLoading ? "Processing…" : "Confirm & Pay"}
            {!isPaymentLoading && <ArrowRight size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}