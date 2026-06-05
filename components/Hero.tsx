"use client";

import React from "react";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, Play, Award, Heart, ShieldCheck } from "lucide-react";

interface HeroProps {
  onExploreServices: () => void;
  onBookNow: () => void;
}

export default function Hero({ onExploreServices, onBookNow }: HeroProps) {
  return (
    <section className="relative min-h-screen pt-20 flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
      {/* Background Cinematic Shifting Gradients */}
      <div className="absolute inset-0 opacity-40 mix-blend-overlay">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600 blur-[130px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-500 blur-[120px] animate-pulse [animation-delay:2s]" />
      </div>

      {/* Decorative Floating Luxury Rings */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full border border-pink-400/30 animate-[spin_60s_linear_infinite]" />
        <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] rounded-full border-2 border-blue-500/10 animate-[spin_30s_linear_infinite_reverse]" />
        <div className="absolute top-2/3 left-1/3 w-32 h-32 rounded-full bg-gradient-to-r from-pink-300 to-indigo-400 blur-2xl animate-bounce" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 grid lg:grid-cols-12 gap-12 items-center">
        {/* Hero Left Content */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-pink-200 text-xs font-semibold uppercase tracking-wider"
          >
            <Sparkles className="h-3.5 w-3.5 text-pink-300" />
            <span>Goa&apos;s Royal Beauty Oasis</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight"
          >
            Transform Your Beauty With{" "}
            <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">
              Goa&apos;s Premium Salon
            </span>{" "}
            Experience
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 font-light max-w-xl"
          >
            Unveil your exquisite side at <strong className="text-white font-medium">The Look Book</strong>. Master hair formulation, premium dermal aesthetics, and glowing bridal makeup, situated in Panjim&apos;s historic Altinho neighborhood.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-4"
          >
            <button
              onClick={onBookNow}
              className="flex items-center justify-center space-x-2 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-[#2563EB] hover:brightness-110 active:scale-95 text-white font-semibold tracking-wide text-base shadow-lg shadow-pink-500/20 hover:shadow-indigo-500/30 transition-all duration-300 group"
              id="hero-booking-btn"
            >
              <span>Book Appointment Today</span>
              <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1.5 transition-transform" />
            </button>
            <button
              onClick={onExploreServices}
              className="flex items-center justify-center space-x-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/15 active:scale-95 text-white border border-white/20 font-medium transition-all duration-300"
              id="hero-explore-btn"
            >
              <span>Explore Menu List</span>
            </button>
          </motion.div>

          {/* Golden Badge Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 w-full max-w-lg"
          >
            <div className="flex flex-col items-start">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-pink-300">8+</span>
              <span className="text-xs text-slate-400 font-medium tracking-wide">Years Experience</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-blue-300">12K+</span>
              <span className="text-xs text-slate-400 font-medium tracking-wide">Happy Clients</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-purple-300">★★★★★</span>
              <span className="text-xs text-slate-400 font-medium tracking-wide">4.8 Star Reviews</span>
            </div>
          </motion.div>
        </div>

        {/* Hero Right Visual Cinema Component */}
        <div className="lg:col-span-5 relative mt-8 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: 1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl p-3 bg-gradient-to-tr from-white/15 to-white/5 border border-white/10 shadow-2xl overflow-hidden glass-panel-dark max-w-md mx-auto aspect-[4/5] flex items-center justify-center"
          >
            {/* Embedded Luxury Poster or Cinematic Walkthrough Background */}
            <div className="absolute inset-1 rounded-2xl overflow-hidden group">
              <img
                src="https://picsum.photos/seed/salongoing/600/800"
                alt="Salon Interior Ambience"
                className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-[6000ms] ease-out"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent" />

              {/* Floating Award Pin */}
              <div className="absolute top-4 right-4 flex items-center space-x-1 px-3 py-1 bg-amber-500/95 backdrop-blur-md text-slate-900 text-[10px] font-bold rounded-full shadow-md uppercase tracking-wider">
                <Award className="h-3.5 w-3.5" />
                <span>Award Winner</span>
              </div>

              {/* Bottom Cinematic Info Plaque */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 text-left">
                <div className="flex items-center space-x-2 text-pink-300 text-xs font-semibold mb-1">
                  <Play className="h-3 w-3 fill-current" />
                  <span>The Look Book Experience</span>
                </div>
                <h3 className="font-serif text-base font-bold text-white leading-tight">
                  Panjim&apos;s Sanctuary of Modern Colorists and Bridal Stylists
                </h3>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
