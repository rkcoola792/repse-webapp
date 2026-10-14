import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const NewsletterFooter = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // null | "error" | "success"
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consented, setConsented] = useState(false);

  const handleSubscribe = async (event) => {
    event?.preventDefault();
    if (!isValidEmail(email)) {
      setStatus("error");
      return;
    }
    setIsSubmitting(true);
    try {
      await api.post("/newsletter/subscribe", { email });
      setStatus("success");
      setEmail("");
      setConsented(false);
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const footerLinks = {
    company: [{ name: "About", href: "/about" }],
    help: [
      { name: "Cancellation/Returns", href: "/refunds" },
      { name: "Shipping", href: "/shipping" },
      { name: "Terms & Conditions", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Contact Us", href: "/contact" },
    ],
    shop: [{ name: "Shop all", href: "/products" }],
 
  };

  return (
    <div className="bg-white">
      {/* Newsletter Section */}
      <div className="bg-white py-16 sm:py-20 text-center">
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-16">
          <p className="flex items-center justify-center gap-3 text-gray-400 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase mb-5">
            <span className="w-8 h-px bg-gray-300" />
            Join The List
            <span className="w-8 h-px bg-gray-300" />
          </p>
          <h2 className="text-black font-black uppercase tracking-tight text-3xl sm:text-5xl lg:text-6xl mb-4">
            Get The Next Drop First
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mb-8">
            Join the REPSE email list for upcoming drop and restock updates.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
            <div
              className={`flex rounded-full border overflow-hidden bg-white ${
                status === "error" ? "border-red-400" : "border-gray-300"
              }`}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status) setStatus(null);
                }}
                placeholder="Enter your email"
                aria-label="Email address"
                autoComplete="email"
                className="flex-1 min-w-0 bg-transparent px-5 py-3.5 text-sm text-black placeholder-gray-400 outline-none"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3.5 bg-black text-white text-sm font-semibold uppercase tracking-wide hover:bg-gray-800 transition-colors cursor-pointer whitespace-nowrap"
              >
                {isSubmitting ? "Saving…" : "Notify Me"}
              </button>
            </div>
          <label className="mx-auto mt-4 flex max-w-md items-start gap-2 text-left text-xs leading-relaxed text-gray-500">
            <input
              type="checkbox"
              required
              checked={consented}
              onChange={(event) => setConsented(event.target.checked)}
              className="mt-0.5 accent-black"
            />
            <span>
              I agree to receive REPSE drop and restock emails. See our{" "}
              <button type="button" onClick={() => navigate("/privacy")} className="underline underline-offset-2 hover:text-black">
                Privacy Policy
              </button>
              .
            </span>
          </label>
            {status === "error" && (
              <p className="text-red-500 text-xs mt-2">Enter a valid email address or try again in a moment.</p>
            )}
            {status === "success" && (
              <p className="text-green-600 text-xs mt-2 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Thanks — your email is on the list.
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-black">
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-16 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-white text-3xl font-black mb-4">REPSE.IN</h3>
              <p className="text-white/50 text-sm mb-6 max-w-xs">
                Performance gymwear built for training, running and everyday
                movement — for every athlete, every rep.
              </p>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks?.company.map((link) => (
                  <li key={link.name}>
                    <button
                      type="button"
                      onClick={() => navigate(link.href)}
                      className="text-white/50 text-sm hover:text-white cursor-pointer transition-colors text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help Links */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
                Help
              </h4>
              <ul className="space-y-3">
                {footerLinks.help.map((link) => (
                  <li key={link.name}>
                    <button
                      type="button"
                      onClick={() => navigate(link.href)}
                      className="text-white/50 text-sm hover:text-white cursor-pointer transition-colors text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQ Links */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
                Shop
              </h4>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/50 text-sm hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              Repse.in © 2026, All Rights Reserved
            </p>
            <p className="text-white/50 text-xs">Payments are handled securely at checkout.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewsletterFooter;
