import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "../constants/categories";

export default function Hero({ product }) {
  const navigate = useNavigate();

  return (
    <section className="bg-neutral-950 text-white">
      <div className="mx-auto grid max-w-screen-2xl items-center gap-8 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-2 lg:gap-14 lg:px-16 lg:py-16">
        <div className="py-3 lg:py-8">
          <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/60 sm:text-sm">
            <span className="h-px w-8 bg-white/60" /> Performance Collection
          </p>
          <h1 className="font-display max-w-2xl text-5xl uppercase leading-[0.92] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
            Train in gear that keeps up.
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
            Performance gymwear for lifting, running, and everything between.
            Find your next training essential.
          </p>
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-white px-7 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Shop the collection <ArrowRight className="h-4 w-4" />
          </button>
          <div className="mt-9 flex flex-wrap gap-2" aria-label="Shop by category">
            {CATEGORIES.map((category) => (
              <button
                key={category.slug}
                type="button"
                onClick={() => navigate(`/products?category=${category.slug}`)}
                className="rounded-full border border-white/25 px-3.5 py-2 text-xs font-medium text-white/80 transition hover:border-white hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => product && navigate(`/product-details/${product._id}`)}
          disabled={!product}
          aria-label={product ? `Shop ${product.name}` : "Featured product"}
          className="group relative block aspect-[4/4.5] w-full overflow-hidden bg-neutral-800 text-left disabled:cursor-default sm:aspect-[4/3.5] lg:aspect-[4/4.5]"
        >
          {(product?.primaryImage || product?.images?.[0]) ? (
            <img
              src={product.primaryImage || product.images[0]}
              alt={product.name}
              fetchPriority="high"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full items-end bg-[radial-gradient(ellipse_at_75%_25%,#3b3b3b,transparent_55%),linear-gradient(135deg,#171717,#050505)] p-8 sm:p-12">
              <span className="text-5xl font-black uppercase leading-none tracking-tight text-white/10 sm:text-7xl">REPSE</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
          <span className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 sm:bottom-7 sm:left-7 sm:right-7">
            <span>
              <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">{product?.category || "REPSE training gear"}</span>
              <span className="block text-xl font-bold uppercase tracking-tight text-white sm:text-2xl">{product?.name || "Built for the work"}</span>
              {product && <span className="mt-1 block text-sm text-white/80">₹{product.price}</span>}
            </span>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-black transition group-hover:translate-x-1" aria-hidden="true">
              <ArrowRight className="h-5 w-5" />
            </span>
          </span>
        </button>
      </div>
      <div className="overflow-hidden border-t border-white/10 py-3" aria-hidden="true">
        <p className="animate-marquee whitespace-nowrap text-center text-xs font-bold uppercase tracking-[0.25em] text-white/45 motion-reduce:animate-none">
          TRAIN HARD <span className="mx-6 text-white/20">•</span> BUILT TO MOVE <span className="mx-6 text-white/20">•</span> REPSE PERFORMANCE <span className="mx-6 text-white/20">•</span> TRAIN HARD <span className="mx-6 text-white/20">•</span> BUILT TO MOVE
        </p>
      </div>
    </section>
  );
}
