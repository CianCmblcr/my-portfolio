import React from "react";
import Navbar from "../components/Navbar";
import AnimatedSection from "../components/AnimatedSection";
import {
  glownestHero,
  glownestOverview,
  glownestFull,
} from "../assets/glownest";

const GlowNest = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#16171B] via-[#2C2F35] to-[#3A3F46] text-gray-50">
      <Navbar />

      {/* HERO */}
      <section className="pt-32 pb-20 px-6 text-center max-w-6xl mx-auto">
        <img
          src={glownestHero}
          alt="GlowNest Hero"
          className="w-full rounded-xl shadow-2xl"
        />
      </section>

      {/* OVERVIEW / SECTIONS */}
      <AnimatedSection animationClass="fade-in-up-animation">
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <img
            src={glownestOverview}
            alt="GlowNest Overview Screens"
            className="w-full rounded-xl shadow-xl"
          />
        </section>
      </AnimatedSection>

      {/* FULL PAGE */}
      <AnimatedSection animationClass="fade-in-up-animation">
        <section className="pb-32 px-6 max-w-6xl mx-auto">
          <img
            src={glownestFull}
            alt="GlowNest Full Page"
            className="w-full rounded-xl shadow-xl"
          />

          {/* Back Button */}
          <div className="text-center mt-12">
            <a
              href="/#projects"
              className="px-6 py-3 bg-white text-black rounded-3xl shadow hover:bg-gray-300 transition font-bold"
            >
              Back to Projects
            </a>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default GlowNest;
