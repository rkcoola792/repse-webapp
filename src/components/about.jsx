"use client";
import React from "react";
import { useNavigate } from "../navigation.js";
import { ArrowRight } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-black py-16 sm:py-20">
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-16 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="flex items-center justify-center h-full">
          <img loading="lazy" decoding="async"
            src="/banner.png"
            alt="Repse — Train Hard. Wear Repse."
            className="w-full max-w-xl h-auto object-contain"
          />
        </div>

        <div>
          <p className="flex items-center gap-3 text-white/50 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase mb-5">
            <span className="w-8 h-px bg-white/50" />
            About
          </p>

          <h1 className="text-white font-black uppercase tracking-tight leading-[0.95] text-3xl sm:text-5xl mb-5">
            Built For The Reps
            <br />
            That Matter
          </h1>

          <p className="text-white/60 max-w-md text-sm sm:text-base leading-relaxed mb-4">
            Repse is a performance gymwear brand built for people who train
            hard and don't want their gear holding them back. Every piece is
            designed around three things — performance, comfort and
            confidence — so you can focus on the rep in front of you instead
            of adjusting a waistband or peeling off a sweat-soaked shirt.
          </p>
          <p className="text-white/60 max-w-md text-sm sm:text-base leading-relaxed mb-7">
            From sweat-wicking fabrics to four-way stretch cuts, our
            collection is made to move as hard as you do, whether that's a
            heavy lifting session, a long run or the everyday grind between
            them.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-3.5 rounded-full text-sm font-semibold uppercase tracking-wide cursor-pointer hover:bg-gray-200 transition-colors"
          >
            Shop Now
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
