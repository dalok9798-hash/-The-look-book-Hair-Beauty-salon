"use client";

import React, { useState, useRef } from "react";
import { GALLERY_ITEMS } from "@/lib/salon-data";
import { MoveHorizontal, Eye, Sliders, CheckCircle } from "lucide-react";

export default function GalleryGrid() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  // Before-After Slider State
  const [sliderPosition, setSliderPosition] = useState<number>(50); // 50%
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(800);

  React.useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.getBoundingClientRect().width);
      
      const observer = new ResizeObserver((entries) => {
        if (entries[0]) {
          setContainerWidth(entries[0].contentRect.width);
        }
      });
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, []);

  const filters = [
    { id: "all", label: "All Works" },
    { id: "Hair Transformations", label: "Transformations" },
    { id: "Hair Colour", label: "Balayage & Colour" },
    { id: "Bridal Makeup", label: "Bridal Suite" },
    { id: "Salon Interior", label: "Salon Interior" },
  ];

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => activeFilter === "all" || item.category === activeFilter
  );

  // Before After Dragging Math handlers
  const handleDragUpdate = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const relativeX = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (relativeX / rect.width) * 100));
      setSliderPosition(percentage);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) { // Left click held
      handleDragUpdate(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches && e.touches[0]) {
      handleDragUpdate(e.touches[0].clientX);
    }
  };

  return (
    <section className="py-24 bg-slate-50 overflow-hidden" id="gallery-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Gallery Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-pink-500 font-semibold tracking-wider text-xs uppercase block mb-2">Artistry Portfolio</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Our Pinterest-Style Creations Gallery
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-[#2563EB] mx-auto mt-4 rounded-full" />
        </div>

        {/* DRAGGABLE BEFORE-AFTER TRANSFORMATION SLIDER PANEL */}
        <div className="max-w-3xl mx-auto mb-16 space-y-4">
          <div className="text-center text-left md:text-center">
            <span className="inline-flex items-center space-x-1 text-xs bg-[#FFF0F2] text-pink-700 font-bold px-3 py-1 rounded-full border border-pink-100">
              <MoveHorizontal className="h-4 w-4 animate-bounce" />
              <span>Drag slider below to view Before & After Signature Balayage</span>
            </span>
          </div>

          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-slate-200 select-none cursor-ew-resize bg-slate-200"
            id="before-after-interaction-slider"
          >
            {/* BEFORE image (Left/Background) */}
            <img
              src="https://picsum.photos/seed/blondebeachbefore/800/600"
              alt="Balayage Before Treatment"
              className="absolute inset-0 w-full h-full object-cover"
              draggable="false"
            />
            <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-wider">
              Before
            </div>

            {/* AFTER image overlay container (Right/Foreground) */}
            <div
              className="absolute inset-y-0 right-0 overflow-hidden"
              style={{ left: `${sliderPosition}%` }}
            >
              <img
                src="https://picsum.photos/seed/blondebeachafter/800/600"
                alt="Balayage Sunset After"
                className="absolute inset-y-0 right-0 w-full h-full object-cover max-w-none"
                style={{ width: containerWidth }}
                draggable="false"
              />
              <div className="absolute top-4 right-4 bg-pink-500/90 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-wider">
                After Transformation
              </div>
            </div>

            {/* Middle slider dividing bar */}
            <div
              className="absolute inset-y-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center justify-center cursor-col-resize pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="p-2 rounded-full bg-white text-slate-800 shadow-xl border border-slate-200 transform">
                <MoveHorizontal className="h-4.5 w-4.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Gallery filtering tabs bar */}
        <div className="flex overflow-x-auto pb-4 mb-12 scrollbar-none justify-start md:justify-center items-center gap-2" id="gallery-category-bar">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeFilter === f.id
                  ? "bg-[#2563EB] text-white shadow-md shadow-blue-500/10"
                  : "bg-white border border-slate-200 hover:bg-slate-50 text-slate-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Pinterest style columns layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6" id="pinterest-gallery-columns">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="break-inside-avoid relative rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-100 group cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full object-cover rounded-2xl brightness-95 group-hover:brightness-100 transition-all duration-300"
                loading="lazy"
              />
              
              {/* Bottom tag info reveal */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-4 text-left">
                <div>
                  <span className="block text-[9px] text-pink-300 font-bold uppercase tracking-widest">{item.category}</span>
                  <h4 className="font-serif text-sm font-semibold text-white mt-0.5">{item.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
