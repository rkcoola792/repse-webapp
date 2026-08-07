import React, { useEffect } from "react";
import Hero from "./hero";
import FeaturedProduct from "./featuredProduct";
import NewArrivalsGrid from "./newArrival";
import TopSelling from "./topSelling";
import Statement from "./statement";
import axios from "axios";
import { useState } from "react";
const Homepage = () => {
  const [page, setPage] = useState(1);
  const limit = 20;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/products?page=${page}&limit=${limit}`,
        { withCredentials: true }
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const newArrivals = products?.filter(
    (product) => product.newArrival === true
  );
  const topSellingProducts = products?.filter(
    (product) => product.topSelling === true
  );
  const featuredProduct =
    topSellingProducts?.[0] || newArrivals?.[0] || products?.[0];
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <Hero />
      <NewArrivalsGrid products={newArrivals} loading={loading} />
      <FeaturedProduct product={featuredProduct} loading={loading} />
      <TopSelling products={topSellingProducts} loading={loading} />
      <Statement />
    </>
  );
};

export default Homepage;
