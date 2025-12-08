export default function Hero() {
  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-12 lg:py-20">
          {/* Left column: text */}
          <div className="lg:col-span-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
              FIND CLOTHES
              <br />
              THAT MATCHES
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700">
                YOUR STYLE
              </span>
            </h1>

            <p className="mt-6 text-gray-600 max-w-xl">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </p>

            <div className="mt-8 flex flex-col  gap-3">
              <a className="inline-block bg-black text-white px-8 py-3 rounded-full text-sm font-medium w-fit" >
                Shop Now
              </a>

              <div className="flex items-center gap-6 mt-4 sm:mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">200+</div>
                  <div className="text-xs text-gray-500">
                    International Brands
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">2,000+</div>
                  <div className="text-xs text-gray-500">
                    High-Quality Products
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">30,000+</div>
                  <div className="text-xs text-gray-500">Happy Customers</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: image */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-md lg:max-w-lg">
              <div className="relative">
                <img
                  src="/hero-banner.jpg"
                  alt="hero"
                  className="w-full h-auto rounded-xl object-cover shadow-lg"
                />

                {/* decorative stars (absolute) */}
                <div className="hidden md:block absolute -top-6 -right-6 transform rotate-12 text-black opacity-60">
                  ✦
                </div>
                <div className="hidden md:block absolute bottom-6 right-16 text-black opacity-60">
                  ✦
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* brand bar */}
      <div className="bg-black mt-6">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between overflow-x-auto space-x-8">
          {["VERSACE", "ZARA", "GUCCI", "PRADA", "Calvin Klein"].map((b) => (
            <div
              key={b}
              className="text-white whitespace-nowrap font-medium text-lg"
            >
              {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}