import React from "react";
import Hero from "./hero";
import NewArrivalsGrid from "./newArrival";
import TopSelling from "./topSelling";
import BrowseByDressStyle from "./dressStyleComponent";
import OurHappyCustomers from "./reviews";

const Homepage = () => {
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
