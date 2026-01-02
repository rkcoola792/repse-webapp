import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Body from "./body";
import Homepage from "./components/homepage";
import ProductsPage from "./components/products/productsPage";
import PracticeLayout from "./components/products/practiceLayout";
import ProductDetails from "./components/products/productDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import { persistor } from "./store/store";
import ScrollToTop from "./components/products/ScrollToTop";
import Popup from "./components/Popup";
import LoginPromptModal from "./components/LoginPromptModal";
import Profile from "./components/profile";
import Favourites from "./components/Favourites";
import { loadFavoritesForUser } from "./store/favoritesSlice";

function App() {
  const loginPromptVisible = useSelector(state => state.ui.loginPromptVisible);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.user && user.user.email) {
      dispatch(loadFavoritesForUser(user.user.email));
    }
  }, [user, dispatch]);
  return (
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<Homepage />} />
            {/* Add more routes here as needed */}
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/practice" element={<PracticeLayout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/product-details/:id" element={<ProductDetails />} />
          </Route>
          <Route path="/login" element={user && user.user && user.user.email ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/register" element={user && user.user && user.user.email ? <Navigate to="/" replace /> : <Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Popup />
        {loginPromptVisible && <LoginPromptModal />}
      </BrowserRouter>
    </PersistGate>
  );
}

export default App;
