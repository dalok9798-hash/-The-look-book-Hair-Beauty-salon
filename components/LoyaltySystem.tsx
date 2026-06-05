"use client";

import React, { useState, useEffect } from "react";
import { GIFT_CARDS_PRESETS } from "@/lib/salon-data";
import { Award, Gift, Sparkles, Send, Coins, Users, Percent, CheckCircle } from "lucide-react";

export default function LoyaltySystem() {
  const [points, setPoints] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const val = localStorage.getItem("lookbook_loyalty_points");
      if (val) return Number(val);
    }
    return 320;
  });
  const [spentAmount, setSpentAmount] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const val = localStorage.getItem("lookbook_loyalty_points");
      if (val) return Number(val) * 10;
    }
    return 3200;
  });
  
  // Gift Card selection states
  const [selectedPreset, setSelectedPreset] = useState<string>("card-luxe");
  const [giftAmount, setGiftAmount] = useState<number>(5000);
  const [recipient, setRecipient] = useState<string>("");
  const [giftSuccess, setGiftSuccess] = useState<boolean>(false);

  // Referral states
  const [referredEmail, setReferredEmail] = useState<string>("");
  const [referSuccess, setReferSuccess] = useState<boolean>(false);

  useEffect(() => {
    // Already loaded lazily in initial states
  }, []);

  const handleSimulatePoints = () => {
    const updated = points + 250;
    setPoints(updated);
    setSpentAmount(updated * 10);
    localStorage.setItem("lookbook_loyalty_points", updated.toString());
  };

  // Determine tiers dynamically
  let tier = "Silver Member";
  let tierDiscount = "5%";
  let tierCardBg = "bg-gradient-to-br from-slate-100 to-slate-200 border-slate-300 text-slate-700";
  let progressRatio = Math.min(100, (points / 1000) * 100);

  if (points >= 1000) {
    tier = "Platinum Elite";
    tierDiscount = "20%";
    tierCardBg = "bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 border-purple-500/20 text-white";
    progressRatio = 100;
  } else if (points >= 500) {
    tier = "Gold Premium";
    tierDiscount = "12%";
    tierCardBg = "bg-gradient-to-br from-amber-50 to-amber-100 border-amber-300 text-amber-900";
    progressRatio = ((points - 500) / 500) * 100;
  }

  const handleReferralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!referredEmail) return;
    setReferSuccess(true);
    setReferredEmail("");
    // Give bonus points for referral!
    const updated = points + 100;
    setPoints(updated);
    localStorage.setItem("lookbook_loyalty_points", updated.toString());
  };

  const handleBuyGiftCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient) {
      alert("Please provide the recipient's name.");
      return;
    }
    setGiftSuccess(true);
  };

  const activeGiftPreset = GIFT_CARDS_PRESETS.find((c) => c.id === selectedPreset)!;

  return (
    <section className="py-24 bg-gradient-to-b from-[#FAFAFC] to-white" id="club-lounges-portal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-pink-500 font-semibold tracking-wider text-xs uppercase block mb-2">Exclusive privileges</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            The Look Book Royal Club & Loyalty Lounge
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-[#2563EB] mx-auto mt-4 rounded-full" />
        </div>

        {/* METRICS & REWARD TIERS ROW */}
        <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto mb-16 items-stretch">
          
          {/* Member Card Display Left (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className={`p-8 rounded-3xl border shadow-xl flex flex-col justify-between aspect-[8/5] w-full text-left relative overflow-hidden ${tierCardBg}`}>
              <div className="absolute right-[-10%] bottom-[-20%] w-48 h-48 rounded-full bg-pink-400/10 blur-3xl pointer-events-none" />
              
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs uppercase tracking-widest font-black opacity-60">Loyalty Club Lounge</span>
                  <h4 className="font-serif text-xl font-extrabold tracking-wide mt-1">{tier}</h4>
                </div>
                <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-md">
                  <Award className="h-6 w-6 text-pink-300" />
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold opacity-50 block mb-0.5">MEMBER BALANCE</span>
                <span className="text-3xl font-serif font-black">{points} <span className="text-xs font-sans font-semibold opacity-80">points</span></span>
                <div className="text-xs font-light mt-1 opacity-70">Simulated Spend Value: ₹{spentAmount.toLocaleString()}</div>
              </div>

              <div className="flex justify-between items-center border-t border-white/10 pt-4">
                <span className="text-xs font-bold">Benefit: <span className="text-pink-500">{tierDiscount} OFF</span> on all salon categories</span>
                <span className="text-[10px] uppercase tracking-wider font-semibold opacity-65">ID: LBX-984A</span>
              </div>
            </div>

            {/* Simulated Points trigger help action */}
            <div className="mt-4 p-5 rounded-2xl bg-slate-100 border border-slate-200 text-left flex justify-between items-center">
              <div className="flex-grow pr-4">
                <span className="block text-xs font-bold text-slate-800">Review Points Balance</span>
                <span className="text-[11px] text-slate-500 font-light block mt-0.5">Points accumulate at checkout automatically (10% back). Press test below to mock custom spending triggers!</span>
              </div>
              <button
                onClick={handleSimulatePoints}
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-[#2563EB] hover:brightness-110 text-white rounded-xl text-xs font-bold shadow-md whitespace-nowrap active:scale-95 transition-transform"
              >
                Mock Spend Points
              </button>
            </div>
          </div>

          {/* Reward Tiers breakdown card Right (7 columns) */}
          <div className="lg:col-span-7 bg-[#FAFAFC] border border-slate-100 rounded-3xl p-6 sm:p-8 text-left space-y-6">
            <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Coins className="h-5 w-5 text-pink-500" />
              <span>Membership Tiers & Tier Progress</span>
            </h3>

            {/* Level progress bar info rendering */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-500 font-semibold uppercase">
                <span>Silver (0-500 pt)</span>
                <span>Gold (500 pt)</span>
                <span>Platinum (1000+ pt)</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-pink-400 via-indigo-600 to-purple-900 h-full" style={{ width: `${progressRatio}%` }} />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-slate-100 text-left">
                <span className="block text-xs font-bold text-slate-700">Silver Member</span>
                <span className="block text-[10px] text-slate-400 mt-0.5">0 - 499 Points</span>
                <ul className="text-[11px] text-slate-500 font-light mt-3 space-y-1">
                  <li>• 5% flat discount</li>
                  <li>• Birthday freebies</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-100 text-left">
                <span className="block text-xs font-bold text-slate-700">Gold Premium</span>
                <span className="block text-[10px] text-slate-400 mt-0.5">500 - 999 Points</span>
                <ul className="text-[11px] text-slate-500 font-light mt-3 space-y-1">
                  <li>• 12% flat discount</li>
                  <li>• Priority scheduling</li>
                  <li>• Complementary hot tea</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-100 text-left">
                <span className="block text-xs font-bold text-slate-700">Platinum Elite</span>
                <span className="block text-[10px] text-slate-400 mt-0.5">1000+ Points</span>
                <ul className="text-[11px] text-slate-500 font-light mt-3 space-y-1">
                  <li>• 20% flat discount</li>
                  <li>• Free champagne flute</li>
                  <li>• Unlimited companion blowouts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* BUY GIFT CARDS AND REFERRALS ROW */}
        <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto pt-8 items-start">
          
          {/* Gifting Creator Section (7 columns) */}
          <div className="lg:col-span-7 bg-white border border-pink-100 rounded-3xl p-6 sm:p-8 text-left space-y-6">
            <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Gift className="h-5 w-5 text-indigo-600" />
              <span>Purchase Gift Cards Online</span>
            </h3>

            {giftSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium animate-fadeIn">
                Success: Receipt crafted! Check confirmation emails to retrieve the customized activation code keys for {recipient}!
                <button onClick={() => setGiftSuccess(false)} className="block mt-1 underline font-bold">Purchase another design</button>
              </div>
            )}

            <form onSubmit={handleBuyGiftCard} className="space-y-6">
              
              {/* Presets card design selections layout picker */}
              <div className="space-y-2">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Select card layout</span>
                <div className="grid sm:grid-cols-3 gap-3">
                  {GIFT_CARDS_PRESETS.map((card) => (
                    <button
                      type="button"
                      key={card.id}
                      onClick={() => setSelectedPreset(card.id)}
                      className={`p-4 rounded-2xl text-left border transition-all ${
                        selectedPreset === card.id
                          ? "ring-2 ring-blue-500 scale-102"
                          : "opacity-60 hover:opacity-80"
                      } ${card.bgClass}`}
                    >
                      <span className="block text-xs font-bold">{card.name}</span>
                      <span className="block text-[9px] mt-2 font-light leading-snug">{card.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic slider for pricing voucher and inputs */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2" id="gift-card-recipient">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">To Partner Recipient Name</span>
                  <input
                    type="text"
                    placeholder="e.g. Shalini Fernandez"
                    required
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2 text-left" id="gift-card-amount">
                  <div className="flex justify-between items-center text-[10px] text-slate-505 uppercase font-semibold">
                    <span>Card Balance</span>
                    <span className="text-blue-600 font-bold">₹{giftAmount.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="25000"
                    step="500"
                    value={giftAmount}
                    onChange={(e) => setGiftAmount(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2563EB] mt-2"
                  />
                </div>
              </div>

              {/* Gifting Checkout Submit */}
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white text-xs font-bold shadow-md flex items-center space-x-2"
                id="buy-giftcard-submit"
              >
                <span>Purchase Gift Voucher</span>
              </button>
            </form>
          </div>

          {/* Referral Invitations Form Column (5 columns) */}
          <div className="lg:col-span-5 bg-[#FAFAFC] border border-slate-100 rounded-3xl p-6 sm:p-8 text-left space-y-6">
            <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Users className="h-5 w-5 text-indigo-505 text-[#2563EB]" />
              <span>Referral Program</span>
            </h3>

            <p className="text-xs text-slate-500 font-light leading-relaxed">
              Invite your styling friends to book with us. Once they complete their initial treatment, they will get <strong>₹500 welcome credit</strong> and you will earn <strong>100 bonus club points</strong> immediately!
            </p>

            {referSuccess && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium animate-fadeIn">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  <span>Referral Dispatched!</span>
                </div>
                <span className="block mt-1 leading-normal font-light">
                  A welcome voucher link was formatted & sent out. 100 Referral bonus loyalty points has been added to your balance!
                </span>
              </div>
            )}

            <form onSubmit={handleReferralSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Friend&apos;s Email Address</span>
                <input
                  type="email"
                  placeholder="e.g. friend@gmail.com"
                  required
                  value={referredEmail}
                  onChange={(e) => setReferredEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none text-slate-800 shadow-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full text-center py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:brightness-110 active:scale-95 text-white rounded-full text-xs font-bold shadow-md tracking-wider flex items-center justify-center space-x-2 uppercase"
                id="referral-submit-btn"
              >
                <Send className="h-4.5 w-4.5" />
                <span>Invite Friend & Earn Points</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
