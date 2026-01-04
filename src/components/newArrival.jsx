import React from "react";
import ProductCard from "./products/productCard";
import { useNavigate } from "react-router-dom";
const NewArrivalsGrid = ({products}) => {
  console.log("New Arrivals Products:", products);
  const navigate = useNavigate();
  // const products = [
  //   {
  //     id: 1,
  //     title: "T-shirt with Tape Details",
  //     rating: 4.5,
  //     reviews: "4.5",
  //     price: 120,
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
  //   },
  //   {
  //     id: 2,
  //     title: "Skinny Fit Jeans",
  //     rating: 3.5,
  //     reviews: "3.5",
  //     price: 240,
  //     originalPrice: 260,
  //     discount: 20,
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
  //   },
  //   {
  //     id: 3,
  //     title: "Checkered Shirt",
  //     rating: 4.5,
  //     reviews: "4.5",
  //     price: 180,
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
  //   },
  //   {
  //     id: 4,
  //     title: "Sleeve Striped T-shirt",
  //     rating: 4.5,
  //     reviews: "4.5",
  //     price: 130,
  //     originalPrice: 160,
  //     discount: 30,
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop",
  //   },
  // ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-16 py-0 sm:py-12 lg:py-2">
        <h1 className="text-3xl sm:text-5xl font-black text-center mb-8 sm:mb-12 tracking-tight">
          NEW ARRIVALS
        </h1>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ">
          {products?.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="text-center" onClick={() => navigate("/products")}>
          <button className="px-6 py-2 sm:px-8 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-full cursor-pointer font-medium hover:bg-gray-50 transition-colors">
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewArrivalsGrid;
