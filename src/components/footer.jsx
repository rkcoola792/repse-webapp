import React, { useState } from "react";
import { Mail, Twitter, Facebook, Instagram, Github } from "lucide-react";

const NewsletterFooter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    console.log("Subscribed with email:", email);
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
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-10">
        <div className="bg-black rounded-3xl p-6 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <h2 className="text-white text-4xl font-black max-w-md leading-tight">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h2>

          <div className="flex flex-col gap-3 w-full md:w-auto">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full md:w-80 pl-12 pr-4 py-3 rounded-full bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>
            <button
              onClick={handleSubscribe}
              className="w-full md:w-80 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-16 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-3xl font-black mb-4">SHOP.CO</h3>
              <p className="text-gray-600 text-sm mb-6 max-w-xs">
                We have clothes that suits your style and which you're proud to
                wear. From women to men.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                  <Facebook className="w-4 h-4 text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-bold text-sm mb-4 uppercase tracking-wider">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-600 text-sm hover:text-gray-900 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help Links */}
            <div>
              <h4 className="font-bold text-sm mb-4 uppercase tracking-wider">
                Help
              </h4>
              <ul className="space-y-3">
                {footerLinks.help.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-600 text-sm hover:text-gray-900 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQ Links */}
            <div>
              <h4 className="font-bold text-sm mb-4 uppercase tracking-wider">
                FAQ
              </h4>
              <ul className="space-y-3">
                {footerLinks.faq.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-600 text-sm hover:text-gray-900 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="font-bold text-sm mb-4 uppercase tracking-wider">
                Resources
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-600 text-sm hover:text-gray-900 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              Shop.co © 2000-2023, All Rights Reserved
            </p>
            <div className="flex gap-3">
              <div className="w-12 h-8 bg-white border border-gray-300 rounded flex items-center justify-center">
                <span className="text-blue-600 font-bold text-xs">VISA</span>
              </div>
              <div className="w-12 h-8 bg-white border border-gray-300 rounded flex items-center justify-center">
                <span className="font-bold text-xs">
                  <span className="text-red-600">●</span>
                  <span className="text-orange-500">●</span>
                </span>
              </div>
              <div className="w-12 h-8 bg-white border border-gray-300 rounded flex items-center justify-center">
                <span className="text-blue-600 font-bold text-xs">PayPal</span>
              </div>
              <div className="w-12 h-8 bg-white border border-gray-300 rounded flex items-center justify-center">
                <span className="font-bold text-xs">Pay</span>
              </div>
              <div className="w-12 h-8 bg-white border border-gray-300 rounded flex items-center justify-center">
                <span className="font-bold text-xs">G Pay</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewsletterFooter;
