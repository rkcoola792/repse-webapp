import React, { useEffect, useState } from "react";
import Hero from "./hero";
import FeaturedProduct from "./featuredProduct";
import NewArrivalsGrid from "./newArrival";
import TopSelling from "./topSelling";
import Statement from "./statement";
import api from "../api/axios";
const Homepage = () => {
  const limit = 20;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get("/products", {
        params: { page: 1, limit },
      });
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
  const heroProduct = products.find((product) => product._id !== featuredProduct?._id) || featuredProduct;
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <Hero product={heroProduct} />
      <NewArrivalsGrid products={newArrivals} loading={loading} />
      <FeaturedProduct product={featuredProduct} loading={loading} />
      <TopSelling products={topSellingProducts} loading={loading} />
      <Statement />
    </>
  );
};

export default Homepage;
