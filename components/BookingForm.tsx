"use client";

import React, { useState, useEffect } from "react";
import { SALON_SERVICES, TEAM_MEMBERS, SalonService, TeamMember } from "@/lib/salon-data";
import { Calendar, Clock, User, Phone, Mail, FileText, CheckCircle2, Trash2, Shield, AlertTriangle } from "lucide-react";

interface BookingFormProps {
  importedNotes: string;
  onClearNotes: () => void;
  activeService: SalonService | null;
  onClearActiveService: () => void;
}

export interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  clientWhatsapp: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  stylistId: string;
  stylistName: string;
  date: string;
  timeSlot: string;
  notes: string;
  status: "Awaiting Approval" | "Confirmed" | "Completed" | "Cancelled";
}

export default function BookingForm({
  importedNotes,
  onClearNotes,
  activeService,
  onClearActiveService
}: BookingFormProps) {
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("lookbook_appointments");
      if (saved) return JSON.parse(saved);
    }
    return [
      {
        id: "bk-101",
        clientName: "Rohan Alvares-Goa",
        clientPhone: "+91 91234 56789",
        clientEmail: "rohan@gmail.com",
        clientWhatsapp: "+91 91234 56789",
        serviceId: "hair-cut",
        serviceName: "Luxury Signature Haircut",
        servicePrice: 1500,
        stylistId: "team-priya",
        stylistName: "Priya Fernandes",
        date: "2026-06-06",
        timeSlot: "11:30 AM",
        notes: "Need extra neck relaxation massage",
        status: "Confirmed"
      }
    ];
  });
  const [category, setCategory] = useState<string>("hair");
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedStylist, setSelectedStylist] = useState<string>("");
  const [date, setDate] = useState<string>("2026-06-06");
  const [slot, setSlot] = useState<string>("11:00 AM");
  const [clientName, setClientName] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientWhatsapp, setClientWhatsapp] = useState<string>("");
  const [clientNotes, setClientNotes] = useState<string>("");
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  // Available times slots presets
  const slots = [
    "09:30 AM", "10:30 AM", "11:30 AM", "12:30 PM", 
    "02:30 PM", "03:30 PM", "04:30 PM", "05:30 PM", "06:30 PM"
  ];

  // Retrieve local state for booked elements
  useEffect(() => {
    // We already read from localStorage lazily in the top levels,
    // so we can keep the effect empty or delete it completely.
  }, []);

  // Listen for pre-fill requests (from services grid deep-link clicks)
  useEffect(() => {
    if (activeService) {
      const targetService = activeService;
      setTimeout(() => {
        setCategory(targetService.category);
        setSelectedService(targetService.id);
        onClearActiveService();
      }, 0);
    }
  }, [activeService, onClearActiveService]);

  // Listen for simulator note imports
  useEffect(() => {
    if (importedNotes) {
      const notes = importedNotes;
      setTimeout(() => {
        setClientNotes(notes);
      }, 0);
    }
  }, [importedNotes]);

  // Filter services dynamically by the selected tab choice
  const selectionFilteredServices = SALON_SERVICES.filter(
    (ser) => ser.category === category
  );

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedStylist || !clientName || !clientPhone) {
      alert("Please ensure Service, Stylist, Name, and Phone details are populated!");
      return;
    }

    const serviceObj = SALON_SERVICES.find((s) => s.id === selectedService)!;
    const stylistObj = TEAM_MEMBERS.find((t) => t.id === selectedStylist)!;

    const newBooking: Appointment = {
      id: `bk-${Date.now().toString().slice(-6)}`,
      clientName,
      clientPhone,
      clientEmail: clientEmail || "guest@lookbook.com",
      clientWhatsapp: clientWhatsapp || clientPhone,
      serviceId: selectedService,
      serviceName: serviceObj.name,
      servicePrice: serviceObj.price,
      stylistId: selectedStylist,
      stylistName: stylistObj.name,
      date,
      timeSlot: slot,
      notes: clientNotes,
      status: "Awaiting Approval"
    };

    const updated = [newBooking, ...appointments];
    setAppointments(updated);
    localStorage.setItem("lookbook_appointments", JSON.stringify(updated));

    setShowConfirmation(true);
    onClearNotes();

    // Trigger local state updates to simulate loyalty tiers
    const currentPoints = Number(localStorage.getItem("lookbook_loyalty_points") || "0");
    localStorage.setItem("lookbook_loyalty_points", (currentPoints + Math.round(serviceObj.price * 0.1)).toString());

    // Clear form inputs
    setClientName("");
    setClientPhone("");
    setClientEmail("");
    setClientWhatsapp("");
    setClientNotes("");
  };

  const handleRemoveBooking = (id: string) => {
    const updated = appointments.filter((b) => b.id !== id);
    setAppointments(updated);
    localStorage.setItem("lookbook_appointments", JSON.stringify(updated));
  };

  // Google Calendar simulated sync redirect action click
  const triggerGoogleCalendarSync = (b: Appointment) => {
    alert(`Success: Synced reservation ${b.id} with Google Calendar under email ${b.clientEmail}. The event invites have been dispatched.`);
  };

  // WhatsApp formatted string generator callback trigger
  const sendWhatsAppCallbackMsg = (b: Appointment) => {
    const greeting = encodeURIComponent(
      `Hello Look Book Salon Goa! I would like to confirm my booking reference *${b.id}*.\n` +
      `*Service:* ${b.serviceName}\n` +
      `*Stylist:* ${b.stylistName}\n` +
      `*Date/Time:* ${b.date} at ${b.timeSlot}\n` +
      `*Notes:* ${b.notes || "None"}`
    );
    const link = `https://wa.me/919226227258?text=${greeting}`;
    window.open(link, "_blank");
  };

  return (
    <section className="py-24 bg-white" id="online-booking-portal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Reservation Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-pink-500 font-semibold tracking-wider text-xs uppercase block mb-2">Advanced Scheduling Engine</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Reserve Your Premium Pampering Slot
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-[#2563EB] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
          
          {/* Reservation Scheduler Left Column (7 cols) */}
          <div className="lg:col-span-7 bg-[#FAFAFC] border border-pink-100 rounded-3xl p-6 sm:p-8">
            <h3 className="font-serif text-xl font-bold text-slate-900 mb-6 text-left flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-[#2563EB]" />
              <span>Session Setup</span>
            </h3>

            {/* Simulated Booking Success Plaque */}
            {showConfirmation && (
              <div className="mb-8 p-5 bg-emerald-50 rounded-2xl border border-emerald-200 text-left space-y-2 animate-fadeIn" id="confirmation-banner">
                <div className="flex items-center space-x-2 text-emerald-800 font-bold text-sm">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <span>Reservation Created Successfully!</span>
                </div>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Your appointment slot has been reserved. A confirmation SMS was sent to your phone number. You are also earned 150+ loyalty rewards points for this visit!
                </p>
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="px-3 py-1 bg-white hover:bg-slate-50 border border-slate-200 text-[10px] font-bold text-slate-700 rounded-lg shadow-sm"
                >
                  Create another reservation
                </button>
              </div>
            )}

            <form onSubmit={handleBookingSubmit} className="space-y-6 text-left">
              {/* Row 1: Division Category selector */}
              <div className="space-y-2">
                <label className="text-xs text-slate-500 font-bold tracking-wider uppercase">Category Division</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: "hair", label: "Hair" },
                    { id: "beauty", label: "Facial" },
                    { id: "makeup", label: "Makeup" },
                    { id: "nails", label: "Nails" }
                  ].map((cat) => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => {
                        setCategory(cat.id);
                        setSelectedService(""); // reset
                      }}
                      className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-colors ${
                        category === cat.id
                          ? "bg-slate-950 border-slate-900 text-white"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Service & Stylist dropdown selectors */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-slate-500 font-bold tracking-wider uppercase">Select Treatment</label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#2563EB] text-slate-800"
                    id="booking-service-dropdown"
                  >
                    <option value="">-- Choose service --</option>
                    {selectionFilteredServices.map((ser) => (
                      <option key={ser.id} value={ser.id}>
                        {ser.name} (₹{ser.price})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-slate-500 font-bold tracking-wider uppercase">Select Therapist/Stylist</label>
                  <select
                    value={selectedStylist}
                    onChange={(e) => setSelectedStylist(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#2563EB] text-slate-800"
                    id="booking-stylist-dropdown"
                  >
                    <option value="">-- Select specialist --</option>
                    {TEAM_MEMBERS.map((stylist) => (
                      <option key={stylist.id} value={stylist.id}>
                        {stylist.name} ({stylist.role})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time Slot selection */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-slate-500 font-bold tracking-wider uppercase">Schedule Date</label>
                  <input
                    type="date"
                    min="2026-06-05"
                    max="2026-12-31"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#2563EB] text-slate-800"
                  />
                </div>

                <div className="space-y-2 flex flex-col items-start">
                  <label className="text-xs text-slate-500 font-bold tracking-wider uppercase">Preferred Hour Slot</label>
                  <div className="grid grid-cols-3 gap-1.5 w-full">
                    {slots.slice(0, 6).map((time) => (
                      <button
                        type="button"
                        key={time}
                        onClick={() => setSlot(time)}
                        className={`py-2 px-1 text-[11px] font-semibold rounded-lg border transition-all ${
                          slot === time
                            ? "bg-[#2563EB]/20 border-[#2563EB] text-[#2563EB] font-bold"
                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Personal profile credentials */}
              <div className="space-y-4 pt-4 border-t border-slate-250">
                <span className="block text-xs font-black text-slate-500 uppercase tracking-widest">Personal Details</span>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Full Name</span>
                    <input
                      type="text"
                      placeholder="e.g. Elena De Silva"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Mobile Phone</span>
                    <input
                      type="tel"
                      placeholder="e.g. +91 92262 27258"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Email (Dispatched Reciept)</span>
                    <input
                      type="email"
                      placeholder="e.g. customer@gmail.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">WhatsApp Number</span>
                    <input
                      type="tel"
                      placeholder="e.g. Leave blank to copy mobile"
                      value={clientWhatsapp}
                      onChange={(e) => setClientWhatsapp(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Special Notes / Exported AI Guide</span>
                  <textarea
                    placeholder="Provide styling preferences or custom notes here..."
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none min-h-[80px]"
                  />
                </div>
              </div>

              {/* Schedule button */}
              <button
                type="submit"
                className="w-full text-center py-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:brightness-110 active:scale-95 text-white font-bold tracking-wider shadow-md hover:shadow-lg transition-all uppercase text-sm"
                id="booking-submit-btn"
              >
                Confirm Luxury Booking
              </button>
            </form>
          </div>

          {/* User Active Appointments Right Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 text-left border border-white/5 shadow-2xl">
              <h3 className="font-serif text-lg font-bold flex items-center space-x-2 mb-6">
                <Clock className="h-5 w-5 text-pink-300" />
                <span>Your Active Bookings</span>
              </h3>

              {appointments.length > 0 ? (
                <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1" id="active-bookings-dashboard">
                  {appointments.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 relative group"
                    >
                      <button
                        onClick={() => handleRemoveBooking(item.id)}
                        className="absolute top-4 right-4 text-slate-400 hover:text-red-400 transition-colors"
                        title="Cancel Appointment"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      <div className="space-y-1 text-left">
                        <span className="inline-block text-[9px] bg-amber-500/10 text-amber-300 font-bold px-2 py-0.5 rounded-full mb-1">
                          {item.status}
                        </span>
                        <h4 className="text-sm font-semibold text-white leading-tight pr-6">
                          {item.serviceName}
                        </h4>
                        <p className="text-[11px] text-slate-300 capitalize">
                          Therapist: <strong className="text-white">{item.stylistName}</strong>
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 border-t border-white/5 pt-2">
                        <div>
                          <span className="block uppercase text-[8px] tracking-wide text-slate-500">Date/Time</span>
                          <span className="text-white">{item.date} • {item.timeSlot}</span>
                        </div>
                        <div>
                          <span className="block uppercase text-[8px] tracking-wide text-slate-500">Receipt value</span>
                          <span className="text-pink-300 font-bold">₹{item.servicePrice.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Client export shortcuts */}
                      <div className="flex gap-2 pt-2 border-t border-white/5">
                        <button
                          onClick={() => sendWhatsAppCallbackMsg(item)}
                          className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[10px] font-bold border border-emerald-500/20 transition-all w-full justify-center"
                        >
                          <span>Confirm on WhatsApp</span>
                        </button>
                        <button
                          onClick={() => triggerGoogleCalendarSync(item)}
                          className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-[#2563EB]/25 hover:bg-[#2563EB]/35 text-blue-300 text-[10px] font-bold border border-blue-500/15 transition-all w-full justify-center"
                        >
                          <span>Google Sync</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-500">
                  <span className="block text-3xl mb-2">🗓️</span>
                  <span className="text-xs">No active sessions booked.</span>
                </div>
              )}
            </div>

            {/* Quick Policy Notice */}
            <div className="p-5 rounded-2xl bg-[#FFF0F2] border border-pink-100 text-left flex items-start space-x-3">
              <Shield className="h-5 w-5 text-pink-500 shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-bold text-pink-900">Elite Treatment Polices</span>
                <span className="text-[11px] text-pink-700 leading-relaxed block mt-0.5">
                  Bookings are fully cancellable up to 2 hours prior to schedules. Walk-ins are accommodated based on daily specialist availability.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
