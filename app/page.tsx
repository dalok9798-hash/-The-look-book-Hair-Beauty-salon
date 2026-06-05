"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ServicesList from "@/components/ServicesList";
import Simulator from "@/components/Simulator";
import BookingForm, { Appointment } from "@/components/BookingForm";
import GalleryGrid from "@/components/GalleryGrid";
import TeamGrid from "@/components/TeamGrid";
import ReviewsPortal from "@/components/ReviewsPortal";
import LoyaltySystem from "@/components/LoyaltySystem";
import ContactDetails from "@/components/ContactDetails";
import AdminDashboard from "@/components/AdminDashboard";
import BridalStudio from "@/components/BridalStudio";

import { BLOG_POSTS, PROMO_OFFERS, SalonService } from "@/lib/salon-data";
import { MessageSquare, Phone, Send, Info, Star, Facebook, Instagram, ShieldCheck, Mail, Percent, BookOpen, Clock, MapPin } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("home");

  // Multi-module deep link integration states
  const [simulatorNotes, setSimulatorNotes] = useState<string>("");
  const [deepLinkedService, setDeepLinkedService] = useState<SalonService | null>(null);

  // Synced hash coordinates
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (
        [
          "home",
          "services",
          "simulator",
          "booking",
          "bridal",
          "gallery",
          "loyalty",
          "contact",
          "admin",
        ].includes(hash)
      ) {
        setActiveTab(hash);
      }
    };

    window.addEventListener("hashchange", handleHash);
    handleHash();

    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const handleActiveTabChange = (tab: string) => {
    setActiveTab(tab);
    window.location.hash = tab;
  };

  // Deep-linking callbacks
  const handlePreFillBookingNotes = (details: { notes: string }) => {
    setSimulatorNotes(details.notes);
    handleActiveTabChange("booking");
  };

  const handleDeepLinkService = (service: SalonService) => {
    setDeepLinkedService(service);
    handleActiveTabChange("booking");
  };

  const handleDeepLinkStylist = (id: string, name: string) => {
    // Fill custom note state to pre-assign stylist
    setSimulatorNotes(`Client selected Stylist preference (assigned from staff sheet): ${name} (ID: ${id})`);
    handleActiveTabChange("booking");
  };

  const handleBookBridalPackage = (name: string) => {
    setSimulatorNotes(`Inquiring Client Bridal Package requested: [${name}]`);
    handleActiveTabChange("booking");
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-slate-50 text-slate-800">
      
      {/* Floating Interactive Navbar block */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleActiveTabChange}
        onOpenQuickBook={() => handleActiveTabChange("booking")}
      />

      {/* Main Multi-View Screen Router Swapper */}
      <main className="flex-grow pt-20">
        {activeTab === "home" && (
          <div className="space-y-0" id="home-view-group">
            <Hero
              onExploreServices={() => handleActiveTabChange("services")}
              onBookNow={() => handleActiveTabChange("booking")}
            />
            
            {/* INLINE FESTIVAL FLASH OFFERS SECTION */}
            <section className="py-20 bg-slate-50 text-slate-800" id="promos-strip">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="text-pink-500 font-bold uppercase tracking-wider text-xs">Monsoon campaigns</span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-extrabold mt-1">Special Flash Promotions</h3>
                  <div className="w-12 h-0.5 bg-pink-400 mx-auto mt-2 rounded-full" />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {PROMO_OFFERS.map((offer) => (
                    <div
                      key={offer.id}
                      className="p-6 rounded-2xl bg-white border border-pink-50 shadow-sm text-left flex flex-col justify-between hover:scale-102 transition-transform duration-300"
                    >
                      <div className="space-y-3">
                        <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full text-[10px] font-bold uppercase tracking-wider">
                          <Percent className="h-3.5 w-3.5" />
                          <span>{offer.discount}</span>
                        </span>
                        <h4 className="font-serif text-lg font-bold leading-tight">{offer.title}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed font-light">{offer.description}</p>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-slate-100 mt-6 text-xs">
                        <div>
                          <span className="block uppercase text-[8px] text-slate-400 font-bold">Use coupon code</span>
                          <span className="font-mono text-slate-900 font-bold">{offer.code}</span>
                        </div>
                        <button
                          onClick={() => {
                            setSimulatorNotes(`Applying Promotion Coupon code: ${offer.code} [${offer.title}] - ${offer.discount}`);
                            handleActiveTabChange("booking");
                          }}
                          className="px-3.5 py-1.5 bg-[#2563EB] hover:bg-blue-600 text-white rounded-lg font-semibold text-[10px] uppercase shadow-sm"
                        >
                          Apply code
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* INTEGRATED EDITORIAL READING BLOG */}
            <section className="py-20 bg-white" id="inline-editorial-blog">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="text-pink-500 font-bold uppercase tracking-wider text-xs">Stylist columns</span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-extrabold mt-1">The Look Book Editorial Blog</h3>
                  <div className="w-12 h-0.5 bg-blue-400 mx-auto mt-2 rounded-full" />
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {BLOG_POSTS.map((post) => (
                    <div
                      key={post.id}
                      className="rounded-3xl border border-slate-100 bg-slate-50 overflow-hidden flex flex-col text-left group hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="aspect-[16/10] overflow-hidden bg-slate-200 relative">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4 bg-white/95 text-slate-850 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md shadow-md">
                          {post.category}
                        </div>
                      </div>

                      <div className="p-6 flex-grow flex flex-col justify-between">
                        <div className="space-y-2">
                          <span className="text-[10px] text-slate-400 font-semibold">{post.date} • {post.readTime}</span>
                          <h4 className="font-serif text-lg font-bold leading-tight group-hover:text-[#2563EB] transition-colors">
                            {post.title}
                          </h4>
                          <p className="text-xs text-slate-500 leading-relaxed font-light">{post.excerpt}</p>
                        </div>

                        <div className="pt-4 border-t border-slate-100 mt-6 flex justify-between items-center text-xs">
                          <button
                            onClick={() => {
                              alert(`Bespoke Consultation Insight:\n\n${post.content}\n\nThank you for reading out standard Goan beauty advice!`);
                            }}
                            className="text-[#2563EB] hover:text-blue-700 font-bold flex items-center space-x-1"
                          >
                            <BookOpen className="h-4 w-4" />
                            <span>Read full editorial</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <About />
            <ReviewsPortal />
            <ContactDetails />
          </div>
        )}

        {activeTab === "services" && (
          <ServicesList onBookService={handleDeepLinkService} />
        )}

        {activeTab === "simulator" && (
          <Simulator onPreFillBooking={handlePreFillBookingNotes} />
        )}

        {activeTab === "booking" && (
          <BookingForm
            importedNotes={simulatorNotes}
            onClearNotes={() => setSimulatorNotes("")}
            activeService={deepLinkedService}
            onClearActiveService={() => setDeepLinkedService(null)}
          />
        )}

        {activeTab === "bridal" && (
          <BridalStudio onBookBridalPackage={handleBookBridalPackage} />
        )}

        {activeTab === "gallery" && (
          <div>
            <GalleryGrid />
            <TeamGrid onSelectStylist={handleDeepLinkStylist} />
          </div>
        )}

        {activeTab === "loyalty" && (
          <LoyaltySystem />
        )}

        {activeTab === "contact" && (
          <ContactDetails />
        )}

        {activeTab === "admin" && (
          <AdminDashboard />
        )}
      </main>

      {/* FLOATING ACTION INTERACTIVE WHATSAPP HELPER BUBBLE */}
      <div className="fixed bottom-6 right-6 z-40 group" id="floating-whatsapp-widget">
        <div className="absolute right-0 bottom-full mb-3 flex flex-col space-y-2 pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-right">
          <button
            onClick={() => {
              window.open("https://wa.me/919226227258?text=Hello!+I+want+to+book+an+appointment+at+The+Look+Book+Goa.", "_blank");
            }}
            className="px-4 py-2 bg-slate-900 border border-slate-800 text-white font-bold text-xs rounded-xl shadow-lg hover:bg-slate-800 whitespace-nowrap"
          >
            💬 Quick Reservation
          </button>
          <button
            onClick={() => {
              window.open("https://wa.me/919226227258?text=Hello!+What+are+the+price+ranges+for+french+balayage+and+keratin?", "_blank");
            }}
            className="px-4 py-2 bg-slate-900 border border-slate-800 text-white font-bold text-xs rounded-xl shadow-lg hover:bg-slate-800 whitespace-nowrap"
          >
            💰 Ask Price Sheet
          </button>
        </div>

        {/* Core Bubble button */}
        <button
          onClick={() => {
            window.open("https://wa.me/919226227258?text=Hello!", "_blank");
          }}
          className="p-4 bg-emerald-500 shadow-xl border-4 border-white text-white rounded-full hover:scale-105 hover:bg-emerald-600 active:scale-95 transition-all duration-200 flex items-center justify-center animate-bounce duration-[3000ms]"
          id="whatsapp-bubble-anchor"
        >
          <MessageSquare className="h-6 w-6 stroke-[3px]" />
        </button>
      </div>

      {/* FOOTER SECTION */}
      <footer className="bg-slate-950 text-slate-300 py-16 text-left border-t border-white/5" id="luxury-salon-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-12 gap-8">
          
          {/* Col 1 Brand (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-serif text-lg font-black tracking-widest text-white block">
              THE LOOK BOOK
            </span>
            <p className="text-xs text-slate-400 leading-normal font-light">
              Panjim&apos;s boutique beauty sanctuary specializing in modern color gradients, customized clean facial therapies, and sweat-proof destination bridal makeovers.
            </p>
            <div className="flex items-center space-x-1 text-xs font-bold text-amber-500">
              <span>★★★★★</span>
              <span className="text-white ml-1">4.8 Rating Google</span>
            </div>
          </div>

          {/* Col 2 Quick Links (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-white text-xs font-bold uppercase tracking-widest block">Explore</span>
            <ul className="text-xs text-slate-400 font-light space-y-2">
              <li><button onClick={() => handleActiveTabChange("home")} className="hover:text-pink-300">Home</button></li>
              <li><button onClick={() => handleActiveTabChange("services")} className="hover:text-pink-300">Services</button></li>
              <li><button onClick={() => handleActiveTabChange("simulator")} className="hover:text-pink-300">AI Simulator</button></li>
              <li><button onClick={() => handleActiveTabChange("bridal")} className="hover:text-pink-300">Bridal Studio</button></li>
            </ul>
          </div>

          {/* Col 3 Categories (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-white text-xs font-bold uppercase tracking-widest block">Specialties</span>
            <ul className="text-xs text-slate-400 font-light space-y-2">
              <li><button onClick={() => handleActiveTabChange("services")} className="hover:text-pink-300">Balayage</button></li>
              <li><button onClick={() => handleActiveTabChange("services")} className="hover:text-pink-300">Keratin</button></li>
              <li><button onClick={() => handleActiveTabChange("services")} className="hover:text-pink-300">Gold Facial</button></li>
              <li><button onClick={() => handleActiveTabChange("gallery")} className="hover:text-pink-300">Manicures</button></li>
            </ul>
          </div>

          {/* Col 4 Contacts Operating (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-white text-xs font-bold uppercase tracking-widest block">Goa Sanctuary</span>
            
            <div className="space-y-2 text-xs text-slate-400 font-light leading-relaxed">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-[#2563EB] shrink-0 mt-0.5" />
                <span>Shop No. 6 & 7, Kamdhenu Building, Altinho, Panaji, Goa 403001</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-[#2563EB] shrink-0" />
                <a href="tel:+919226227258" className="hover:text-white font-semibold">+91 92262 27258</a>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-amber-500 shrink-0" />
                <span>Open Daily: 09:30 AM to 07:30 PM</span>
              </div>
            </div>

            {/* Newsletter input placeholder */}
            <div className="pt-2">
              <span className="block text-[10px] text-slate-500 uppercase font-black tracking-wider mb-1.5">Weekly beauty guidelines</span>
              <div className="flex rounded-xl overflow-hidden shadow-md">
                <input
                  type="email"
                  placeholder="name@gmail.com"
                  className="px-3.5 py-1.5 bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none w-full text-xs"
                />
                <button
                  onClick={() => alert("Verification Email Dispatched! Thank you for subscribing to weekly salon guidelines.")}
                  className="px-4 py-1.5 bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-xs"
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sells and copyrights */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[10px] text-slate-500 pt-12 border-t border-white/5 mt-12">
          <span>© {new Date().getFullYear()} The Look Book Hair & Beauty Salon. All rights reserved. Crafted near Altinho, Panjim, Goa.</span>
        </div>
      </footer>
    </div>
  );
}
