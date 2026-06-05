"use client";

import React from "react";
import { Sparkles, Calendar, Heart, Shield, Award } from "lucide-react";

interface BridalStudioProps {
  onBookBridalPackage: (packageName: string) => void;
}

export default function BridalStudio({ onBookBridalPackage }: BridalStudioProps) {
  const packages = [
    {
      name: "The Royal Goan Destination Bridal Suite",
      price: "₹18,500",
      description: "Our absolute signature beach bridal package. Includes pre-wedding trial, full HD Airbrush waterproof base makeup, custom false eyelashes, floral hair styling, and saree/gown draping helper.",
      features: ["Complete HD Waterproof airbrush design", "Real freshwater premium floral hair accessories", "Comes with 1 complimentary bridesmaid blowout voucher"]
    },
    {
      name: "Dewy Sunset Beach Glow Makeover",
      price: "₹12,500",
      description: "Formulated specifically for outdoor ocean sunset vows. Highlighted by organic, featherlight, luminous skin bases, warm rose-gold eyelid blending, and texturized beach-waves hairstyle.",
      features: ["Micro-droplet sweating proof sealant", "Pearlescent sunset highlights contouring", "Saree or veil draping support"]
    },
    {
      name: "Elite pre-Wedding 14-Day Cellular Preparation",
      price: "₹8,500",
      description: "Initiated 14 days before schedules. Combined beauty therapies consisting of two 24k Gold dermal facials, organic volcanic clay body scrubs, and signature gel manicure sessions.",
      features: ["Two localized Gold Cell Facials included", "Complete volcanic clay exfoliation wrapping", "Premium lavender gel manicure treatment"]
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-tr from-slate-900 via-indigo-950 to-purple-950 text-white overflow-hidden relative" id="bridal-studio-page">
      {/* Glowing atmospheric circles */}
      <div className="absolute right-[-10%] top-1/4 w-[500px] h-[500px] rounded-full bg-pink-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute left-[-10%] bottom-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 text-slate-100">
          <span className="text-pink-300 font-semibold tracking-wider text-xs uppercase block mb-2">Our Royal suite Division</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
            The Look Book Royal Bridal Studio
          </h2>
          <p className="text-sm text-slate-400 font-light mt-4 max-w-xl mx-auto">
            Where destination beach wedding glamour meets high-contrast professional airbrush precision. Formulated in Goa to resist tropical humidity and sea mist.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-[#2563EB] mx-auto mt-4 rounded-full" />
        </div>

        {/* Portfolio Showcase grid */}
        <div className="grid md:grid-cols-12 gap-12 items-center mb-24 max-w-6xl mx-auto">
          {/* Left Collage images */}
          <div className="md:col-span-6 relative">
            <div className="rounded-3xl p-3 bg-white/5 border border-white/10 overflow-hidden shadow-2xl relative aspect-[4/5] max-w-md mx-auto">
              <img
                src="https://picsum.photos/seed/bridaldistation/600/800"
                alt="Bridal Showcase Makeup"
                className="w-full h-full object-cover rounded-2xl brightness-90 hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-900/80 backdrop-blur-md text-left">
                <span className="text-xs text-pink-300 font-bold block mb-1">Signature look</span>
                <h4 className="font-serif text-base font-bold text-white leading-tight">Beach Sunset Destination Bride</h4>
              </div>
            </div>
          </div>

          {/* Right descriptions and timelines */}
          <div className="md:col-span-6 text-left space-y-6">
            <h3 className="font-serif text-2xl font-bold">Absolute Bridal Artistry & Humidity Protection</h3>
            <p className="text-slate-300 font-light leading-relaxed">
              Coastal beach-vow setups demand highly targeted cosmetic techniques. Traditional liquid pigments dissolve easily in sea breezes. Our specialists deploy ultra-fine HD Airbrush mesh systems that encapsulate water-repellent dermal bases, sealing your radiant glow for up to 18 hours.
            </p>
            <p className="text-slate-300 font-light leading-relaxed">
              We provide comprehensive pre-wedding bridal previews (syncing hair color gradients to your skin undertone via the AI Simulator) and can accommodate destination events across all premium locations in North and South Goa.
            </p>

            {/* Certifications and achievements */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="flex items-start space-x-3">
                <div className="p-2.5 bg-white/10 rounded-xl text-pink-300">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <strong className="block text-xs font-semibold text-white">Elite certified Artists</strong>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Accredited by Vidals</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2.5 bg-white/10 rounded-xl text-pink-300">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <strong className="block text-xs font-semibold text-white">100% Sweat-Proof base</strong>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Airbrush formulation</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PACKAGE PRICING GRID LAYOUT */}
        <div className="max-w-5xl mx-auto">
          <h3 className="font-serif text-xl font-bold mb-8 text-center sm:text-left">Selected Royal Suite Packages</h3>
          
          <div className="grid md:grid-cols-3 gap-6" id="bridal-studio-packages">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white/5 border border-white/10 text-left flex flex-col justify-between hover:bg-white/10 hover:border-pink-500/30 transition-all duration-300"
              >
                <div className="space-y-4">
                  <span className="inline-block text-[10px] uppercase font-black text-pink-300 tracking-widest bg-pink-500/10 px-2 py-0.5 rounded-full">Package</span>
                  <div>
                    <h4 className="font-serif text-base font-bold leading-tight text-white mb-1">{pkg.name}</h4>
                    <span className="text-2xl font-black text-rose-400 font-serif block">{pkg.price}</span>
                  </div>
                  <p className="text-xs text-slate-350 font-light leading-relaxed">{pkg.description}</p>
                  
                  <ul className="space-y-1.5 pt-4 border-t border-white/5 text-[11px] text-slate-300">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start space-x-2">
                        <span className="mt-1.5 h-1 w-1 bg-pink-300 rounded-full shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onBookBridalPackage(pkg.name)}
                  className="w-full text-center py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:brightness-110 text-white rounded-xl text-xs font-bold transition-all mt-6 shadow-md uppercase"
                >
                  Book Bridal suite Package
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
