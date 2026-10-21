import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, Suspense, lazy } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Body from "./body";
import Homepage from "./components/homepage";
import { persistor } from "./store/store";
import ScrollToTop from "./components/products/ScrollToTop";
import Popup from "./components/Popup";
import LoginPromptModal from "./components/LoginPromptModal";
import { loadFavoritesForUser } from "./store/favoritesSlice";

// Routes outside the initial landing page are code-split so the first
// paint doesn't pay for JS the visitor may never need this session.
const ProductsPage = lazy(() => import("./components/products/productsPage"));
const ProductDetails = lazy(() => import("./components/products/productDetails"));
const Login = lazy(() => import("./components/Login"));
const Profile = lazy(() => import("./components/profile"));
const Favourites = lazy(() => import("./components/Favourites"));
const TermsAndConditions = lazy(() => import("./components/policies/termsAndConditions"));
const Privacy = lazy(() => import("./components/policies/privacy"));
const CancellationsAndRefunds = lazy(() => import("./components/policies/cancellationsAndRefunds"));
const Shipping = lazy(() => import("./components/policies/shipping"));
const ContactUs = lazy(() => import("./components/policies/contactUs"));
const About = lazy(() => import("./components/about"));
const ThankYouPage = lazy(() => import("./components/thankyouPage"));

function App() {
  const loginPromptVisible = useSelector(
    (state) => state.ui.loginPromptVisible
  );
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const identity = user?.user?.email || user?.user?.mobile;
    if (identity) {
      dispatch(loadFavoritesForUser(identity));
    }
  }, [user, dispatch]);
  return (
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route index element={<Homepage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route
                path="/profile"
                element={
                  user?.user && (user.user.email || user.user.mobile) ? (
                    <Profile />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/about" element={<About />} />
              <Route path="/refunds" element={<CancellationsAndRefunds />} />
              <Route path="/payment-success" element={<ThankYouPage />} />
              <Route path="/product-details/:id" element={<ProductDetails />} />
            </Route>
            <Route
              path="/login"
              element={
                user?.user && (user.user.email || user.user.mobile) ? (
                  <Navigate to="/" replace />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/register"
              element={<Navigate to="/login" replace />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
        <Popup />
        {loginPromptVisible && <LoginPromptModal />}
      </BrowserRouter>
    </PersistGate>
  );
}

export default App;
