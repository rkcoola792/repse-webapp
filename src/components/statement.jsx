import { useNavigate } from "react-router-dom";

// TODO: placeholder numbers — swap for real stats before launch, then uncomment the block below.
// const STATS = [
//   { value: "50+", label: "Performance Styles" },
//   { value: "2,000+", label: "Products Shipped" },
//   { value: "30,000+", label: "Happy Customers" },
// ];

export default function Statement() {
  const navigate = useNavigate();

  return (
    <section className="bg-black py-16 sm:py-24">
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-16 text-center">
        <p className="flex items-center justify-center gap-3 text-white/50 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase mb-6">
          <span className="w-8 h-px bg-white/50" />
          No Excuses
          <span className="w-8 h-px bg-white/50" />
        </p>

        <h2 className="text-white font-black uppercase tracking-tight leading-[0.95] text-4xl sm:text-6xl lg:text-7xl">
          Train Like
          <br />
          <span className="text-stroke">No One's</span>
          <br />
          Watching
        </h2>

        <p className="mt-6 text-white/60 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
          Built off concrete, not carpet — gear engineered for people who
          load bars, not carts.
        </p>

        <button
          onClick={() => navigate("/products")}
          className="mt-8 inline-flex items-center gap-2 bg-white text-black px-8 py-3.5 rounded-full text-sm font-semibold uppercase tracking-wide cursor-pointer hover:bg-gray-200 transition-colors"
        >
          Shop The Drop
        </button>

        {/* <div className="mt-14 sm:mt-16 pt-10 border-t border-white/10 flex flex-wrap justify-center gap-x-12 gap-y-8 sm:gap-x-20">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div className="text-white font-black text-3xl sm:text-5xl tracking-tight">
                {stat.value}
              </div>
              <div className="text-white/50 text-xs uppercase tracking-wide mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}
