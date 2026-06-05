"use client";

import React from "react";
import { TEAM_MEMBERS, TeamMember } from "@/lib/salon-data";
import { Star, Eye, Instagram, BadgeCheck } from "lucide-react";

interface TeamGridProps {
  onSelectStylist: (id: string, name: string) => void;
}

export default function TeamGrid({ onSelectStylist }: TeamGridProps) {
  return (
    <section className="py-24 bg-white" id="team-experts-portal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Team Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-pink-500 font-semibold tracking-wider text-xs uppercase block mb-2">Artistry Masters</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Meet Our Certified Luxury Artists
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-[#2563EB] mx-auto mt-4 rounded-full" />
        </div>

        {/* Dynamic Stylists list grids */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8" id="team-cards-grid">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex flex-col group premium-hover-shadow"
            >
              {/* Profile Image Column */}
              <div className="relative aspect-square bg-slate-50 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Years Experience Seal tag badge */}
                <div className="absolute top-4 left-4 inline-flex items-center space-x-1 px-3 py-1 bg-slate-900 border border-slate-800 text-white text-[9px] font-bold rounded-lg shadow-md uppercase tracking-widest">
                  <BadgeCheck className="h-3 w-3 text-emerald-400" />
                  <span>{member.experience} EXP</span>
                </div>

                {/* Direct Instagram shortcut link overlay */}
                {member.socials?.instagram && (
                  <a
                    href={member.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:text-pink-500 hover:scale-105 shadow-md transition-all duration-200"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                )}
              </div>

              {/* Bio description details */}
              <div className="p-6 text-left flex flex-col flex-grow">
                <div className="mb-2">
                  <h3 className="font-serif text-lg font-bold text-slate-800 leading-tight group-hover:text-[#2563EB] transition-colors">
                    {member.name}
                  </h3>
                  <span className="block text-xs text-rose-500 font-medium leading-relaxed mt-0.5">{member.role}</span>
                </div>

                {/* Star quality indicators */}
                <div className="flex items-center space-x-1 mb-4 text-xs font-semibold text-slate-700">
                  <Star className="h-4 w-4 text-amber-500 fill-current" />
                  <span>{member.rating}</span>
                  <span className="text-slate-400 font-normal">({member.reviewsCount} visits)</span>
                </div>

                {/* Skills items chip array */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {member.specialization.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md bg-slate-50 text-[10px] text-slate-500 font-semibold border border-slate-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Reservation assignment trigger button */}
                <button
                  onClick={() => onSelectStylist(member.id, member.name)}
                  className="w-full text-center py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors mt-auto shadow-sm tracking-wide uppercase"
                >
                  Book with {member.name.split(" ")[0]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
