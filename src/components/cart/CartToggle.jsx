import { useState } from "react";
import { Handbag, Heart} from "lucide-react";

export default function CartWishlistToggle() {
  const [isWishlist, setIsWishlist] = useState(false);

  return (
    <div className="flex items-center gap-4">
      {/* Toggle */}
      <div
        onClick={() => setIsWishlist(!isWishlist)}
        className="relative w-24 h-11 rounded-full bg-zinc-200 cursor-pointer"
      >
        {/* Slider */}
        <div
          className={`absolute top-1 left-1 w-12 h-9 rounded-full
            flex items-center justify-center bg-black
            transition-all duration-300 p-2
            ${isWishlist ? "translate-x-10" : "translate-x-0"}
          `}
        >
          {isWishlist ? (
            <Heart className="w-5 h-5 text-white fill-white" />
          ) : (
            <Handbag className="w-5 h-5 text-white "/>
          )}
        </div>
      </div>

    </div>
  );
}
