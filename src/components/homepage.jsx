import React, { useEffect } from "react";
import Hero from "./hero";
import NewArrivalsGrid from "./newArrival";
import TopSelling from "./topSelling";
import BrowseByDressStyle from "./dressStyleComponent";
import OurHappyCustomers from "./reviews";
import axios from "axios";

const Homepage = () => {
  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/products`,
        { withCredentials: true }
      );
      console.log("response", response);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <Hero />
      <NewArrivalsGrid />
      <TopSelling />
      <BrowseByDressStyle />
      <OurHappyCustomers />
    </>
  );
};

export default Homepage;
