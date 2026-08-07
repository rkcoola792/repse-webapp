import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../store/userSlice";
import { clearFavorites, saveFavoritesForUser } from "../store/favoritesSlice";
import { showPopup } from "../store/uiSlice";
import {
  Package,
  Heart,
  ShoppingBag,
  Settings,
  LayoutGrid,
  ChevronLeft,
} from "lucide-react";
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

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState("");

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetailLoading, setOrderDetailLoading] = useState(false);
  const [orderDetailError, setOrderDetailError] = useState("");

  useEffect(() => {
    if (!user) {
      setOrdersLoading(false);
      return;
    }
    const fetchOrders = async () => {
      setOrdersLoading(true);
      setOrdersError("");
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/my-orders`,
          { withCredentials: true }
        );
        setOrders(res.data || []);
      } catch (error) {
        setOrdersError(
          error.response?.data?.error || "Couldn't load your orders."
        );
      } finally {
        setOrdersLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  const handleViewOrder = async (orderId) => {
    setSelectedOrderId(orderId);
    setSelectedOrder(null);
    setOrderDetailError("");
    setOrderDetailLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/order/${orderId}`,
        { withCredentials: true }
      );
      setSelectedOrder(res.data);
    } catch (error) {
      setOrderDetailError(
        error.response?.data?.error || "Couldn't load this order."
      );
    } finally {
      setOrderDetailLoading(false);
    }
  };

  const handleBackToOrders = () => {
    setSelectedOrderId(null);
    setSelectedOrder(null);
    setOrderDetailError("");
  };

  const formatOrderDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const statusBadgeClass = (status) => {
    const s = (status || "pending").toLowerCase();
    if (s === "delivered") return "bg-green-50 text-green-700 border border-green-200";
    if (s === "cancelled") return "bg-gray-100 text-gray-400 border border-gray-200";
    if (s === "shipped" || s === "in transit" || s === "in-transit")
      return "bg-blue-50 text-blue-700 border border-blue-200";
    return "bg-amber-50 text-amber-700 border border-amber-200";
  };

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
              <div className="space-y-8">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-px bg-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-white p-6">
                    <div className="text-2xl sm:text-3xl font-black tracking-tight">
                      {ordersLoading ? "—" : orders.length}
                    </div>
                    <div className="text-xs uppercase tracking-wide text-gray-500 mt-1">
                      Total Orders
                    </div>
                  </div>
                  <div className="bg-white p-6">
                    <div className="text-2xl sm:text-3xl font-black tracking-tight">
                      {ordersLoading
                        ? "—"
                        : `₹${orders.reduce((sum, o) => sum + (o.amount || 0), 0)}`}
                    </div>
                    <div className="text-xs uppercase tracking-wide text-gray-500 mt-1">
                      Lifetime Spend
                    </div>
                  </div>
                  <div className="bg-white p-6">
                    <div className="text-2xl sm:text-3xl font-black tracking-tight">
                      {ordersLoading
                        ? "—"
                        : orders.filter((o) =>
                            ["shipped", "in transit", "in-transit"].includes(
                              (o.deliveryStatus || "").toLowerCase()
                            )
                          ).length}
                    </div>
                    <div className="text-xs uppercase tracking-wide text-gray-500 mt-1">
                      In Transit
                    </div>
                  </div>
                </div>

                {/* Recent orders */}
                <div>
                  <div className="flex items-baseline justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                    {orders.length > 0 && (
                      <button
                        onClick={() => setActiveTab("orders")}
                        className="text-xs font-medium uppercase tracking-wide text-gray-500 hover:text-gray-900 cursor-pointer"
                      >
                        View All →
                      </button>
                    )}
                  </div>

                  {ordersLoading && (
                    <div className="bg-white rounded-lg shadow-sm p-8">
                      <p className="text-sm text-gray-500 text-center">Loading your orders…</p>
                    </div>
                  )}

                  {!ordersLoading && orders.length === 0 && (
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
                  )}

                  {!ordersLoading && orders.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm px-5 sm:px-6 divide-y divide-gray-100">
                      {orders.slice(0, 3).map((order) => (
                        <button
                          key={order._id}
                          onClick={() => {
                            setActiveTab("orders");
                            handleViewOrder(order._id);
                          }}
                          className="w-full grid grid-cols-[56px_1fr_auto_auto] gap-4 items-center py-4 text-left cursor-pointer"
                        >
                          <div className="w-14 h-16 bg-gray-100 rounded overflow-hidden shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {order.items?.[0]?.name || "Order"}
                              {order.items?.length > 1 &&
                                ` +${order.items.length - 1} more`}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              Order #
                              {(order.orderId || order._id)?.slice(-8).toUpperCase()} —
                              Placed {formatOrderDate(order.createdAt)}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-wide whitespace-nowrap ${statusBadgeClass(
                              order.deliveryStatus
                            )}`}
                          >
                            {order.deliveryStatus || "Pending"}
                          </span>
                          <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                            ₹{order.amount ?? 0}
                          </p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Default address + account details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                        Default Address
                      </h3>
                      <button
                        onClick={() => setActiveTab("settings")}
                        className="text-xs font-medium text-gray-500 hover:text-gray-900 cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                    {orders[0]?.notes ? (
                      <div className="space-y-2.5">
                        <div className="flex justify-between text-sm py-1 border-b border-gray-100">
                          <span className="text-gray-500">Name</span>
                          <span className="text-gray-900 text-right">
                            {orders[0].notes.first_name}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm py-1 border-b border-gray-100 gap-4">
                          <span className="text-gray-500 shrink-0">Address</span>
                          <span className="text-gray-900 text-right">
                            {orders[0].notes.address}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm py-1">
                          <span className="text-gray-500">Phone</span>
                          <span className="text-gray-900 text-right">
                            {orders[0].notes.mobile}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">
                        No saved address yet — it'll appear here after your first order.
                      </p>
                    )}
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                        Account
                      </h3>
                      <button
                        onClick={() => setActiveTab("settings")}
                        className="text-xs font-medium text-gray-500 hover:text-gray-900 cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="space-y-2.5">
                      <div className="flex justify-between text-sm py-1 border-b border-gray-100">
                        <span className="text-gray-500">Email</span>
                        <span className="text-gray-900 text-right">{displayEmail || "—"}</span>
                      </div>
                      <div className="flex justify-between text-sm py-1 border-b border-gray-100">
                        <span className="text-gray-500">Cart Items</span>
                        <span className="text-gray-900">{cartItemCount}</span>
                      </div>
                      <div className="flex justify-between text-sm py-1">
                        <span className="text-gray-500">Favourites</span>
                        <span className="text-gray-900">{favorites.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                {selectedOrderId ? (
                  <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
                    <button
                      onClick={handleBackToOrders}
                      className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-6 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back to Orders
                    </button>

                    {orderDetailLoading && (
                      <p className="text-sm text-gray-500 py-10 text-center">
                        Loading order…
                      </p>
                    )}

                    {!orderDetailLoading && orderDetailError && (
                      <p className="text-sm text-red-500 py-10 text-center">
                        {orderDetailError}
                      </p>
                    )}

                    {!orderDetailLoading && selectedOrder && (
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                          <div className="flex flex-wrap gap-8">
                            <div>
                              <p className="text-[10.5px] uppercase tracking-wide text-gray-400 mb-1">
                                Order
                              </p>
                              <p className="text-sm font-semibold text-gray-900">
                                #
                                {(selectedOrder.orderId || selectedOrder._id)
                                  ?.slice(-8)
                                  .toUpperCase()}
                              </p>
                            </div>
                            <div>
                              <p className="text-[10.5px] uppercase tracking-wide text-gray-400 mb-1">
                                Placed
                              </p>
                              <p className="text-sm font-semibold text-gray-900">
                                {formatOrderDate(selectedOrder.createdAt)}
                              </p>
                            </div>
                            <div>
                              <p className="text-[10.5px] uppercase tracking-wide text-gray-400 mb-1">
                                Items
                              </p>
                              <p className="text-sm font-semibold text-gray-900">
                                {selectedOrder.items?.length || 0}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`px-3 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-wide whitespace-nowrap ${statusBadgeClass(
                              selectedOrder.deliveryStatus
                            )}`}
                          >
                            {selectedOrder.deliveryStatus || "Pending"}
                          </span>
                        </div>

                        {Array.isArray(selectedOrder.items) &&
                          selectedOrder.items.length > 0 && (
                            <div className="border-t border-gray-100">
                              {selectedOrder.items.map((item, idx) => (
                                <div
                                  key={item.id || idx}
                                  className="grid grid-cols-[56px_1fr_auto] gap-4 items-center py-3.5 border-b border-gray-100"
                                >
                                  <div className="w-14 h-16 bg-gray-100 rounded overflow-hidden shrink-0" />
                                  <div className="min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                      {item.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {[item.size, `Qty ${item.quantity}`]
                                        .filter(Boolean)
                                        .join(" — ")}
                                    </p>
                                  </div>
                                  <p className="text-sm text-gray-600">
                                    ₹{((item.amount || 0) / 100).toFixed(0)}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}

                        <div className="flex justify-between items-center pt-4 mt-2">
                          <span className="text-sm font-medium text-gray-900">
                            Total Paid
                          </span>
                          <span className="text-lg font-black">
                            ₹{selectedOrder.amount ?? 0}
                          </span>
                        </div>

                        {selectedOrder.notes && (
                          <div className="mt-6 p-4 border border-gray-200 rounded-lg">
                            <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">
                              Shipping To
                            </p>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {selectedOrder.notes.first_name}
                              <br />
                              {selectedOrder.notes.address}
                              <br />
                              {selectedOrder.notes.mobile}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    {ordersLoading && (
                      <div className="bg-white rounded-lg shadow-sm p-8">
                        <p className="text-sm text-gray-500 py-10 text-center">
                          Loading your orders…
                        </p>
                      </div>
                    )}

                    {!ordersLoading && ordersError && (
                      <div className="bg-white rounded-lg shadow-sm p-8">
                        <p className="text-sm text-red-500 py-10 text-center">
                          {ordersError}
                        </p>
                      </div>
                    )}

                    {!ordersLoading && !ordersError && orders.length === 0 && (
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

                    {!ordersLoading && !ordersError && orders.length > 0 && (
                      <div className="space-y-5">
                        {orders.map((order) => (
                          <div
                            key={order._id}
                            className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                          >
                            {/* Card header */}
                            <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-6 py-4 bg-gray-50 border-b border-gray-100">
                              <div className="flex flex-wrap gap-6 sm:gap-8">
                                <div>
                                  <p className="text-[10.5px] uppercase tracking-wide text-gray-400 mb-1">
                                    Order
                                  </p>
                                  <p className="text-sm font-semibold text-gray-900">
                                    #
                                    {(order.orderId || order._id)
                                      ?.slice(-8)
                                      .toUpperCase()}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-[10.5px] uppercase tracking-wide text-gray-400 mb-1">
                                    Placed
                                  </p>
                                  <p className="text-sm font-semibold text-gray-900">
                                    {formatOrderDate(order.createdAt)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-[10.5px] uppercase tracking-wide text-gray-400 mb-1">
                                    Items
                                  </p>
                                  <p className="text-sm font-semibold text-gray-900">
                                    {order.items?.length || 0}
                                  </p>
                                </div>
                              </div>
                              <span
                                className={`px-3 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-wide whitespace-nowrap ${statusBadgeClass(
                                  order.deliveryStatus
                                )}`}
                              >
                                {order.deliveryStatus || "Pending"}
                              </span>
                            </div>

                            {/* Card body: item rows */}
                            <div className="px-5 sm:px-6">
                              {(order.items || []).map((item, idx) => (
                                <div
                                  key={item.id || idx}
                                  className="grid grid-cols-[56px_1fr_auto] gap-4 items-center py-3.5 border-b border-gray-100 last:border-b-0"
                                >
                                  <div className="w-14 h-16 bg-gray-100 rounded overflow-hidden shrink-0" />
                                  <div className="min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                      {item.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {[item.size, `Qty ${item.quantity}`]
                                        .filter(Boolean)
                                        .join(" — ")}
                                    </p>
                                  </div>
                                  <p className="text-sm text-gray-600">
                                    ₹{((item.amount || 0) / 100).toFixed(0)}
                                  </p>
                                </div>
                              ))}
                            </div>

                            {/* Card footer */}
                            <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-6 py-4 border-t border-gray-100">
                              <p className="text-sm text-gray-500">
                                Total{" "}
                                <span className="text-base font-black text-gray-900 ml-1">
                                  ₹{order.amount ?? 0}
                                </span>
                              </p>
                              <button
                                onClick={() => handleViewOrder(order._id)}
                                className="px-5 py-2 border border-gray-300 text-gray-900 rounded-full text-xs font-semibold uppercase tracking-wide hover:border-gray-500 transition-colors cursor-pointer"
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
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
