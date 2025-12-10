import { useState } from "react";
import "./App.css";
import Header from "./components/header";
import Hero from "./components/hero";
import NewArrivals from "./components/newArrival";
import TopSelling from "./components/topSelling";
import BrowseByDressStyle from "./components/dressStyleComponent";
import OurHappyCustomers from "./components/reviews";
import NewsletterFooter from "./components/footer";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Body from "./body";
import Homepage from "./components/homepage";
import ProductPage from "./components/products/productsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route index element={<Homepage />} />
          {/* Add more routes here as needed */}
          <Route path="/products" element={<ProductPageo/>}/>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
