"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Hero from "./hero";
import FeaturedProduct from "./featuredProduct";
import NewArrivalsGrid from "./newArrival";
import TopSelling from "./topSelling";
import Statement from "./statement";
import api from "../api/axios";
const Homepage = ({ initialProducts = [] }) => {
  const limit = 20;
  const { data: products = [], isPending: loading } = useQuery({
    queryKey: ["products", { page: 1, limit }],
    queryFn: async () => (await api.get("/products", { params: { page: 1, limit } })).data,
    initialData: initialProducts,
    staleTime: 60_000,
  });

  const newArrivals = products?.filter(
    (product) => product.newArrival === true
  );
  const topSellingProducts = products?.filter(
    (product) => product.topSelling === true
  );
  const featuredProduct =
    topSellingProducts?.[0] || newArrivals?.[0] || products?.[0];
  const heroProduct = products.find((product) => product._id !== featuredProduct?._id) || featuredProduct;
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
