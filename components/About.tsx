"use client";

import React from "react";
import { motion } from "motion/react";
import { SALON_TIMELINE } from "@/lib/salon-data";
import { Award, ShieldCheck, Heart, Users, Star } from "lucide-react";

export default function About() {
  const stats = [
    { label: "Elite Stylists", value: "6+", icon: Users, color: "text-[#2563EB]" },
    { label: "Luxury Services", value: "25+", icon: Award, color: "text-purple-600" },
    { label: "Dermal Trust", value: "100%", icon: ShieldCheck, color: "text-emerald-600" },
    { label: "Client Love", value: "4.8★", icon: Star, color: "text-amber-500" },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden relative" id="about-us-section">
      {/* Background blobs */}
      <div className="absolute right-0 top-1/4 w-96 h-96 rounded-full bg-pink-100/40 blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-96 h-96 rounded-full bg-blue-50/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-pink-500 font-semibold tracking-wider text-xs uppercase block mb-2">Heritage of Craft</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Elevating Goa&apos;s Beauty Canvas Since 2018
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-[#2563EB] mx-auto mt-4 rounded-full" />
        </div>

        {/* Brand Showcase Block */}
        <div className="grid md:grid-cols-12 gap-12 items-center mb-24">
          <div className="md:col-span-6 space-y-6 text-left">
            <h3 className="font-serif text-2xl font-bold text-slate-800 leading-snug">
              Bridging International Beauty Benchmarks with Cozy Goan Hospitality
            </h3>
            <p className="text-slate-600 leading-relaxed font-light">
              Founded in Panjim by principal colorists and dermal experts, <strong className="text-slate-900 font-medium">The Look Book Hair & Beauty Salon</strong> grew from a luxury niche boutique and into a state-of-the-art beauty sanctuary. Our salon represents absolute master craftsmanship; each specialist is professionally certified with elite global accreditations (including L&apos;Oréal Professionnel, Vidal Sassoon, and Brazilian Blowout hair health networks).
            </p>
            <p className="text-slate-600 leading-relaxed font-light">
              We operate with structural beauty philosophies: customizing chemical formulas to correspond perfectly with individual hair porosity, employing 24K biological elements to stimulate glowing collagen, and curating bridal HD Airbrush stylings that thrive in Goa&apos;s humid, salty air.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="block font-serif text-lg font-bold text-slate-900 mb-1">Our Mission</span>
                <span className="text-xs text-slate-500 font-light leading-relaxed">
                  To provide transformative cosmetic treatments using premium clean formulations and personalized dermal consults.
                </span>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="block font-serif text-lg font-bold text-slate-900 mb-1">Our Vision</span>
                <span className="text-xs text-slate-500 font-light leading-relaxed">
                  To synthesize wellness and AI-led previews, defining the standard for premium styling experiences in Western India.
                </span>
              </div>
            </div>
          </div>

          {/* Right Showcase Collage */}
          <div className="md:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden aspect-[3/4] shadow-md border-4 border-white transition-transform hover:scale-102 duration-300">
                  <img
                    src="https://picsum.photos/seed/about1/400/500"
                    alt="Priya Styling"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 rounded-3xl bg-gradient-to-tr from-[#2563EB]/10 to-pink-100 flex flex-col justify-center text-center">
                  <span className="text-3xl font-serif font-extrabold text-[#2563EB]">100%</span>
                  <span className="text-[10px] text-slate-600 font-medium uppercase tracking-wider mt-1">Chemical Safety</span>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="p-6 rounded-3xl bg-pink-100/50 flex flex-col justify-center text-center">
                  <span className="text-3xl font-serif font-extrabold text-pink-500">Gold</span>
                  <span className="text-[10px] text-slate-600 font-medium uppercase tracking-wider mt-1">Salon of Excellence</span>
                </div>
                <div className="rounded-3xl overflow-hidden aspect-[3/4] shadow-md border-4 border-white transition-transform hover:scale-102 duration-300">
                  <img
                    src="https://picsum.photos/seed/about2/400/500"
                    alt="Bridal Makeup Session"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-24">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-[#FAFAFC] border border-pink-50/50 hover:bg-white hover:border-pink-200 hover:shadow-lg transition-all duration-300 flex items-center space-x-4">
                <div className={`p-3 rounded-xl bg-white shadow-sm ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <span className="block text-2xl font-bold font-serif text-slate-800">{stat.value}</span>
                  <span className="text-xs text-slate-500 font-light">{stat.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chronological Timeline Section */}
        <div className="max-w-4xl mx-auto pt-4 relative">
          <div className="text-center mb-12">
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-slate-800 mb-2">Our Growth Chronicle</h4>
            <p className="text-xs text-slate-500 font-light">Follow our path of regional benchmarks, award ceremonies, and smart innovations</p>
          </div>

          {/* Spine indicator line */}
          <div className="absolute left-4 md:left-1/2 top-32 bottom-8 w-0.5 bg-gradient-to-b from-[#2563EB]/40 via-pink-400/40 to-slate-200 transform -translate-x-1/2 hidden md:block" />

          <div className="space-y-12">
            {SALON_TIMELINE.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className="relative flex flex-col md:flex-row md:justify-between items-start md:items-center w-full">
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-6 h-6 rounded-full border-4 border-white bg-gradient-to-r from-pink-500 to-[#2563EB] shadow-md transform -translate-x-1/2 z-10" />

                  <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${isEven ? "md:text-right" : "md:order-2 md:text-left"}`}>
                    <span className="inline-block text-2xl font-serif font-black text-slate-900 bg-gradient-to-r from-pink-400 to-[#2563EB] bg-clip-text text-transparent">
                      {item.year}
                    </span>
                    <h5 className="text-lg font-serif font-bold text-slate-800 mt-1 mb-1">{item.title}</h5>
                    <p className="text-sm text-slate-500 font-light leading-relaxed">{item.description}</p>
                  </div>

                  {/* Empty spacer spacer to balance grid */}
                  <div className="hidden md:block w-[45%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
