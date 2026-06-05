"use client";

import React, { useState } from "react";
import { Menu, X, Star, Calendar, Scissors } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenQuickBook: () => void;
}

export default function Navbar({ activeTab, setActiveTab, onOpenQuickBook }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "simulator", label: "AI Simulator" },
    { id: "booking", label: "Reservations" },
    { id: "bridal", label: "Bridal Studio" },
    { id: "gallery", label: "Gallery" },
    { id: "loyalty", label: "Club Lounge" },
    { id: "contact", label: "Contact" },
  ];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-panel border-b border-pink-100 premium-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand */}
          <div 
            onClick={() => handleTabClick("home")}
            className="flex items-center space-x-3 cursor-pointer group"
            id="nav-logo-btn"
          >
            <div className="p-2.5 bg-gradient-to-tr from-[#2563EB] via-purple-500 to-[#FFC0CB] rounded-xl text-white shadow-md group-hover:scale-105 transition-all duration-300">
              <Scissors className="h-5 w-5" />
            </div>
            <div>
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-[#2563EB] bg-clip-text text-transparent">
                THE LOOK BOOK
              </span>
              <div className="flex items-center space-x-1 text-[10px] text-gray-500 font-medium">
                <span>Panjim, Goa</span>
                <span>•</span>
                <div className="flex items-center text-amber-500">
                  <Star className="h-2.5 w-2.5 fill-current" />
                  <span className="ml-0.5 text-slate-700 font-bold">4.8</span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-1" id="nav-desktop-tabs">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`tab-btn-${item.id}`}
                onClick={() => handleTabClick(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-[#2563EB] to-purple-600 text-white shadow-sm font-semibold"
                    : "text-slate-600 hover:text-[#2563EB] hover:bg-slate-50/50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Extra CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={() => setActiveTab("admin")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-300 ${
                activeTab === "admin"
                  ? "bg-slate-100 border-slate-300 text-slate-800"
                  : "border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
              id="admin-nav-trigger"
            >
              Staff Portal
            </button>
            <button
              onClick={onOpenQuickBook}
              className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              id="header-book-btn"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Hamburguer */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={() => setActiveTab("admin")}
              className="px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
            >
              Portal
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-[#2563EB] hover:bg-slate-100 transition-colors"
              aria-label="Toggle Menu"
              id="mobile-menu-trigger"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden glass-panel border-t border-pink-100 absolute top-20 left-0 right-0 shadow-xl max-h-[calc(100vh-80px)] overflow-y-auto animate-fadeIn duration-200" id="nav-mobile-drawer">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full text-left px-5 py-3 rounded-xl text-base font-medium transition-all duration-200 flex items-center justify-between ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-[#2563EB] to-purple-600 text-white shadow-sm font-semibold"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span>{item.label}</span>
                {activeTab === item.id && <span className="h-2 w-2 rounded-full bg-white animate-pulse" />}
              </button>
            ))}
            <div className="pt-4 border-t border-slate-100 flex flex-col space-y-3">
              <button
                onClick={() => {
                  handleTabClick("admin");
                }}
                className="w-full text-center py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50"
              >
                Staff Portal
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenQuickBook();
                }}
                className="w-full text-center py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-bold rounded-xl shadow-md"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
