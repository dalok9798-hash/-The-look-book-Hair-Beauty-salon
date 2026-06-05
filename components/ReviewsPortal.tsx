"use client";

import React, { useState, useEffect } from "react";
import { SALON_REVIEWS, Review } from "@/lib/salon-data";
import { Star, CheckCircle, ChevronLeft, ChevronRight, MessageSquare, Send } from "lucide-react";

export default function ReviewsPortal() {
  const [reviews, setReviews] = useState<Review[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("lookbook_reviews");
      if (saved) return JSON.parse(saved);
    }
    return SALON_REVIEWS;
  });
  const [activeSlide, setActiveSlide] = useState<number>(0);

  // New review form states
  const [name, setName] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(5);
  const [service, setService] = useState<string>("Luxury Signature Haircut");
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    // Already populated lazily on initialization
  }, []);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) {
      alert("Please specify your name and write a constructive review comment.");
      return;
    }

    const newReview: Review = {
      id: `rev-${Date.now().toString().slice(-4)}`,
      name,
      rating,
      comment,
      date: new Date().toISOString().split("T")[0],
      service,
      verified: true,
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem("lookbook_reviews", JSON.stringify(updated));

    setSuccess(true);
    setName("");
    setComment("");
    setRating(5);
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % Math.min(3, reviews.length || 1));
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + Math.min(3, reviews.length || 1)) % Math.min(3, reviews.length || 1));
  };

  // Calculate stats live
  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1)).toFixed(1);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#FAFAFC]" id="reviews-testimonials-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header summary */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-pink-500 font-semibold tracking-wider text-xs uppercase block mb-2">Verified Testimonials</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Client Feedback & Google Ratings
          </h2>
          <div className="flex items-center justify-center space-x-2 mt-4">
            <div className="flex text-amber-500">
              <Star className="h-5 w-5 fill-current" />
              <Star className="h-5 w-5 fill-[#2563EB]" /> {/* multi layered style */}
              <Star className="h-5 w-5 fill-current" />
              <Star className="h-5 w-5 fill-current" />
              <Star className="h-5 w-5 fill-current" />
            </div>
            <span className="text-lg font-bold text-slate-800">{averageRating} out of 5.0 Rating</span>
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-[#2563EB] mx-auto mt-4 rounded-full" />
        </div>

        {/* REVIEWS SLIDER PREVIEW COLUMN */}
        {reviews.length > 0 && (
          <div className="max-w-4xl mx-auto bg-slate-900 text-white rounded-3xl p-8 sm:p-12 mb-16 relative overflow-hidden shadow-2xl border border-white/5 text-left">
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
            
            {/* Active quote block */}
            <div className="relative z-10 space-y-6">
              <span className="text-pink-300 text-5xl font-serif">“</span>
              <p className="font-serif text-lg sm:text-xl font-light leading-relaxed">
                {reviews[activeSlide]?.comment}
              </p>
              
              <div className="flex items-center justify-between border-t border-white/10 pt-6">
                <div>
                  <h4 className="font-serif text-base font-bold text-white">
                    {reviews[activeSlide]?.name}
                  </h4>
                  <span className="text-xs text-slate-400 font-medium">
                    Verified Treatment: {reviews[activeSlide]?.service} • {reviews[activeSlide]?.date}
                  </span>
                </div>
                
                {/* Dots indicator slider controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrevSlide}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
                  >
                    <ChevronLeft className="h-4.5 w-4.5" />
                  </button>
                  <button
                    onClick={handleNextSlide}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
                  >
                    <ChevronRight className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FEEDBACK BOARD LISTINGS & CREATE FORMS GRID */}
        <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
          
          {/* Feed columns (7 cols) */}
          <div className="lg:col-span-7 space-y-6" id="client-reviews-stream">
            <h3 className="font-serif text-xl font-bold text-slate-800 text-left">Recent Verified Direct Inputs</h3>
            
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {reviews.map((r) => (
                <div key={r.id} className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm text-left space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-serif font-bold text-slate-900 flex items-center space-x-1.5">
                        <span>{r.name}</span>
                        {r.verified && (
                          <span title="Verified Customer"><CheckCircle className="h-3.5 w-3.5 text-emerald-500 fill-current text-white shrink-0" /></span>
                        )}
                      </h4>
                      <span className="block text-[10px] text-slate-400 mt-0.5">
                        {r.service} • {r.date}
                      </span>
                    </div>
                    {/* Stars count */}
                    <div className="flex text-amber-400">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Create Feedback Form Column (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-pink-100 rounded-3xl p-6 sm:p-8 text-left">
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-6 flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-[#2563EB]" />
              <span>Share Your Experience</span>
            </h3>

            {success && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 mb-6 font-medium animate-fadeIn">
                Thank you! Your feedback has been published verified.
                <button
                  onClick={() => setSuccess(false)}
                  className="block mt-2 font-bold underline"
                >
                  Write another review
                </button>
              </div>
            )}

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="space-y-1.5">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Your Name</span>
                <input
                  type="text"
                  placeholder="e.g. Shalini Deshmukh"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Select Visited Treatment</span>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-[#CBD5E1] rounded-xl text-sm focus:outline-none text-slate-800"
                >
                  <option value="Luxury Signature Haircut">Luxury Signature Haircut</option>
                  <option value="Premium French Balayage">Premium French Balayage</option>
                  <option value="24K Luminous Gold Dermal Facial">24K Luminous Gold Dermal Facial</option>
                  <option value="The Look Book Signature Bridal Makeover">The Look Book Signature Bridal Makeover</option>
                  <option value="Signature French Gel Manicure">Signature French Gel Manicure</option>
                </select>
              </div>

              {/* Star selector buttons inline */}
              <div className="space-y-1.5 flex flex-col items-start">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Rating Quality</span>
                <div className="flex items-center space-x-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform"
                    >
                      <Star className={`h-6 w-6 ${rating >= star ? "fill-current" : ""}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Review Details</span>
                <textarea
                  placeholder="Tell us what you loved about our service/therapist..."
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none min-h-[90px]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center justify-center space-x-2 uppercase"
                id="sumbit-review-btn"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Submit Testimony Review</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
