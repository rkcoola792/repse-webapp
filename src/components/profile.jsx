import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../store/userSlice";
import { clearFavorites, saveFavoritesForUser } from "../store/favoritesSlice";
import { showPopup } from "../store/uiSlice";
import { Package, Heart, ShoppingBag, Settings, LayoutGrid } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SIDEBAR_ITEMS = [
  { key: "overview", label: "Overview", icon: LayoutGrid },
  { key: "orders", label: "Orders", icon: Package },
  { key: "settings", label: "Account Settings", icon: Settings },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const cartItems = useSelector((state) => state.cart.cart);
  const favorites = useSelector((state) => state.favorites.favorites);
  const dispatch = useDispatch();

  const displayName = user?.user?.name || "Member";
  const displayEmail = user?.user?.email || user?.email || "";
  const initials =
    displayName
      .trim()
      .split(/\s+/)
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [formData, setFormData] = useState({
    email: user?.user?.email || "",
    firstName: user?.user?.name || "",
    lastName: "",
    dateOfBirth: "",
    mobileNumber: "",
    gender: "",
    address: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    dispatch(
      showPopup({
        message: "Profile editing isn't connected to your account yet.",
      })
    );
  };

  const handleDeleteAccount = () => {
    dispatch(
      showPopup({
        message: "Account deletion isn't available yet — contact support.",
      })
    );
  };

  const handleLogout = async () => {
    const userEmail = user?.user?.email || user?.email;
    if (userEmail) {
      dispatch(saveFavoritesForUser(userEmail));
    }
    try {
      await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/signout`);
    } catch (error) {
      console.error(error);
    }
    dispatch(removeUser());
    dispatch(clearFavorites());
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page banner */}
      <div className="bg-black py-10 sm:py-12">
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-16 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center flex-shrink-0">
              <span className="text-black font-black text-lg">{initials}</span>
            </div>
            <div>
              <h1 className="text-white font-black uppercase tracking-tight text-2xl sm:text-3xl">
                {displayName}
              </h1>
              {displayEmail && (
                <p className="text-white/50 text-sm mt-1">{displayEmail}</p>
              )}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2.5 border border-white/25 text-white text-sm font-medium uppercase tracking-wide rounded-full hover:bg-white hover:text-black transition-colors cursor-pointer"
          >
            Log Out
          </button>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-16 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-4 space-y-1">
              {SIDEBAR_ITEMS.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  className={`w-full flex items-center gap-3 text-left px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                    activeTab === item.key
                      ? "bg-gray-100 text-gray-900 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}

              <button
                onClick={() => navigate("/favourites")}
                className="w-full flex items-center gap-3 text-left px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Heart className="w-4 h-4" />
                Favourites
              </button>

              <div className="pt-2 mt-2 border-t border-gray-100 space-y-1">
                <button
                  onClick={handleDeleteAccount}
                  className="w-full px-4 py-3 border-2 border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  Delete My Account
                </button>
                <button
                  className="w-full px-4 py-3 border-2 border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-px bg-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-white p-6">
                    <div className="text-2xl sm:text-3xl font-black tracking-tight">
                      {cartItemCount}
                    </div>
                    <div className="text-xs uppercase tracking-wide text-gray-500 mt-1">
                      Cart Items
                    </div>
                  </div>
                  <div className="bg-white p-6">
                    <div className="text-2xl sm:text-3xl font-black tracking-tight">
                      {favorites.length}
                    </div>
                    <div className="text-xs uppercase tracking-wide text-gray-500 mt-1">
                      Favourites
                    </div>
                  </div>
                  <div className="bg-white p-6">
                    <div className="text-2xl sm:text-3xl font-black tracking-tight">0</div>
                    <div className="text-xs uppercase tracking-wide text-gray-500 mt-1">
                      Orders
                    </div>
                  </div>
                </div>

                {/* Recent orders empty state */}
                <div className="bg-white rounded-lg shadow-sm p-8 sm:p-12 text-center">
                  <ShoppingBag className="w-10 h-10 mx-auto text-gray-300 mb-4" />
                  <h2 className="font-semibold text-gray-900 mb-1">No orders yet</h2>
                  <p className="text-sm text-gray-500 mb-6">
                    Your recent orders will show up here once you make a purchase.
                  </p>
                  <button
                    onClick={() => navigate("/products")}
                    className="px-6 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="bg-white rounded-lg shadow-sm p-8 sm:p-16 text-center">
                <Package className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                  No orders yet
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  Once you place an order, you'll be able to track it here.
                </p>
                <button
                  onClick={() => navigate("/products")}
                  className="px-6 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h1 className="text-2xl font-semibold text-gray-800 mb-8">
                  Account Settings
                </h1>

                <div>
                  {/* Email */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                      Email Id
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>

                  {/* General Information */}
                  <h2 className="text-lg font-medium text-gray-700 mb-6 mt-8">
                    General Information
                  </h2>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="text"
                        name="dateOfBirth"
                        placeholder="Please enter your birthdate"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-400"
                      />
                    </div>

                    {/* Last Name */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        name="mobileNumber"
                        placeholder="Mobile Number"
                        value={formData.mobileNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="mt-6">
                    <label className="block text-gray-700 font-medium mb-3">
                      Gender
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          checked={formData.gender === "male"}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-black focus:ring-black"
                        />
                        <span className="ml-2 text-gray-700">Male</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          checked={formData.gender === "female"}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-black focus:ring-black"
                        />
                        <span className="ml-2 text-gray-700">Female</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value="other"
                          checked={formData.gender === "other"}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-black focus:ring-black"
                        />
                        <span className="ml-2 text-gray-700">Other</span>
                      </label>
                    </div>
                  </div>

                  {/* Default Address */}
                  <div className="mt-6">
                    <label className="block text-gray-700 font-medium mb-2">
                      Default Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="No address selected"
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-400"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-8">
                    <button
                      onClick={handleSaveProfile}
                      className="px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
