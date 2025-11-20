import React from "react";
import Navbar from "../components/Navbar";
import AnimatedSection from "../components/AnimatedSection";
import { lifelane1, lifelane2, lifelane3 } from "../assets/lifelane";

const LifeLane = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#16171B] via-[#2C2F35] to-[#3A3F46] text-gray-50">
      <Navbar />

      {/* HERO */}
      <section className="pt-32 pb-20 px-6 text-center max-w-6xl mx-auto">
        <img
          src={lifelane1}
          alt="LifeLane Hero"
          className="w-full rounded-xl shadow-2xl mb-8"
        />
      </section>

      {/* SECTION 2 */}
      <AnimatedSection animationClass="fade-in-up-animation">
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <img
            src={lifelane2}
            alt="LifeLane UI"
            className="w-full rounded-xl shadow-xl"
          />
        </section>
      </AnimatedSection>

      {/* SECTION 3 */}
      <AnimatedSection animationClass="fade-in-up-animation">
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <img
            src={lifelane3}
            alt="LifeLane Screen"
            className="w-full rounded-xl shadow-xl"
          />
        </section>
      </AnimatedSection>

      {/* BACK BUTTON */}
      <AnimatedSection animationClass="fade-in-up-animation">
        <section className="pb-32 px-6 max-w-6xl mx-auto text-center">
          <a
            href="/#projects"
            className="mt-10 inline-block px-6 py-3 bg-white text-black rounded-3xl shadow hover:bg-gray-300 transition font-bold"
          >
            Back to Projects
          </a>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default LifeLane;
