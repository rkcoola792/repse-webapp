import React, { useEffect } from "react";
import Hero from "./hero";
import NewArrivalsGrid from "./newArrival";
import TopSelling from "./topSelling";
import BrowseByDressStyle from "./dressStyleComponent";
import OurHappyCustomers from "./reviews";
import axios from "axios";
import { useState } from "react";
const Homepage = () => {
  const [page, setPage] = useState(1);
  const limit = 20;
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/products?page=${page}&limit=${limit}`,
        { withCredentials: true }
      );
      console.log("Products fetched:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const newArrivals = products?.filter(
    (product) => product.newArrival === true
  );
  const topSellingProducts = products?.filter(
    (product) => product.topSelling === true
  );
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <Hero />
      <NewArrivalsGrid products={newArrivals} />
      <TopSelling products={topSellingProducts} />
      <BrowseByDressStyle />
      <OurHappyCustomers />
    </>
  );
};

export default Homepage;
