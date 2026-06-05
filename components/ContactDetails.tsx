"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Map, ExternalLink } from "lucide-react";

export default function ContactDetails() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmitContactForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !msg) return;
    setSuccess(true);
    setName("");
    setEmail("");
    setMsg("");
  };

  const triggerLiveDirectionsLink = () => {
    window.open("https://maps.google.com/?q=The+Look+Book+Hair+and+Beauty+Salon+Panjim+Goa", "_blank");
  };

  return (
    <section className="py-24 bg-white relative" id="contact-salon-info">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-pink-500 font-semibold tracking-wider text-xs uppercase block mb-2">Location & directions</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Connect With Our Luxury Salon Sanctuary
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-[#2563EB] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-stretch">
          
          {/* Address credentials panel Left (5 columns) */}
          <div className="lg:col-span-5 bg-[#FAFAFC] border border-pink-50/50 rounded-3xl p-6 sm:p-8 space-y-8 flex flex-col justify-between text-left">
            <div className="space-y-6">
              <h3 className="font-serif text-xl font-bold text-slate-800">Our Panaji Headquarter</h3>
              
              <div className="space-y-4 text-xs font-light text-slate-600">
                {/* Physical address */}
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-[#2563EB] shrink-0" />
                  <div>
                    <strong className="block font-medium text-slate-900 mb-0.5">The Look Book Salon</strong>
                    <span>Shop No. 6 & 7, Kamdhenu Building,<br />Dr. Dada Vaidya Road, Near Hotel Manoshanti,<br />Altinho, Panaji, Goa 403001</span>
                  </div>
                </div>

                {/* Mobile coordinates */}
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-pink-500 shrink-0" />
                  <div>
                    <strong className="block font-medium text-slate-900 mb-0.5">Contact Call Desk</strong>
                    <a href="tel:+919226227258" className="hover:text-[#2563EB] font-bold block">+91 92262 27258</a>
                    <span className="text-[10px] text-slate-400">Available 9:30 AM to 7:30 PM</span>
                  </div>
                </div>

                {/* Email address */}
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-indigo-505 text-indigo-500 shrink-0" />
                  <div>
                    <strong className="block font-medium text-slate-900 mb-0.5">Inquiry Support Desk</strong>
                    <a href="mailto:support@thelookbooksalon.com" className="hover:text-[#2563EB] block">support@thelookbooksalon.com</a>
                  </div>
                </div>

                {/* Working hours */}
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-amber-500 shrink-0" />
                  <div>
                    <strong className="block font-medium text-slate-900 mb-0.5">Operational Hours</strong>
                    <span>Daily: 09:30 AM to 07:30 PM <span className="text-[10px] text-[#2563EB] font-semibold">(Sunday Open)</span></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Live Directions widget maps card launcher */}
            <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center space-x-3 text-left">
                <div className="p-2.5 bg-gradient-to-tr from-[#2563EB]/10 to-indigo-100 rounded-lg text-[#2563EB]">
                  <Map className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-800">Launch Google Maps GPS</span>
                  <span className="text-[10px] text-slate-400 block">Altinho, nearby Hotel Manoshanti</span>
                </div>
              </div>

              <button
                onClick={triggerLiveDirectionsLink}
                className="p-2 bg-gradient-to-tr from-[#2563EB] to-purple-600 hover:brightness-110 active:scale-95 rounded-lg text-white shadow-md"
                id="maps-gpd-launcher"
              >
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Interactive contact message form Column Right (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-pink-100 rounded-3xl p-6 sm:p-8 text-left space-y-6">
            <h3 className="font-serif text-xl font-bold text-slate-900">Send Offline Message</h3>
            
            {success && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium animate-fadeIn">
                Your message has been processed successfully! A customer support representative will get back to your email/phone as soon as possible.
                <button onClick={() => setSuccess(false)} className="block mt-1 underline font-bold">Send another message</button>
              </div>
            )}

            <form onSubmit={handleSubmitContactForm} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Your Name</span>
                  <input
                    type="text"
                    placeholder="e.g. Shalini Sawant"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Contact Email</span>
                  <input
                    type="email"
                    placeholder="e.g. shalini@gmail.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Message Inquiry Notes</span>
                <textarea
                  placeholder="Ask and price rates, customized bridal formulas bulk event inquiries..."
                  required
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none min-h-[140px]"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white text-xs font-bold shadow-md flex items-center space-x-2"
                id="submit-offline-msg"
              >
                <Send className="h-4 w-4" />
                <span>Transmit message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
