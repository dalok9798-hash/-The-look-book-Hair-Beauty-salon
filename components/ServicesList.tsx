"use client";

import React, { useState, useMemo } from "react";
import { SALON_SERVICES, SalonService } from "@/lib/salon-data";
import { Search, Clock, Sparkles, Filter, CheckCircle2 } from "lucide-react";

interface ServicesListProps {
  onBookService: (service: SalonService) => void;
}

export default function ServicesList({ onBookService }: ServicesListProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number>(16000); // Max hair color is 15000

  const categories = [
    { id: "all", label: "All Curations" },
    { id: "hair", label: "Hair Artistry" },
    { id: "beauty", label: "Aesthetics & Facial" },
    { id: "makeup", label: "HD Makeup Art" },
    { id: "nails", label: "Nail Gel Studio" },
  ];

  const filteredServices = useMemo(() => {
    return SALON_SERVICES.filter((ser) => {
      const matchCat = activeCategory === "all" || ser.category === activeCategory;
      const matchSearch =
        ser.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ser.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchPrice = ser.price <= priceRange;
      return matchCat && matchSearch && matchPrice;
    });
  }, [activeCategory, searchQuery, priceRange]);

  return (
    <section className="py-24 bg-gradient-to-b from-[#FAFAFC] to-white" id="services-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-pink-500 font-semibold tracking-wider text-xs uppercase block mb-2">Our Luxe Curations</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Indulge In Signature Salon & Spa Specialties
          </h2>
          <p className="text-sm text-slate-500 font-light mt-3">
            Every creation is tailored to your unique anatomical profiles, utilizing premium botanical oils and professional HD formulations.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-[#2563EB] mx-auto mt-4 rounded-full" />
        </div>

        {/* Search, Filter, and Pricing Controls Row */}
        <div className="glass-panel border-pink-100 rounded-3xl p-6 sm:p-8 mb-12 shadow-md max-w-5xl mx-auto grid md:grid-cols-12 gap-6 items-center">
          {/* Keyword Search */}
          <div className="md:col-span-5 relative" id="service-search-box">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search services (e.g. Balayage, 24K Facial...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-slate-200 focus:border-[#2563EB] focus:outline-none transition-colors shadow-inner text-sm"
            />
          </div>

          {/* Pricing slider */}
          <div className="md:col-span-4 flex flex-col space-y-2 text-left" id="service-price-filter">
            <div className="flex justify-between items-center text-xs text-slate-600 font-medium">
              <span>Max Pricing Budget:</span>
              <span className="text-[#2563EB] font-bold">₹{priceRange.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="500"
              max="16000"
              step="500"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
            />
          </div>

          {/* Preset Counters */}
          <div className="md:col-span-3 text-center md:text-right text-xs text-slate-500 font-medium">
            Showing <span className="text-[#2563EB] font-bold">{filteredServices.length}</span> specialties
          </div>
        </div>

        {/* Scrollable Category Pills layout */}
        <div className="flex overflow-x-auto pb-4 mb-12 scrollbar-none justify-start md:justify-center items-center gap-3" id="service-category-pills">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 hover:brightness-110"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dynamic Service Grid Layout */}
        {filteredServices.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" id="services-grid-list">
            {filteredServices.map((ser) => (
              <div
                key={ser.id}
                id={`service-card-${ser.id}`}
                className="group relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm border border-pink-50/50 premium-hover-shadow"
              >
                {/* Product Image Panel */}
                <div className="relative aspect-[3/2] overflow-hidden bg-slate-100">
                  <img
                    src={ser.image}
                    alt={ser.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60" />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4 inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-md text-[10px] text-slate-700 font-bold uppercase tracking-wider">
                    <Sparkles className="h-3 w-3 text-pink-500" />
                    <span>{ser.category}</span>
                  </div>

                  {/* Hot Deal Overlay if price is highly competitive */}
                  {ser.price < 3000 && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-[#2563EB] to-purple-600 text-white font-bold text-[9px] px-2.5 py-1 rounded-full shadow-md uppercase tracking-wide">
                      Elite value
                    </div>
                  )}
                </div>

                {/* Card Content Row */}
                <div className="p-6 flex flex-col flex-grow text-left">
                  <div className="flex md:items-start justify-between mb-3 gap-2">
                    <h3 className="font-serif text-lg font-bold text-slate-800 leading-snug group-hover:text-[#2563EB] transition-colors">
                      {ser.name}
                    </h3>
                    <div className="text-right whitespace-nowrap">
                      <span className="block font-serif text-lg font-black text-rose-600">₹{ser.price.toLocaleString()}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 font-light leading-relaxed mb-6 flex-grow">
                    {ser.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                    <div className="flex items-center space-x-1 text-slate-500 text-xs font-medium">
                      <Clock className="h-4 w-4 text-pink-400" />
                      <span>{ser.duration}</span>
                    </div>

                    <button
                      onClick={() => onBookService(ser)}
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-50 hover:from-pink-100 to-rose-50 hover:to-rose-100 text-[#2563EB] hover:text-[#1D4ED8] text-xs font-bold transition-all duration-200 border border-pink-100/30 shadow-sm"
                      id={`book-now-idx-${ser.id}`}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200 max-w-2xl mx-auto">
            <span className="block text-4xl mb-4">✨</span>
            <h3 className="font-serif text-lg font-bold text-slate-800 mb-2">No specialties match your filter</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Please adjust your pricing budget or try a different keyword search (like &quot;Facial&quot;, &quot;Haircut&quot;, or &quot;Makeup&quot;).
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
                setPriceRange(16000);
              }}
              className="mt-6 px-5 py-2.5 bg-[#2563EB] text-white text-xs font-bold rounded-xl shadow-md"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
