import React, { useState } from "react";
import { Twitter, Facebook, Instagram, Github, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const NewsletterFooter = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // null | "error" | "success"

  const handleSubscribe = () => {
    if (!isValidEmail(email)) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  };

  const footerLinks = {
    company: [
      { name: "About", href: "#" },
      { name: "Features", href: "#" },
      { name: "Works", href: "#" },
      { name: "Career", href: "#" },
    ],
    help: [
      { name: "Cancellation/Returns", href: "/refunds" },
      { name: "Shipping", href: "/shipping" },
      { name: "Terms & Conditions", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Contact Us", href: "/contact" },
    ],
    faq: [
      { name: "Account", href: "#" },
      { name: "Manage Deliveries", href: "#" },
      { name: "Orders", href: "#" },
      { name: "Payments", href: "#" },
    ],
    resources: [
      { name: "Free eBooks", href: "#" },
      { name: "Development Tutorial", href: "#" },
      { name: "How to - Blog", href: "#" },
      { name: "Youtube Playlist", href: "#" },
    ],
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
            No spam. Just release dates and restock alerts.
          </p>

          <div className="max-w-md mx-auto">
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
                onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                placeholder="Enter your email"
                className="flex-1 min-w-0 bg-transparent px-5 py-3.5 text-sm text-black placeholder-gray-400 outline-none"
              />
              <button
                onClick={handleSubscribe}
                className="px-6 py-3.5 bg-black text-white text-sm font-semibold uppercase tracking-wide hover:bg-gray-800 transition-colors cursor-pointer whitespace-nowrap"
              >
                Notify Me
              </button>
            </div>
            {status === "error" && (
              <p className="text-red-500 text-xs mt-2">Enter a valid email address.</p>
            )}
            {status === "success" && (
              <p className="text-green-600 text-xs mt-2 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Subscribed! Watch your inbox for drops.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-black">
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-16 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-white text-3xl font-black mb-4">REPSE.IN</h3>
              <p className="text-white/50 text-sm mb-6 max-w-xs">
                Performance gymwear built for training, running and everyday
                movement — for every athlete, every rep.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Facebook className="w-4 h-4 text-black" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
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

            {/* Help Links */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
                Help
              </h4>
              <ul className="space-y-3">
                {footerLinks.help.map((link) => (
                  <li key={link.name}>
                    <p
                      onClick={() => navigate(link.href)}
                      className="text-white/50 text-sm hover:text-white cursor-pointer transition-colors"
                    >
                      {link.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQ Links */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
                FAQ
              </h4>
              <ul className="space-y-3">
                {footerLinks.faq.map((link) => (
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

            {/* Resources Links */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
                Resources
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
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
            <div className="flex gap-3">
              <div className="w-12 h-8 border border-white/20 rounded flex items-center justify-center">
                <span className="text-blue-400 font-bold text-xs">VISA</span>
              </div>
              <div className="w-12 h-8 border border-white/20 rounded flex items-center justify-center">
                <span className="font-bold text-xs">
                  <span className="text-red-500">●</span>
                  <span className="text-orange-400">●</span>
                </span>
              </div>
              <div className="w-12 h-8 border border-white/20 rounded flex items-center justify-center">
                <span className="text-blue-400 font-bold text-xs">PayPal</span>
              </div>
              <div className="w-12 h-8 border border-white/20 rounded flex items-center justify-center">
                <span className="text-white/70 font-bold text-xs">Pay</span>
              </div>
              <div className="w-12 h-8 border border-white/20 rounded flex items-center justify-center">
                <span className="text-white/70 font-bold text-xs">G Pay</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewsletterFooter;
