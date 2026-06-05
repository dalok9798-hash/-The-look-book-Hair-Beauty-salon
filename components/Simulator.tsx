"use client";

import React, { useState, useRef } from "react";
import { Camera, Upload, Sparkles, RefreshCw, Star, Info, HelpCircle } from "lucide-react";

interface SimulatorProps {
  onPreFillBooking: (details: { notes: string }) => void;
}

export default function Simulator({ onPreFillBooking }: SimulatorProps) {
  const [image, setImage] = useState<string | null>(null);
  const [category, setCategory] = useState<string>("hair-color");
  const [preset, setPreset] = useState<string>("Warm Golden Balayage");
  const [notes, setNotes] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  
  // AI analysis response state
  const [result, setResult] = useState<{
    faceShape: string;
    skinUndertone: string;
    suitabilityScore: number;
    consultation: string;
    tips: string[];
    visualSimulationText: string;
    simulatedHexColor: string;
    glowIntensity: string;
  } | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stylePresets: Record<string, string[]> = {
    "hair-color": ["Warm Golden Balayage", "Midnight Plum Shading", "Pastel Lavender Sombre", "Vibrant Gold Highlights", "Rich Chocolate Brown"],
    "haircut": ["Chic Parisian Bob", "Modern Curtain Fringe", "Sleek Blunt Pixie", "Layered Butterfly Cut", "Goan Beach Waves Volumizer"],
    "makeup": ["Red-Carpet HD Glam", "Dewy Ocean Sunset", "Minimalist Pearlescent", "Classic Matte Hollywood"]
  };

  // Turn on device camera
  const startCamera = async () => {
    try {
      setCameraActive(true);
      setImage(null);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (e: any) {
      console.error("Camera access failed:", e);
      alert("Camera access is restricted or unavailable inside the frame. Please upload an image instead!");
      setCameraActive(false);
    }
  };

  // Snaps photo from video player
  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(-1, 1); // mirror flip
        ctx.drawImage(videoRef.current, -canvas.width, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg");
        setImage(dataUrl);
        stopCamera();
      }
    }
  };

  // Turn off camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  // File drop/upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Run AI Server Consulting Route
  const handleSubmitSimulation = async () => {
    if (!image) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/simulator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image,
          style: notes,
          category,
          preset,
        }),
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Simulation failure:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-tr from-slate-900 via-slate-950 to-indigo-950 text-white min-h-screen" id="ai-simulator-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 text-slate-100">
          <span className="text-pink-400 font-semibold tracking-wider text-xs uppercase block mb-2">Futuristic Beauty Consultation</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
            AI Hair & Colour Style Simulator
          </h2>
          <p className="text-sm text-slate-400 font-light mt-3 max-w-xl mx-auto">
            Upload your portrait photo or secure a live webcam shot. Our multimodal generative backend will scan your face shapes, detect dermal undertones, and visualize matches!
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-[#2563EB] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
          {/* Controls Card Left Column (5 columns) */}
          <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl text-left space-y-6">
            <h3 className="font-serif text-xl font-bold text-white flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-pink-300" />
              <span>Select Aesthetics</span>
            </h3>

            {/* Category Selector */}
            <div className="space-y-2">
              <label className="text-xs text-slate-300 font-semibold tracking-wider uppercase">Treatment Division</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    setCategory("hair-color");
                    setPreset(stylePresets["hair-color"][0]);
                  }}
                  className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-colors ${
                    category === "hair-color"
                      ? "bg-pink-500 border-pink-400 text-white"
                      : "bg-white/5 hover:bg-white/10 border-white/10 text-slate-300"
                  }`}
                >
                  Hair Colour
                </button>
                <button
                  onClick={() => {
                    setCategory("haircut");
                    setPreset(stylePresets["haircut"][0]);
                  }}
                  className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-colors ${
                    category === "haircut"
                      ? "bg-pink-500 border-pink-400 text-white"
                      : "bg-white/5 hover:bg-white/10 border-white/10 text-slate-300"
                  }`}
                >
                  Haircut
                </button>
                <button
                  onClick={() => {
                    setCategory("makeup");
                    setPreset(stylePresets["makeup"][0]);
                  }}
                  className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-colors ${
                    category === "makeup"
                      ? "bg-pink-500 border-pink-400 text-white"
                      : "bg-white/5 hover:bg-white/10 border-white/10 text-slate-300"
                  }`}
                >
                  Art Makeup
                </button>
              </div>
            </div>

            {/* Style presets list */}
            <div className="space-y-2 flex flex-col items-start w-full">
              <label className="text-xs text-slate-300 font-semibold tracking-wider uppercase">Style Presets</label>
              <div className="flex flex-wrap gap-2 w-full justify-start">
                {(stylePresets[category] || []).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPreset(p)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      preset === p
                        ? "bg-[#2563EB] text-white"
                        : "bg-white/5 hover:bg-white/10 text-slate-300"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Written guidelines/notes */}
            <div className="space-y-2 text-left">
              <label className="text-xs text-slate-300 font-semibold tracking-wider uppercase">Additional Requests</label>
              <textarea
                placeholder="Type details (e.g. 'I want fringe bangs too', 'Keep it shoulder length', 'I prefer silver tones')..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/15 focus:border-[#2563EB] focus:outline-none text-white text-sm placeholder-slate-500 min-h-[90px]"
              />
            </div>

            {/* Simulated Capture Camera controls */}
            <div className="flex gap-3 justify-start pt-2">
              <button
                type="button"
                onClick={startCamera}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-[#2563EB]/25 hover:bg-[#2563EB]/35 text-blue-300 text-xs font-bold border border-blue-500/20"
                id="camera-starter-btn"
              >
                <Camera className="h-4 w-4" />
                <span>Camera Mode</span>
              </button>
              <label className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold border border-white/10 cursor-pointer">
                <Upload className="h-4 w-4 text-pink-400" />
                <span>Upload File</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
          </div>

          {/* Imaging & Showcase Center Column (7 columns) */}
          <div className="lg:col-span-7 flex flex-col items-center space-y-6">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-slate-900 flex items-center justify-center p-2 shadow-2xl">
              
              {/* Webcam Live State */}
              {cameraActive && (
                <div className="absolute inset-2 rounded-2xl overflow-hidden bg-black flex items-center justify-center">
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover scale-x-[-1]" />
                  <button
                    onClick={capturePhoto}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 p-4 bg-red-600 rounded-full border-4 border-white text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
                    id="camera-shutter-btn"
                  >
                    <Camera className="h-6 w-6" />
                  </button>
                </div>
              )}

              {/* Displaying Image with Glow tint animation if requested */}
              {image && !cameraActive && (
                <div className="absolute inset-2 rounded-2xl overflow-hidden">
                  <img src={image} alt="User Upload" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Glowing Meticulous Hair Line filter layer when result is parsed */}
                  {result && (
                    <div
                      className="absolute inset-0 mix-blend-color opacity-70 animate-pulse duration-[3000ms]"
                      style={{
                        background: `radial-gradient(circle, ${result.simulatedHexColor} 0%, transparent 80%)`,
                      }}
                    />
                  )}
                </div>
              )}

              {/* Empty placeholder */}
              {!image && !cameraActive && (
                <div className="text-center p-8 space-y-4 max-w-sm">
                  <div className="mx-auto w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-pink-400">
                    <Sparkles className="h-8 w-8" />
                  </div>
                  <div>
                    <span className="block font-serif text-lg font-bold">No Image Supplied</span>
                    <span className="text-xs text-slate-400 mt-1 block">
                      Snap a camera selfie or upload a face portrait to initialize the AI shader.
                    </span>
                  </div>
                </div>
              )}

              {/* Streaming loading overlays */}
              {loading && (
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-fadeIn">
                  <RefreshCw className="h-10 w-10 text-pink-400 animate-spin mb-4" />
                  <h4 className="font-serif text-lg font-bold text-white">Consuming dermal patterns...</h4>
                  <p className="text-xs text-slate-400 max-w-xs mt-1 leading-relaxed">
                    Analyzing facial geometry (oval/square), calculating undertone matching formulas, and formulating highlights with salon precision...
                  </p>
                </div>
              )}
            </div>

            {/* Run simulation trigger */}
            {image && !loading && !cameraActive && (
              <button
                onClick={handleSubmitSimulation}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-[#2563EB] hover:brightness-110 active:scale-95 text-white text-sm font-bold shadow-lg shadow-pink-500/20 tracking-wider flex items-center space-x-2 uppercase"
                id="run-ai-shader-btn"
              >
                <Sparkles className="h-4.5 w-4.5" />
                <span>Simulate Design Layout</span>
              </button>
            )}

            {/* AI Diagnosis outcomes */}
            {result && !loading && (
              <div className="w-full max-w-md bg-white text-slate-900 rounded-3xl p-6 text-left border border-pink-100 shadow-xl space-y-5 animate-slideUp">
                {/* Score and metrics headers */}
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <div>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Suitability Rating</span>
                    <div className="flex items-center space-x-2 mt-0.5">
                      <Star className="h-5 w-5 text-amber-500 fill-current" />
                      <span className="text-2xl font-black font-serif text-slate-900">{result.suitabilityScore}%</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs bg-slate-100 px-3 py-1 rounded-full text-slate-700 font-bold border border-slate-200">
                      Shape: {result.faceShape}
                    </span>
                    <span className="block text-[10px] mt-1 text-[#2563EB] font-semibold">
                      Undertone: {result.skinUndertone}
                    </span>
                  </div>
                </div>

                {/* Consultation report */}
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                    Bespoke Consultation
                  </span>
                  <p className="text-sm text-slate-700 font-light leading-relaxed">
                    {result.consultation}
                  </p>
                </div>

                {/* Tips bullet point lists */}
                <div className="space-y-2">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    Care Guidelines
                  </span>
                  <ul className="space-y-1">
                    {(result.tips || []).map((tip, index) => (
                      <li key={index} className="text-xs text-slate-600 flex items-start space-x-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-pink-500 shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Integration button */}
                <button
                  onClick={() =>
                    onPreFillBooking({
                      notes: `AI Recommended style: [${preset} under category ${category}] based on face shape: ${result.faceShape} with skin undertone: ${result.skinUndertone}. Additional notes: ${notes}`,
                    })
                  }
                  className="w-full text-center py-3 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-md mt-2 flex items-center justify-center space-x-2"
                  id="simulator-prefill-booking"
                >
                  <span>Export Recommendations to Booking</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
