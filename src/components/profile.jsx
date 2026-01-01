import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../store/userSlice";
import { clearCart } from "../store/cartSlice";
import { clearFavorites, saveFavoritesForUser } from "../store/favoritesSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

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

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };
  const handleLogout = async () => {
    const userEmail = user?.user?.email || user?.email;
    if (userEmail) {
      dispatch(saveFavoritesForUser(userEmail));
    }
    try {
      await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/signout`);
    } catch (error) {
      console.log(error);
    }
    dispatch(removeUser());
    dispatch(clearFavorites());
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-4 space-y-2">
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <span className="text-orange-500 text-sm font-medium cursor-pointer">
                  Get Membership Now
                </span>
              </div>

              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "orders"
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Orders
                <span className="text-sm text-gray-400 ml-2">
                  [Track your order here]
                </span>
              </button>

              <button
                onClick={() => setActiveTab("vouchers")}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "vouchers"
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Gift Vouchers
              </button>

              <button
                onClick={() => setActiveTab("faqs")}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "faqs"
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                FAQs
              </button>

              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "profile"
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Profile
              </button>

              <button className="w-full px-4 py-3 mt-4 border-2 border-gray-300 text-black font-medium rounded-lg hover:bg-gray-50 cursor-pointer">
                DELETE MY ACCOUNT
              </button>

              <button
                className="w-full px-4 py-3 border-2 border-gray-300 text-black font-medium rounded-lg  hover:bg-gray-50  cursor-pointer"
                onClick={handleLogout}
              >
                 LOGOUT
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h1 className="text-2xl font-semibold text-gray-800 mb-8">
                EDIT PROFILE
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
                      First Name <span className="text-red-500">*</span>
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
                      Mobile Number <span className="text-red-500">*</span>
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
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-gray-700 font-medium">
                      Default Address
                    </label>
                    <button
                      type="button"
                      className="text-black hover:text-teal-700 font-medium"
                    >
                      Change/Edit
                    </button>
                  </div>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="No Address Selected"
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-400"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="mt-8">
                  <button
                    onClick={handleSubmit}
                    className="px-8 py-3 bg-black text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
