import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Body from "./body";
import Homepage from "./components/homepage";
import ProductsPage from "./components/products/productsPage";
import PracticeLayout from "./components/products/practiceLayout";
import ProductDetails from "./components/products/productDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import { store } from "./store/store";
import ScrollToTop from "./components/products/ScrollToTop";

function App() {
  return (
    <Provider store={store}>  
      <BrowserRouter>
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<Homepage />} />
            {/* Add more routes here as needed */}
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/practice" element={<PracticeLayout />} />
            <Route path="/product-details/:id" element={<ProductDetails />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
