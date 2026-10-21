"use client";
import { useRef } from "react";
import { Star, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

function TestimonialCard({ name, verified, rating = 5, review }) {
  return (
    <article className="min-w-[280px] max-w-[400px] shrink-0 rounded-2xl border border-gray-200 bg-white p-4 sm:min-w-[320px] sm:p-6">
      <div className="mb-3 flex gap-1" aria-label={`${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} aria-hidden="true" className={`h-5 w-5 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
        ))}
      </div>
      <div className="mb-3 flex items-center gap-2">
        <h3 className="text-lg font-bold">{name}</h3>
        {verified && <CheckCircle aria-label="Verified purchase" className="h-5 w-5 text-green-600" />}
      </div>
      <p className="text-sm leading-relaxed text-gray-600">“{review}”</p>
    </article>
  );
}

export default function OurHappyCustomers({ testimonials = [] }) {
  const containerRef = useRef(null);
  if (testimonials.length === 0) return null;

  const scroll = (direction) => {
    containerRef.current?.scrollBy({
      left: direction * (window.innerWidth < 640 ? 300 : 370),
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white py-10 sm:py-12" aria-labelledby="customer-reviews-title">
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-8 lg:px-16">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 id="customer-reviews-title" className="text-2xl font-black tracking-tight sm:text-4xl">CUSTOMER REVIEWS</h2>
          <div className="flex gap-3 self-start sm:self-auto">
            <button type="button" onClick={() => scroll(-1)} aria-label="Previous reviews" className="rounded-full border border-gray-300 p-3 hover:bg-gray-50"><ChevronLeft className="h-5 w-5" /></button>
            <button type="button" onClick={() => scroll(1)} aria-label="Next reviews" className="rounded-full border border-gray-300 p-3 hover:bg-gray-50"><ChevronRight className="h-5 w-5" /></button>
          </div>
        </div>
        <div ref={containerRef} className="flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {testimonials.map((testimonial) => <TestimonialCard key={testimonial.id || testimonial.name} {...testimonial} />)}
        </div>
      </div>
    </section>
  );
}
