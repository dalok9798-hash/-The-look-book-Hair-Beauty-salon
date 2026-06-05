"use client";

import React, { useState, useEffect } from "react";
import { Appointment } from "./BookingForm";
import {
  Star,
  ShieldAlert,
  CheckCircle,
  Trash2,
  TrendingUp,
  Sparkles,
  User,
  RefreshCw,
  Lock,
  Unlock,
  KeyRound,
  LogOut,
  Mail,
  Phone,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  FileText,
  UserCheck
} from "lucide-react";

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("lookbook_appointments");
      if (saved) return JSON.parse(saved);
    }
    return [];
  });
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Staff Login Credentials & State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("lookbook_staff_authenticated") === "true";
    }
    return false;
  });
  const [staffId, setStaffId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Expanded client details state
  const [expandedAppointmentId, setExpandedAppointmentId] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (staffId.trim().toLowerCase() === "staff" && password === "lookbookstaff123") {
      setIsAuthenticated(true);
      setLoginError("");
      if (typeof window !== "undefined") {
        localStorage.setItem("lookbook_staff_authenticated", "true");
      }
    } else {
      setLoginError("Invalid Staff ID or Password. Please check the access keys banner.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setStaffId("");
    setPassword("");
    if (typeof window !== "undefined") {
      localStorage.removeItem("lookbook_staff_authenticated");
    }
  };

  const triggerUpdateStatus = (id: string, newStatus: Appointment["status"]) => {
    const updated = appointments.map((b) => {
      if (b.id === id) {
        return { ...b, status: newStatus };
      }
      return b;
    });
    setAppointments(updated);
    localStorage.setItem("lookbook_appointments", JSON.stringify(updated));
  };

  const deleteAppointment = (id: string) => {
    const updated = appointments.filter((b) => b.id !== id);
    setAppointments(updated);
    localStorage.setItem("lookbook_appointments", JSON.stringify(updated));
  };

  const filteredAppointments = appointments.filter((b) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "pending") return b.status === "Awaiting Approval";
    if (activeFilter === "confirmed") return b.status === "Confirmed";
    return true;
  });

  // Calculate high-fidelity Business Analytics stand-ins
  const totalRevenue = appointments
    .filter((b) => b.status !== "Cancelled")
    .reduce((sum, b) => sum + b.servicePrice, 0);

  const activeReservationsCount = appointments.filter((b) => b.status === "Awaiting Approval" || b.status === "Confirmed").length;

  if (!isAuthenticated) {
    return (
      <section className="py-24 bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 text-white min-h-screen flex items-center justify-center animate-fade-in" id="staff-auth-portal-panel">
        <div className="max-w-md w-full mx-auto px-6">
          <div className="bg-slate-950/85 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10 text-center relative overflow-hidden">
            
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="mx-auto h-16 w-16 bg-gradient-to-tr from-pink-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-6 border border-white/10">
              <Lock className="h-8 w-8 text-white" />
            </div>

            <h2 className="font-serif text-2xl font-black tracking-tight text-white mb-2">
              Staff Portal Login
            </h2>
            <p className="text-xs text-slate-400 font-light mb-8 max-w-xs mx-auto">
              Please authenticate with your credential keys to access Goan operations scheduler ledgers.
            </p>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Access Staff ID</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="e.g. staff"
                    value={staffId}
                    onChange={(e) => setStaffId(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-pink-500/80 focus:ring-1 focus:ring-pink-500/80 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Access Secret Password</label>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <KeyRound className="h-4 w-4" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-pink-500/80 focus:ring-1 focus:ring-pink-500/80 transition-all font-medium font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-pink-400 hover:text-pink-300 transition-colors font-semibold"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="p-3 bg-rose-500/15 border border-rose-500/20 rounded-xl flex items-start space-x-2 text-xs text-rose-300">
                  <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5 text-rose-400" />
                  <span className="leading-normal">{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-bold text-sm shadow-md shadow-pink-500/10 transition-transform active:scale-[0.98] flex items-center justify-center space-x-2"
              >
                <span>Authorize Access Portal</span>
                <Unlock className="h-4 w-4" />
              </button>
            </form>

            {/* Default credentials helper container */}
            <div className="mt-8 pt-6 border-t border-white/10 text-left bg-white/[0.02] p-4 rounded-2xl border border-white/5">
              <span className="text-[9px] text-pink-400 font-bold uppercase tracking-wider block mb-1">🔑 Demo Receptionist Login Keys</span>
              <p className="text-[11px] text-slate-300 leading-normal font-light">
                Use the default credentials below to authenticate:
              </p>
              <div className="grid grid-cols-2 gap-3 mt-2.5 text-[10px] font-mono bg-black/40 p-2.5 rounded-lg border border-white/5 text-slate-350">
                <div>
                  <span className="text-slate-400 block text-[8px] uppercase tracking-wide font-semibold">Username:</span>
                  <span className="text-white font-bold">staff</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[8px] uppercase tracking-wide font-semibold">Password:</span>
                  <span className="text-white font-bold">lookbookstaff123</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 text-white min-h-screen" id="admin-staff-portal-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Portal Header */}
        <div className="text-left mb-12">
          <span className="text-pink-400 font-semibold tracking-wider text-xs uppercase block mb-1">Receptionist Portal</span>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="font-serif text-3xl font-extrabold text-white leading-tight">
              Salon Operations Control Center
            </h2>
            <div className="flex gap-2 items-center flex-wrap">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white/10 text-white text-xs font-semibold rounded-full border border-white/20">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Operator: receptionist_desk_01</span>
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center space-x-1.5 px-3 py-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 hover:text-white text-xs font-semibold rounded-full border border-rose-500/30 transition-all active:scale-95"
                title="Lock Staff Session"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Secure Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* METRIC ANALYTICAL BADGES CORES */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12" id="admin-analytics-metrics">
          
          {/* Revenue */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-left">
            <span className="block text-xs uppercase text-slate-400 font-bold tracking-wide">Gross Booking Income</span>
            <span className="block text-2xl sm:text-3xl font-serif font-black text-rose-400 mt-2">₹{totalRevenue.toLocaleString()}</span>
            <span className="text-[10px] text-slate-400 block mt-1">Excludes cancelled requests</span>
          </div>

          {/* Active Appointments */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-left">
            <span className="block text-xs uppercase text-slate-400 font-bold tracking-wide">Pending & Active Slots</span>
            <span className="block text-2xl sm:text-3xl font-serif font-black text-[#2563EB] mt-2">{activeReservationsCount} Sessions</span>
            <span className="text-[10px] text-slate-400 block mt-1">Requiring physical desks</span>
          </div>

          {/* Average satisfaction */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-left">
            <span className="block text-xs uppercase text-slate-400 font-bold tracking-wide">Rating Score average</span>
            <span className="block text-2xl sm:text-3xl font-serif font-black text-amber-400 mt-2">4.8 out of 5</span>
            <span className="text-[10px] text-slate-400 block mt-1">Aggregated verified reviews</span>
          </div>

          {/* Operating Status */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-left">
            <span className="block text-xs uppercase text-slate-400 font-bold tracking-wide">Power Standby Status</span>
            <div className="flex items-center space-x-2 mt-3">
              <span className="h-3 w-3 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm font-bold text-emerald-300">FULLY OPERATIONAL</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-1">All database channels active</span>
          </div>
        </div>

        {/* RECEPTIONIST MODERATOR LISTINGS ROW */}
        <div className="bg-white text-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col shadow-2xl items-stretch border border-slate-200">
          
          {/* List Headers Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-6 mb-6 gap-4">
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
                <span>Operational Schedulers Ledger</span>
              </h3>
              <p className="text-[11px] text-slate-400 font-light">
                Click any client row or the expansion chevron to view full system-wide customer files.
              </p>
            </div>

            {/* Filter buttons inline */}
            <div className="flex gap-2" id="admin-bookings-tab-filters">
              {[
                { id: "all", label: "All Lists" },
                { id: "pending", label: "Awaiting Action" },
                { id: "confirmed", label: "Confirmed Only" }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    activeFilter === f.id
                      ? "bg-slate-900 border-slate-800 text-white shadow-sm"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Ledger list tables */}
          {filteredAppointments.length > 0 ? (
            <div className="overflow-x-auto w-full" id="admin-appointments-ledger-table">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-2 w-8"></th>
                    <th className="py-3 px-4">Ref Reference</th>
                    <th className="py-3 px-4">Client Detail</th>
                    <th className="py-3 px-4">Desired Treatment</th>
                    <th className="py-3 px-4">Assigned Specialist</th>
                    <th className="py-3 px-4">Schedule Frame</th>
                    <th className="py-3 px-4">Current Status</th>
                    <th className="py-3 px-4 text-right">Moderations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredAppointments.map((b) => (
                    <React.Fragment key={b.id}>
                      <tr className="hover:bg-slate-50 transition-colors">
                        {/* Dropdown Chevron */}
                        <td className="py-4 px-2 text-center">
                          <button
                            onClick={() => setExpandedAppointmentId(expandedAppointmentId === b.id ? null : b.id)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors focus:outline-none"
                            title="Expand Customer Profile File"
                          >
                            {expandedAppointmentId === b.id ? (
                              <ChevronUp className="h-4 w-4 text-pink-500" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-slate-400 hover:text-slate-600" />
                            )}
                          </button>
                        </td>

                        {/* Ref */}
                        <td className="py-4 px-4 font-bold text-slate-900">
                          {b.id}
                        </td>

                        {/* Client */}
                        <td className="py-4 px-4 text-left">
                          <div 
                            className="flex items-center space-x-1.5 cursor-pointer group"
                            onClick={() => setExpandedAppointmentId(expandedAppointmentId === b.id ? null : b.id)}
                          >
                            <span className="block font-semibold text-slate-800 group-hover:text-pink-600 transition-colors">
                              {b.clientName}
                            </span>
                            <span className="text-[9px] text-pink-600 font-bold uppercase bg-pink-50 border border-pink-100 px-1.5 py-0.5 rounded transition-colors group-hover:bg-pink-100">
                              View File
                            </span>
                          </div>
                          <span className="block text-[10px] text-slate-400 font-mono mt-0.5">{b.clientPhone}</span>
                        </td>

                        {/* Treatment */}
                        <td className="py-4 px-4 font-medium">
                          {b.serviceName}
                        </td>

                        {/* Therapist */}
                        <td className="py-4 px-4">
                          {b.stylistName}
                        </td>

                        {/* Hour frame */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className="block font-semibold">{b.date}</span>
                          <span className="block text-[10px] text-pink-500 font-bold">{b.timeSlot}</span>
                        </td>

                        {/* Active Status tag */}
                        <td className="py-4 px-4">
                          <span
                            className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full ${
                              b.status === "Confirmed"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : b.status === "Awaiting Approval"
                                ? "bg-amber-50 text-amber-700 border border-amber-200 animate-pulse"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>

                        {/* Admin operational mods */}
                        <td className="py-4 px-4 text-right whitespace-nowrap space-x-1">
                          {b.status === "Awaiting Approval" && (
                            <button
                              onClick={() => triggerUpdateStatus(b.id, "Confirmed")}
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[10px] shadow-sm transition-transform active:scale-95"
                            >
                              Approve Slot
                            </button>
                          )}
                          <button
                            onClick={() => deleteAppointment(b.id)}
                            className="p-1 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-rose-50 hover:text-red-600 hover:border-red-100 text-slate-400 text-[10px] transition-colors"
                            title="Remove Booking Record"
                          >
                            Cancel / Delete
                          </button>
                        </td>
                      </tr>

                      {/* Expandable row showing ALL customer details file */}
                      {expandedAppointmentId === b.id && (
                        <tr className="bg-slate-50 border-l-4 border-l-pink-500 border-r-4 border-r-indigo-500/20 shadow-inner">
                          <td colSpan={8} className="p-0">
                            <div className="p-6 md:p-8 text-left space-y-6">
                              
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                                <div className="space-y-0.5">
                                  <div className="flex items-center space-x-2">
                                    <span className="h-2 w-2 rounded-full bg-pink-500 animate-pulse" />
                                    <h4 className="font-serif text-base font-bold text-slate-900">
                                      System-Wide Client Profile Record: {b.clientName}
                                    </h4>
                                  </div>
                                  <p className="text-xs text-slate-400 font-light">
                                    Comprehensive ledger coordinates for active slot reference docket <strong className="font-mono text-slate-600 font-medium">{b.id}</strong>.
                                  </p>
                                </div>
                                <span className="self-start sm:self-center text-[10px] font-bold px-2.5 py-1 bg-indigo-55/10 text-indigo-700 border border-indigo-200/50 rounded-lg shrink-0">
                                  Personnel Session Active
                                </span>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                
                                {/* Client Contact specs */}
                                <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
                                  <span className="text-[10px] uppercase tracking-wider text-pink-600 font-bold flex items-center space-x-1.5">
                                    <Phone className="h-3.5 w-3.5 text-pink-500" />
                                    <span>Core Client Contact Information</span>
                                  </span>

                                  <div className="space-y-3.5">
                                    <div className="text-xs">
                                      <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wide">Client Full Name</span>
                                      <span className="text-slate-800 font-bold block mt-0.5 text-sm">{b.clientName}</span>
                                    </div>
                                    <div className="text-xs">
                                      <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wide">Primary Telephone Number</span>
                                      <a href={`tel:${b.clientPhone}`} className="text-indigo-600 hover:underline font-bold block mt-0.5 flex items-center space-x-1 font-mono text-xs">
                                        <Phone className="h-3 w-3 text-slate-400" />
                                        <span>{b.clientPhone}</span>
                                      </a>
                                    </div>
                                    <div className="text-xs">
                                      <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wide">Primary Email Address</span>
                                      <a href={`mailto:${b.clientEmail}`} className="text-indigo-600 hover:underline font-bold block mt-0.5 flex items-center space-x-1 font-mono text-xs">
                                        <Mail className="h-3 w-3 text-slate-400" />
                                        <span>{b.clientEmail}</span>
                                      </a>
                                    </div>
                                    <div className="text-xs">
                                      <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wide">WhatsApp Messenger Link</span>
                                      <a
                                        href={`https://wa.me/${b.clientWhatsapp.replace(/[^0-9]/g, "")}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-emerald-600 hover:underline font-bold block mt-0.5 flex items-center space-x-1 font-mono text-xs"
                                      >
                                        <MessageSquare className="h-3 w-3 text-emerald-500" />
                                        <span>{b.clientWhatsapp}</span>
                                      </a>
                                    </div>
                                  </div>
                                </div>

                                {/* Booking details specs */}
                                <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
                                  <span className="text-[10px] uppercase tracking-wider text-indigo-650 font-bold flex items-center space-x-1.5">
                                    <TrendingUp className="h-3.5 w-3.5 text-indigo-500" />
                                    <span>Interactive Booking Details</span>
                                  </span>

                                  <div className="space-y-3.5">
                                    <div className="text-xs">
                                      <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wide">Requested Salon Treatment</span>
                                      <span className="block font-bold text-slate-800 mt-0.5 text-sm">{b.serviceName}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                      <div>
                                        <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wide">Treatment Value</span>
                                        <span className="block font-black text-rose-500 mt-0.5 text-sm">₹{b.servicePrice.toLocaleString()}</span>
                                      </div>
                                      <div>
                                        <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wide">Assigned Specialist</span>
                                        <span className="block font-bold text-slate-700 mt-0.5">{b.stylistName}</span>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                      <div>
                                        <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wide">Reserved Date</span>
                                        <span className="block font-semibold text-slate-800 mt-0.5">{b.date}</span>
                                      </div>
                                      <div>
                                        <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wide">Reserved Hours Frame</span>
                                        <span className="block font-bold text-pink-500 mt-0.5">{b.timeSlot}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Intake Custom Requests file text */}
                                <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between space-y-4">
                                  <div className="space-y-3">
                                    <span className="text-[10px] uppercase tracking-wider text-amber-600 font-bold flex items-center space-x-1.5">
                                      <FileText className="h-3.5 w-3.5 text-amber-500" />
                                      <span>Intake Custom Requests</span>
                                    </span>
                                    <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-100">
                                      <p className="text-slate-600 text-xs leading-relaxed font-light italic">
                                        &quot;{b.notes || "No special formulation parameters or request logs submitted by client during checkout."}&quot;
                                      </p>
                                    </div>
                                  </div>
                                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono">
                                    <span className="text-slate-400">Ref Code ID:</span>
                                    <span className="font-bold text-slate-800 uppercase">{b.id}</span>
                                  </div>
                                </div>

                              </div>

                              {/* Customer CRM dispatch commands panel */}
                              <div className="p-4 bg-slate-150/60 bg-slate-100 rounded-2xl flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                                <div className="flex items-center space-x-2 shrink-0">
                                  <UserCheck className="h-4.5 w-4.5 text-slate-500" />
                                  <span className="text-xs text-slate-600 font-medium">Rapid staff dispatch actions:</span>
                                </div>
                                <div className="flex flex-wrap gap-2 text-xs w-full sm:w-auto justify-end">
                                  <a
                                    href={`https://wa.me/${b.clientWhatsapp.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(b.clientName)},%20this%2520is%2520The%2520Look%2520Book%2520Salon%252520Goa.%2520We%2520are%2520reaching%2520out%2520regarding%2520your%2520appointment%2520for%2520${encodeURIComponent(b.serviceName)}%252520on%2520${b.date}%2520at%2520${b.timeSlot}.`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 font-bold text-white shadow-sm flex items-center space-x-1.5 transition-colors focus:ring-2 focus:ring-emerald-500/20"
                                  >
                                    <MessageSquare className="h-3.5 w-3.5 text-white/90" />
                                    <span>Send Whatsapp Confirmation</span>
                                  </a>
                                  <a
                                    href={`mailto:${b.clientEmail}?subject=Appointment%20Confirmation%20-%20The%20Look%20Book%20Salon&body=Hello%20${encodeURIComponent(b.clientName)},%20this%20is%20The%20Look%20Book%20Salon%250A%250AWe%20hope%2520you%2527re%20excited%20for%20your%20appointment%20for%20${encodeURIComponent(b.serviceName)}!`}
                                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 font-bold text-white shadow-sm flex items-center space-x-1.5 transition-colors focus:ring-2 focus:ring-indigo-600/20"
                                  >
                                    <Mail className="h-3.5 w-3.5 text-white/90" />
                                    <span>Email Appointment Docket</span>
                                  </a>
                                  <button
                                    onClick={() => {
                                      navigator.clipboard.writeText(`Client File:\nName: ${b.clientName}\nPhone: ${b.clientPhone}\nEmail: ${b.clientEmail}\nWhatsApp: ${b.clientWhatsapp}\nTreatment: ${b.serviceName}\nDate: ${b.date}\nSlot: ${b.timeSlot}\nNotes: ${b.notes}`);
                                      alert("Customer File copied to clipboard! Ready to paste into CRM systems.");
                                    }}
                                    className="px-4 py-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 font-bold text-slate-705 text-slate-700 shadow-sm flex items-center space-x-1.5 transition-colors"
                                  >
                                    <FileText className="h-3.5 w-3.5 text-slate-400" />
                                    <span>Export Customer File</span>
                                  </button>
                                </div>
                              </div>

                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-20 text-center">
              <span className="block text-4xl mb-2">🧹</span>
              <h4 className="font-serif text-base font-bold text-slate-800">Operational ledgers swept completely clean</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">No appointments matched the filtering criteria. Select &apos;All Lists&apos; above to view historic entries.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

