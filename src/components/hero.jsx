import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { CATEGORIES } from "../constants/categories";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="bg-white">
      {/* Typographic hero */}
      <div className="relative bg-black overflow-hidden">
        {/* ambient glow accents */}
        <div className="absolute -top-32 -right-32 w-[520px] h-[520px] bg-white/6 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-20 w-[420px] h-[420px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
        {/* giant watermark */}
        <div className="hidden xl:block absolute top-0 right-0 text-white/4 text-[260px] font-black leading-none tracking-tighter select-none pointer-events-none translate-x-10 -translate-y-6">
          TRAIN
        </div>

        <div className="relative max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-16 pt-20 sm:pt-24 lg:pt-28 pb-14 sm:pb-16 lg:pb-20">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left: copy */}
            <div className="lg:col-span-7">
              <p className="flex items-center gap-3 text-white/60 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase mb-5">
                <span className="w-8 h-px bg-white/60" />
                Performance Collection
              </p>

              <h1 className="text-white font-black uppercase tracking-tight leading-[0.92] text-5xl sm:text-7xl lg:text-8xl">
                Train In Gear
                <br />
                That Keeps
                <br />
                Up With You
              </h1>

              <p className="mt-6 text-white/70 max-w-md text-sm sm:text-base leading-relaxed">
                Sweat-wicking fabrics, four-way stretch and a fit built for
                every rep — gymwear made to move as hard as you do.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6 sm:gap-8">
                <button
                  onClick={() => navigate("/products")}
                  className="bg-white text-black px-8 py-3.5 rounded-full text-sm font-semibold uppercase tracking-wide cursor-pointer hover:bg-gray-200 transition-colors"
                >
                  Shop Now
                </button>
                <button
                  onClick={() => navigate("/products")}
                  className="group flex items-center gap-2 text-white text-sm font-semibold uppercase tracking-wide cursor-pointer"
                >
                  Explore Categories
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Right: category grid */}
            <div className="lg:col-span-5 hidden lg:grid grid-cols-2 gap-4">
              {CATEGORIES.map((c, i) => (
                <button
                  key={c.slug}
                  onClick={() => navigate(`/products?category=${c.slug}`)}
                  className={`group relative rounded-2xl border border-white/15 bg-white/4 hover:bg-white/9 hover:border-white/30 backdrop-blur-sm px-5 py-6 text-left transition-colors cursor-pointer ${
                    i % 2 === 1 ? "mt-8" : ""
                  } ${i === CATEGORIES.length - 1 ? "col-span-2" : ""}`}
                >
                  <span className="block text-white/35 text-xs font-mono mb-3">
                    0{i + 1}
                  </span>
                  <span className="flex items-center justify-between text-white font-bold uppercase tracking-tight text-lg">
                    {c.label}
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden sm:flex justify-center pb-6 text-white/50">
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </div>

      {/* Ticker */}
      <div className="bg-black border-t border-white/10 py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[0, 1].map((rep) => (
            <div key={rep} className="flex items-center shrink-0" aria-hidden={rep === 1}>
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className="flex items-center font-black uppercase tracking-widest text-sm text-white/40 mx-4"
                >
                  No Excuses
                  <span className="mx-4 text-white/20">•</span>
                  Built Different
                  <span className="mx-4 text-white/20">•</span>
                  Train Hard
                  <span className="mx-4 text-white/20">•</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
