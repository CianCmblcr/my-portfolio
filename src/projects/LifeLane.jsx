import React from "react";
import SideNav from "../components/SideNav";
import AnimatedSection from "../components/AnimatedSection";
import { lifelane1, lifelane2, lifelane3 } from "../assets/lifelane";

const LifeLane = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--color-page-from)] via-[var(--color-page-via)] to-[var(--color-page-to)] text-[var(--color-text-primary)]">
      <SideNav />

      {/* HERO */}
      <section className="pt-20 pb-20 px-6 text-center max-w-6xl mx-auto">
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
            className="mt-10 inline-block px-6 py-3 bg-[var(--color-invert-surface)] text-[var(--color-invert-text)] rounded-3xl shadow hover:bg-[var(--color-accent)] transition font-bold"
          >
            Back to Projects
          </a>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default LifeLane;
