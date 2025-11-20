import React from "react";
import Navbar from "../components/Navbar";
import AnimatedSection from "../components/AnimatedSection";
import {
  spotifyCover,
  spotifyFinal,
  spotifyFull,
  spotifyOverview,
  spotifyProblem,
  spotifySolution,
  spotifyThankYou,
} from "../assets/spotify";

const Spotify = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#16171B] via-[#2C2F35] to-[#3A3F46] text-gray-50">
      <Navbar />

      {/* HERO */}
      <section className="pt-32 pb-20 px-6 text-center max-w-5xl mx-auto">
        <img
          src={spotifyCover}
          alt="Spotify Reimagined Cover"
          className="w-full rounded-xl shadow-2xl mb-8"
        />
      </section>

      {/* FINAL DESIGN */}
      <AnimatedSection animationClass="fade-in-up-animation">
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <img
            src={spotifyFinal}
            alt="Spotify Final Design"
            className="w-full rounded-xl shadow-xl"
          />
        </section>
      </AnimatedSection>

      {/* FULL DESIGN */}
      <AnimatedSection animationClass="fade-in-up-animation">
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <img
            src={spotifyFull}
            alt="Spotify Full UI"
            className="w-full rounded-xl shadow-xl"
          />
        </section>
      </AnimatedSection>

      {/* PROJECT OVERVIEW */}
      <AnimatedSection animationClass="fade-in-up-animation">
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <img
            src={spotifyOverview}
            alt="Project Overview"
            className="w-full rounded-xl shadow-xl"
          />
        </section>
      </AnimatedSection>

      {/* PROBLEM */}
      <AnimatedSection animationClass="fade-in-up-animation">
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <img
            src={spotifyProblem}
            alt="Identify the Problem"
            className="w-full rounded-xl shadow-xl"
          />
        </section>
      </AnimatedSection>

      {/* SOLUTION */}
      <AnimatedSection animationClass="fade-in-up-animation">
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <img
            src={spotifySolution}
            alt="Solutions"
            className="w-full rounded-xl shadow-xl"
          />
        </section>
      </AnimatedSection>

      {/* THANK YOU */}
      <AnimatedSection animationClass="fade-in-up-animation">
        <section className="pb-32 px-6 max-w-6xl mx-auto text-center">
          <img
            src={spotifyThankYou}
            alt="Thank You"
            className="w-full rounded-xl shadow-xl"
          />

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

export default Spotify;
