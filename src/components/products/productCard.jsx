import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ images, name, price, _id }) => {
  console.log("ProductCard props:", images);
  const navigate = useNavigate();
  return (
    <div
      className="bg-gray-100 rounded-lg p-6 flex flex-col cursor-pointer"
      onClick={() => navigate(`/product-details/${_id}`)}
    >
      <div className="bg-white rounded-lg mb-4 flex items-center justify-center h-48 overflow-hidden">
        <img
          src={images && images[0]}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">{name}</h3>

      <div className="flex items-center gap-2">
        <span className="font-bold text-xl text-gray-900">${price}</span>
      </div>
    </div>
  );
};
export default ProductCard;
